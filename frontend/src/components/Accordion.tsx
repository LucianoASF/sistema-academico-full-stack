import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

interface AccordionProps {
  header: React.ReactNode;
  body: React.ReactNode;
}

const Accordion = ({ header, body }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-5/6 md:w-3/4 lg:w-1/2 font-corpo mb-4">
      <button
        className="flex items-center justify-between w-full"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {header}
        <ChevronDownIcon
          className={`h-5 w-5 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && <>{body}</>}
    </div>
  );
};

export default Accordion;
