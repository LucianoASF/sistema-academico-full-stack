import salaDeAula from '../assets/sala_de_aula.jpg';
import logo from '../assets/logo.png';

const Login = () => {
  return (
    <div className="flex">
      <img
        src={salaDeAula}
        alt="Sala de Aula"
        className="hidden lg:block w-[75%] h-screen"
      />
      <div className="flex flex-col w-full items-center bg-gray-50 mt-8 gap-20">
        <img alt="logo" src={logo} className="w-32 h-32" />
        <main className="flex flex-col items-center justify-center  gap-4">
          <h1>Login</h1>
          <form className="flex flex-col gap-2">
            <input type="text" className="bg-gray-200" />
            <input type="text" className="bg-gray-200" />
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;
