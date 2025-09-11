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
      <ul className="">
        <li className="py-3 pl-3 bg-gray-600">
          <a href="#">Disciplinas Em Curso</a>
        </li>
        <li className="py-3 pl-3">
          <a href="#">Atualizar Cadastro</a>
        </li>
        <li className="pt-3 pl-3">
          <a href="#">Histórico</a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
