import { useForm } from 'react-hook-form';
import BotaoPrincipal from './BotaoPrincipal';
import Input from './Input';
import ErrorMessage from './ErrorMessage';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import type { Icurso } from '../pages/Cursos';

// Campos comuns a ambos os casos
const cursoSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(5, 'Nome deve ter pelo menos 5 caracteres')
    .max(45, 'Nome deve ter no máximo 45 caracteres'),
});

export type CursoFormInput = z.infer<typeof cursoSchema>;

interface FormularioCadastroProps {
  setCursos: React.Dispatch<React.SetStateAction<Icurso[] | undefined>>;
  setListaCursos: React.Dispatch<React.SetStateAction<Icurso[] | undefined>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  curso?: CursoFormInput & { id: number };
}

const FormCursos = ({
  curso,
  setCursos,
  setListaCursos,
  setIsOpenModal,
}: FormularioCadastroProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CursoFormInput>({
    resolver: zodResolver(cursoSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (!curso) return;
    reset({ nome: curso.nome });
  }, [curso, reset]);

  async function onCreate(data: CursoFormInput) {
    const curso = await api.post<Icurso>('/cursos', data);
    setCursos((prev = []) => [...prev, curso.data]);
    setListaCursos((prev = []) => [...prev, curso.data]);
    reset();
    setIsOpenModal(false);
    toast.success('Curso criado com sucesso');
  }
  async function onUpdate(data: CursoFormInput) {
    const cursoAtualizado = await api.put<Icurso>(`/cursos/${curso?.id}`, data);
    setCursos((prev = []) =>
      prev.map((c) =>
        c.id === cursoAtualizado.data.id ? cursoAtualizado.data : c,
      ),
    );
    setListaCursos((prev = []) =>
      prev.map((c) =>
        c.id === cursoAtualizado.data.id ? cursoAtualizado.data : c,
      ),
    );
    reset();
    setIsOpenModal(false);
    toast.success('Curso atualizado com sucesso');
  }

  return (
    <form
      onSubmit={handleSubmit(curso ? onUpdate : onCreate)}
      className="w-full max-w-2xl m-auto bg-white shadow-lg rounded-2xl p-8 space-y-6"
    >
      <Input label="Nome" {...register('nome')} />
      {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}

      <div className="flex justify-end">
        <BotaoPrincipal disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : curso ? 'Atualizar' : 'Criar'}
        </BotaoPrincipal>
      </div>
    </form>
  );
};

export default FormCursos;
