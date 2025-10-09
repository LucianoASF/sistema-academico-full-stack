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
      <div className="flex flex-col justify-between h-full">
        <div>
          <h3 className="font-titulo text-xl font-semibold text-gray-900 mb-3">
            {titulo}
          </h3>
          <p className="font-corpo text-gray-600">{paragrafo}</p>
        </div>
        <div className="flex justify-end mt-6">
          <Link
            to={to}
            className="font-corpo bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:from-purple-600 hover:to-purple-800 transition-all duration-300"
          >
            {nomeDoBotao}
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CardHome;
