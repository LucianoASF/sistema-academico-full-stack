import { useAuthContext } from '../contexts/useAuthContext';
import {
  ClipboardClockIcon,
  GraduationCapIcon,
  LogOutIcon,
  PencilIcon,
} from 'lucide-react';
import Navlink from './Navlink';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const { user, logout } = useAuthContext();
  const className = isOpen && 'translate-x-0';
  return (
    <nav
      className={`bg-gray-800 w-1/2 md:w-2/5 lg:w-1/5 font-corpo h-screen text-lg z-50 text-gray-50 fixed transform -translate-x-full transition-transform duration-300 ease-out ${className}`}
    >
      <div className="font-titulo text-xl py-8 h-12 flex items-center justify-center">
        <h5>MENU</h5>
      </div>
      <ul>
        {user?.role === 'aluno' && (
          <>
            <li>
              <Navlink to="/disciplinas-em-curso">
                <GraduationCapIcon /> Disciplinas Em Curso
              </Navlink>
            </li>
            <li>
              <Navlink to="/atualizar-cadastro">
                <PencilIcon />
                Atualizar Cadastro
              </Navlink>
            </li>
            <li>
              <Navlink to="/historico">
                <ClipboardClockIcon /> Histórico
              </Navlink>
            </li>
          </>
        )}
        <li>
          <button
            className="flex items-center py-3 pl-3 gap-2 text-sm md:text-xl hover:bg-gray-700 w-full cursor-pointer"
            onClick={logout}
          >
            <LogOutIcon /> Sair
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
