import { NavLink } from 'react-router';

interface NavlinkProps {
  to: string;
  children: React.ReactNode;
}

const Navlink = ({ to, children }: NavlinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-3 pl-3 gap-2 text-sm md:text-xl ${
          isActive ? 'bg-gray-600' : 'hover:bg-gray-700'
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default Navlink;
