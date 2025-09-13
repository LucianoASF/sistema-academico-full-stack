import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import api from '../api/api';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<{
    id: number;
    role: string;
    nome?: string;
  } | null>(null);

  const login = async () => {
    try {
      const { id, role } = (await api.get('/usuarios/perfil')).data;
      const { nome } = (await api.get(`/usuarios/${id}`)).data;
      setUser({ id, role, nome });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.erro);
      } else {
        console.error(error);
      }
    }
  };

  const logout = async () => {
    try {
      await api.get('/auth/logout');
      setUser(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.erro);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Tenta buscar o perfil do usuário
        const { id, role } = (await api.get('/usuarios/perfil')).data;
        const { nome } = (await api.get(`/usuarios/${id}`)).data;
        setUser({ id, role, nome });
      } catch {
        console.log('Não está logado');
        // Se der erro, significa que não está autenticado
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
