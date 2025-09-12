import logo from '../assets/logo.png';
import TituloPrincipal from '../components/TituloPrincipal';
const NotFound = () => {
  return (
    <main className="bg-purple-500 h-screen flex items-center justify-center flex-col gap-4">
      <span className=" font-titulo text-9xl flex text-purple-900">
        4
        <img
          alt="logo em forma do numero zero"
          src={logo}
          className="rounded-full  h-32 w-32"
        />
        4
      </span>
      <TituloPrincipal>Oooops!</TituloPrincipal>
      <p className="font-corpo text-gray-900">Essa página não foi encontrada</p>
    </main>
  );
};

export default NotFound;
