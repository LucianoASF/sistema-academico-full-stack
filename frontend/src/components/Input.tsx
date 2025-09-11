import { useId } from 'react';

interface InputProps extends React.ComponentProps<'input'> {
  label: string;
}

const Input = ({ label, placeholder, type = 'text', ...rest }: InputProps) => {
  const id = useId();
  return (
    <div className="flex flex-col text-gray-900 font-corpo">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...rest}
        className="border border-gray-700 p-2 rounded-md"
      />
    </div>
  );
};

export default Input;
