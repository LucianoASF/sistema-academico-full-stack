import { NavLink } from 'react-router';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const className = isOpen && 'translate-x-0';
  return (
    <nav
      className={`bg-gray-800 w-1/2 md:w-2/5 lg:w-1/5 font-corpo h-screen text-lg z-50 text-gray-50 fixed transform -translate-x-full transition-transform duration-300 ease-out ${className}`}
    >
      <div className="font-titulo text-xl py-8 h-12 flex items-center justify-center">
        <h5>MENU</h5>
      </div>
      <ul>
        <li>
          <NavLink
            to="/disciplinas-em-curso"
            className={({ isActive }) =>
              `block py-3 pl-3 ${
                isActive ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`
            }
          >
            Disciplinas Em Curso
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/atualizar-cadastro"
            className={({ isActive }) =>
              `block py-3 pl-3 ${
                isActive ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`
            }
          >
            Atualizar Cadastro
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/historico"
            className={({ isActive }) =>
              `block py-3 pl-3 ${
                isActive ? 'bg-gray-600' : 'hover:bg-gray-700'
              }`
            }
          >
            Histórico
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
