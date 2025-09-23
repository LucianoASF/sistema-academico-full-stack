interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="border m-4 p-4 rounded-lg border-gray-900 bg-gray-100 hover:shadow-2xl">
      {children}
    </div>
  );
};

export default Card;
