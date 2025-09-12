import { Link } from 'react-router';

interface CardProps {
  titulo: string;
  paragrafo: string;
  nomeDoBotao: string;
  to: string;
}

const Card = ({ titulo, paragrafo, nomeDoBotao, to }: CardProps) => {
  return (
    <div className="border m-4 p-4 rounded-lg border-gray-900 bg-gray-100 hover:shadow-2xl">
      <h3 className="font-titulo p-4 text-gray-900">{titulo}</h3>
      <div className="flex justify-between items-center">
        <p className="font-corpo pl-4">{paragrafo}</p>
        <Link
          to={to}
          className="font-corpo bg-gray-200 p-2 border border-purple-300 rounded-md hover:bg-gray-300 text-gray-900"
        >
          {nomeDoBotao}
        </Link>
      </div>
    </div>
  );
};

export default Card;
