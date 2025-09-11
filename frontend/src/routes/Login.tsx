import salaDeAula from '../assets/sala_de_aula.jpg';
import logo from '../assets/logo.png';
import Input from '../components/Input';
import BotaoPrincipal from '../components/BotaoPrincipal';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '../components/ErrorMessage';

const loginSchema = z.object({
  email: z
    .string()
    .email('Email inválido')
    .min(5, 'Email deve ter pelo menos 5 caracteres')
    .max(100, 'Email deve ter no máximo 100 caracteres'),
  senha: z
    .string()
    .min(5, 'Senha deve ter pelo menos 5 caracteres')
    .max(60, 'Senha deve ter no máximo 60 caracteres'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Dados enviados:', data);
    // Aqui você pode chamar sua API de login
  };
  return (
    <div className="flex h-screen bg-gray-50 ">
      <img
        src={salaDeAula}
        alt="Sala de Aula"
        className="hidden md:block w-2/4 lg:w-3/4 object-cover h-screen"
      />

      <main className="flex flex-col items-center justify-center w-full gap-4">
        <img alt="logo" src={logo} className="w-32 h-32  top-4" />
        <h1 className="font-titulo text-3xl">Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-72 "
        >
          <Input
            label="Email"
            placeholder="Digite seu email..."
            type="email"
            {...register('email')}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <Input
            label="Senha"
            placeholder="Digite sua senha..."
            type="password"
            {...register('senha')}
          />
          {errors.senha && <ErrorMessage>{errors.senha.message}</ErrorMessage>}
          <BotaoPrincipal>
            {isSubmitting ? 'Entrando...' : 'Login'}
          </BotaoPrincipal>
        </form>
      </main>
    </div>
  );
};

export default Login;
