interface TituloPrincipalProps {
  children: React.ReactNode;
  styles?: string;
}

const TituloPrincipal = ({ children, styles }: TituloPrincipalProps) => {
  return (
    <h1 className={`font-titulo text-3xl text-gray-900 ${styles}`}>
      {children}
    </h1>
  );
};

export default TituloPrincipal;
