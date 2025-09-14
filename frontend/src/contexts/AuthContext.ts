import { createContext } from 'react';

export interface AuthContextProps {
  user: { id: number; role: string; nome?: string } | null;
  setUser: (user: { id: number; role: string; nome?: string } | null) => void;
  login: () => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: { id: 0, role: 'role' },
  setUser: () => {},
  login: () => {},
  logout: () => {},
  loading: true,
});
