import { useId } from 'react';

interface InputProps extends React.ComponentProps<'input'> {
  label: string;
  placeholder: string;
  type?: string;
}

const Input = ({ label, placeholder, type = 'text', ...rest }: InputProps) => {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} placeholder={placeholder} {...rest} />
    </div>
  );
};

export default Input;
