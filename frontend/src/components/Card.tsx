interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="m-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {children}
    </div>
  );
};

export default Card;
