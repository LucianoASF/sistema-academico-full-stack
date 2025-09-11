interface ErrorMesssageProps {
  children: React.ReactNode;
}

const ErrorMessage = ({ children }: ErrorMesssageProps) => {
  return <p className="font-corpo text-red-500 text-sm mt-1">{children}</p>;
};

export default ErrorMessage;
