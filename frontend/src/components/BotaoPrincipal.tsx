interface BotaoPrincipalProps {
  children: React.ReactNode;
}

const BotaoPrincipal = ({ children }: BotaoPrincipalProps) => {
  return (
    <button className="bg-purple-950 text-white mt-4 py-2 px-3 rounded-md cursor-pointer hover:bg-purple-900 hover:text-gray-200">
      {children}
    </button>
  );
};

export default BotaoPrincipal;
