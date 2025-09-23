import { Link } from 'react-router';
import Card from './Card';

interface CardHomeProps {
  titulo: string;
  paragrafo: string;
  nomeDoBotao: string;
  to: string;
}

const CardHome = ({ titulo, paragrafo, nomeDoBotao, to }: CardHomeProps) => {
  return (
    <Card>
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
    </Card>
  );
};

export default CardHome;
