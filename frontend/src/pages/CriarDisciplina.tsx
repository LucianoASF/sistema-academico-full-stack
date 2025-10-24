import TituloPrincipal from '../components/TituloPrincipal';

import BotaoPrincipal from '../components/BotaoPrincipal';
import ErrorMessage from '../components/ErrorMessage';
import Input from '../components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import api from '../api/api';
import axios from 'axios';
import { toast } from 'react-toastify';

const disciplinaSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(5, 'O campo deve ter pelo menos 5 caracteres')
    .max(45, 'O campo deve ter no máximo 45 caracteres'),
  quantidadeAulas: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'O valor não é um número',
  }),
});

type DisciplinaFormInputs = z.infer<typeof disciplinaSchema>;
const CriarDisciplina = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DisciplinaFormInputs>({
    resolver: zodResolver(disciplinaSchema),
    mode: 'onChange',
  });

  async function onSubmit(data: DisciplinaFormInputs) {
    try {
      await api.post('/disciplinas', data);
      reset();
      toast.success('Disciplina criada com sucesso!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.erro);
      }
    }
  }

  return (
    <main className="flex flex-col p-4 items-center">
      <TituloPrincipal styles="mb-10">Editar Disciplina</TituloPrincipal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input label="Nome" {...register('nome')} />
            {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
          </div>

          <div>
            <Input
              label="Quantidade de Aulas"
              type="text"
              {...register('quantidadeAulas')}
            />
            {errors.quantidadeAulas && (
              <ErrorMessage>{errors.quantidadeAulas.message}</ErrorMessage>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <BotaoPrincipal disabled={isSubmitting}>
            {isSubmitting ? 'Enviando' : 'Criar'}
          </BotaoPrincipal>
        </div>
      </form>
    </main>
  );
};

export default CriarDisciplina;
