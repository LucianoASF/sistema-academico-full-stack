import { MenuIcon } from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuthContext } from '../contexts/useAuthContext';

interface AppbarProps {
  onToggle: () => void;
}

const Appbar = ({ onToggle }: AppbarProps) => {
  const { user } = useAuthContext();
  return (
    <div className="flex bg-gray-100 h-12 w-full items-center justify-between p-8 flex-shrink-0">
      <div className="flex gap-4">
        <button onClick={onToggle} className="cursor-pointer">
          <MenuIcon size={32} />
        </button>
        <img alt="logo" src={logo} className="h-12" />
      </div>
      <p className="font-corpo text-gray-900">
        Olá, {user?.nome?.split(' ')[0]}
      </p>
    </div>
  );
};

export default Appbar;
