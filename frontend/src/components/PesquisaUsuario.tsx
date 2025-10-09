import { useEffect, useState } from 'react';
import Input from './Input';
import { XIcon } from 'lucide-react';
import api from '../api/api';
import type { IusuarioBusca } from '../interfaces/IusuarioBusca';
import { toast } from 'react-toastify';
import axios from 'axios';

interface PesquisaUsuarioProps {
  role?: 'aluno' | 'professor' | 'administrador';
  selecionado: IusuarioBusca | null;
  setSelecionado: React.Dispatch<React.SetStateAction<IusuarioBusca | null>>;
}

const PesquisaUsuario = ({
  role,
  selecionado,
  setSelecionado,
}: PesquisaUsuarioProps) => {
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState<IusuarioBusca[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      const buscar = async () => {
        if (busca.trim() !== '') {
          try {
            setLoading(true);
            const data = (
              await api.get<IusuarioBusca[]>(
                `/usuarios?role=${role ?? ''}&busca=${busca}`,
              )
            ).data;
            const filtrados = data.filter(
              (dado) => dado.id !== selecionado?.id,
            );
            setResultados(filtrados);
          } catch (error) {
            if (axios.isAxiosError(error)) {
              toast.error(error.response?.data?.erro);
            }
          } finally {
            setLoading(false);
          }
        } else {
          setResultados([]);
        }
      };

      buscar();
    }, 400); // debounce de 400ms

    return () => clearTimeout(delay);
  }, [busca, selecionado?.id, role]);

  const handleSelecionar = (usuario: IusuarioBusca) => {
    setSelecionado(usuario);
    setBusca(usuario.nome); // opcional: coloca o nome no input
    setResultados([]); // esconde os resultados
  };
  const handleDesselecionar = () => {
    setSelecionado(null);
    setBusca('');
  };

  return (
    <div className="w-full mb-12 max-w-2xl bg-white shadow-lg rounded-2xl p-8">
      <Input
        label={`Digite o nome do ${role ?? 'usuário'}:`}
        placeholder="Digite aqui..."
        onChange={(e) => setBusca(e.target.value)}
        value={busca}
      />

      {loading && !selecionado && <p>Carregando...</p>}

      <ul className="space-y-2 mt-4 max-h-40 overflow-y-auto pr-2">
        {resultados.map((usuario) => (
          <li
            key={usuario.id}
            onClick={() => handleSelecionar(usuario)}
            className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl   
                      shadow-sm border border-gray-200 flex items-center justify-between
                      hover:shadow-md hover:from-purple-50 hover:to-purple-100
                      hover:border-purple-300 hover:text-purple-700
                      transition-all duration-200 cursor-pointer"
          >
            <div>
              <span className="font-medium block">{usuario.nome}</span>
              <span className="text-sm text-gray-400 block">#{usuario.id}</span>
            </div>
            <span className="text-sm text-gray-400">👤</span>
          </li>
        ))}
      </ul>

      {selecionado && (
        <div className="mt-2 p-4 bg-purple-50 border border-purple-200 rounded-xl flex justify-between items-center">
          <div className="">
            <p className="text-purple-700 font-semibold">
              Selecionado: {selecionado.nome}
            </p>
            <p className="text-sm text-gray-500">ID: {selecionado.id}</p>
          </div>
          <button
            className="flex items-center justify-center cursor-pointer"
            onClick={handleDesselecionar}
          >
            <XIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default PesquisaUsuario;
