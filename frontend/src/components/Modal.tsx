import { XIcon } from 'lucide-react';
import { useEffect } from 'react';

interface ModalProps {
  titulo: string;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
}

const Modal = ({ titulo, setIsOpen, children }: ModalProps) => {
  useEffect(() => {
    // Bloqueia a rolagem
    document.body.style.overflow = 'hidden';

    return () => {
      // Libera a rolagem quando o modal fechar
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <div
      className="fixed inset-0 flex justify-center items-start bg-black/60 z-50 overflow-y-auto"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="font-corpo bg-gray-50 w-4/5 lg:2-4/6 my-10 rounded-lg p-6"
        onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
      >
        <div className="relative w-full mb-4">
          <h2 className="font-titulo text-xl text-center">{titulo}</h2>
          <button
            className="absolute right-0 top-0 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <XIcon />
          </button>
        </div>
        <hr />
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
