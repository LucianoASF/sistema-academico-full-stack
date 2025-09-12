import { useEffect, useState } from 'react';
import Appbar from './Appbar';
import Sidebar from './Sidebar';
import useBreakpoint from '../hooks/useBreakpoints';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const breakpoint = useBreakpoint();

  useEffect(() => {
    if (breakpoint === 'lg') {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [breakpoint]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const className = isSidebarOpen && breakpoint === 'lg' ? 'pl-[20%]' : '';

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={`flex flex-col w-full transition-all duration-300 ease-in-out ${className}`}
      >
        <Appbar onToggle={toggleSidebar} />
        {children}
      </div>
      {isSidebarOpen && breakpoint !== 'lg' && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}
    </div>
  );
};

export default Layout;
