import { useEffect, useState } from 'react';
import TituloPrincipal from '../components/TituloPrincipal';
import Input from '../components/Input';
import Table from '../components/Table';
import api from '../api/api';
import { useAuthContext } from '../contexts/useAuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import BotaoPrincipal from '../components/BotaoPrincipal';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { stringToDate } from '../utils/ConverteStringEmDate';
import ErrorMessage from '../components/ErrorMessage';
import type { IdisciplinaRealizada } from '../interfaces/IdisciplinaRealizada';
import type { Imatricula } from '../interfaces/Imatricula';
import type { Iaula } from '../interfaces/Iaula';
import type { IusuarioBusca } from '../interfaces/IusuarioBusca';
import PesquisaUsuario from '../components/PesquisaUsuario';

const aulaSchema = z.object({
  id: z
    .string()
    .refine((val) => !isNaN(Number(val)) || val === '', {
      message: 'O valor não é um número',
    })
    .optional(),
  titulo: z
    .string()
    .trim()
    .min(5, 'O título deve ter pelo menos 5 caracteres')
    .max(100, 'O título deve ter no máximo 100 caracteres'),
  descricao: z
    .string()
    .trim()
    .min(10, 'O título deve ter pelo menos 10 caracteres')
    .max(255, 'O título deve ter no máximo 255 caracteres'),
  data: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Data inválida',
  }),
  disciplinaRealizadaId: z
    .string()
    .refine((val) => !isNaN(Number(val)) || val === '', {
      message: 'O valor não é um número',
    }),
  presencas: z.record(z.string(), z.boolean()),
});

type AulaFormInputs = z.infer<typeof aulaSchema>;

const Aulas = () => {
  interface Ipresenca {
    id: number;
    presente: boolean;
    matriculaId: number;
    aulaId: number;
    matricula: {
      usuario: {
        nome: string;
      };
    };
  }

  const { user } = useAuthContext();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AulaFormInputs>({
    resolver: zodResolver(aulaSchema),
    mode: 'onChange',
    defaultValues: {
      presencas: {},
    },
  });
  const [disciplinas, setDisciplinas] = useState<IdisciplinaRealizada[]>();
  const disciplina = watch('disciplinaRealizadaId');
  const aulaId = watch('id');
  const [ligado, setLigado] = useState(false);
  const [aulas, setAulas] = useState<Iaula[]>();
  const [presencas, setPresencas] = useState<Ipresenca[]>();
  const [alunosMatriculados, setAlunosMatriculados] = useState<Imatricula[]>();
  const [selecionado, setSelecionado] = useState<IusuarioBusca | null>(null);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      if (!user) return;
      if (user.role === 'administrador' && !selecionado) {
        setDisciplinas(undefined);
        return;
      }
      try {
        const data = (
          await api.get<IdisciplinaRealizada[]>(
            `/disciplinas-realizadas/usuarios/${
              user.role === 'administrador' ? selecionado?.id : user.id
            }`,
          )
        ).data;
        setDisciplinas(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
    };
    fetchDisciplinas();
  }, [user, selecionado]);

  useEffect(() => {
    const fetchAulas = async () => {
      if (ligado || !disciplina) {
        setValue('id', undefined);
        setValue('titulo', '');
        setValue('data', '');
        setValue('descricao', '');
        return;
      }
      try {
        const data = (
          await api.get<Iaula[]>(`/disciplinas-realizadas/${disciplina}/aulas`)
        ).data;
        setAulas(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
    };
    fetchAulas();
  }, [ligado, disciplina, setValue]);

  useEffect(() => {
    if (!aulas || aulas.length === 0) return;
    const aula = aulas.find((a) => a.id === Number(aulaId));
    if (!aula) return;
    setValue('titulo', aula.titulo);
    setValue('data', (aula.data as string).slice(0, 10));
    setValue('descricao', aula.descricao);
  }, [aulaId, aulas, setValue]);

  useEffect(() => {
    const fetchPresencas = async () => {
      if (!aulaId) return;
      try {
        const data = (
          await api.get<Ipresenca[]>(
            `/disciplinas-realizadas/aulas/${aulaId}/presencas`,
          )
        ).data;
        setPresencas(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
    };
    fetchPresencas();
  }, [aulaId]);

  useEffect(() => {
    if (!presencas || presencas.length === 0) return;
    presencas.forEach((p) => {
      setValue(`presencas.${p.id}`, p.presente);
    });
  }, [presencas, setValue]);

  useEffect(() => {
    setPresencas(undefined);
    setValue('id', undefined);
    setValue('titulo', '');
    setValue('data', '');
    setValue('descricao', '');
  }, [disciplina, ligado, setValue]);

  useEffect(() => {
    const fetchMatriculas = async () => {
      if (!ligado || !disciplina) return;
      try {
        const data = (
          await api.get<Imatricula[]>(
            `/matriculas/disciplinas-realizadas/${disciplina}`,
          )
        ).data;
        setAlunosMatriculados(data);
        setValue('presencas', {});
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
    };
    fetchMatriculas();
  }, [ligado, disciplina, setValue]);

  async function onSubmit(data: AulaFormInputs) {
    try {
      if (data.id && !ligado) {
        await api.put(`/disciplinas-realizadas/aulas/${data.id}`, {
          titulo: data.titulo,
          descricao: data.descricao,
          data: stringToDate(data.data),
          disciplinaRealizadaId: Number(data.disciplinaRealizadaId),
        });
        const presencasArray = Object.entries(data.presencas).map(
          ([id, presente]) => ({
            id: Number(id),
            presente,
          }),
        );

        await api.patch(
          `/disciplinas-realizadas/aulas/${data.id}/presencas`,
          presencasArray,
        );

        setAulas((prev) =>
          prev?.map((aula) =>
            aula.id === Number(data.id)
              ? { ...aula, titulo: data.titulo }
              : aula,
          ),
        );
        toast.success('Alterações salvas com sucesso!');
      } else {
        const aula = await api.post(
          `/disciplinas-realizadas/${data.disciplinaRealizadaId}/aulas`,
          {
            titulo: data.titulo,
            descricao: data.descricao,
            data: stringToDate(data.data),
          },
        );
        const presencasArray = Object.entries(data.presencas).map(
          ([id, presente]) => ({
            matriculaId: Number(id),
            presente,
          }),
        );

        await api.post(
          `/disciplinas-realizadas/aulas/${aula.data.id}/presencas`,
          presencasArray,
        );

        setLigado(false);
        setAulas((prev = []) => [...prev, aula.data]);
        setValue('id', String(aula.data.id));
        setAlunosMatriculados(undefined);
        toast.success('sucesso');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.erro);
      }
    }
  }
  async function excluir() {
    if (!aulaId) return;
    try {
      await api.delete(`/disciplinas-realizadas/aulas/${aulaId}`);
      setValue('id', '');
      setPresencas(undefined);
      setValue('presencas', {});
      setAulas((prev = []) =>
        prev.filter((aula) => aula.id !== Number(aulaId)),
      );
      setValue('titulo', '');
      setValue('data', '');
      setValue('descricao', '');
      toast.success('Aula excluida com sucesso');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.erro);
      }
    }
  }

  return (
    <main className="flex flex-col items-center p-4">
      <TituloPrincipal styles="mb-6">Aulas</TituloPrincipal>
      {user?.role === 'administrador' && (
        <PesquisaUsuario
          role="professor"
          selecionado={selecionado}
          setSelecionado={setSelecionado}
        />
      )}
      {!disciplinas && user?.role === 'professor' && (
        <h3>Você não está dando nenhuma disciplina!</h3>
      )}
      {!disciplinas && user?.role === 'administrador' && selecionado && (
        <h3>O professor não está dando nenhuma disciplina!</h3>
      )}
      {disciplinas && disciplinas?.length > 0 && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center p-4"
        >
          <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 space-y-4">
            <label htmlFor="disciplina">Selecione a Disciplina</label>
            <select
              id="disciplina"
              className="w-full border border-gray-700 p-2 rounded-md"
              {...register('disciplinaRealizadaId')}
              defaultValue=""
            >
              <option disabled hidden value="">
                Selecione uma disciplina
              </option>
              {disciplinas.map((disciplina) => (
                <option key={disciplina.id} value={disciplina.id}>
                  {disciplina.disciplina.nome}
                </option>
              ))}
            </select>
            {errors.disciplinaRealizadaId && (
              <ErrorMessage>
                {errors.disciplinaRealizadaId.message}
              </ErrorMessage>
            )}

            {disciplina && (
              <>
                <div className="flex gap-2 items-center justify-center mt-3">
                  <span className="whitespace-nowrap">Nova Aula?</span>
                  <button
                    type="button"
                    onClick={() => setLigado((prevState) => !prevState)}
                    className={`cursor-pointer w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 
                      ${ligado ? 'bg-purple-500' : 'bg-gray-400'}`}
                  >
                    <span
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300
                        ${ligado ? 'translate-x-6' : 'translate-x-0'}`}
                    />
                  </button>
                </div>

                {!ligado && (
                  <div className="flex flex-col w-full">
                    <label htmlFor="tituloAula">Selecione a Aula</label>
                    <select
                      id="tituloAula"
                      className="border border-gray-700 p-2 rounded-md"
                      defaultValue=""
                      {...register('id')}
                    >
                      {aulas && aulas?.length > 0 ? (
                        <option disabled hidden value="">
                          Selecione uma aula
                        </option>
                      ) : (
                        <option disabled hidden value="">
                          Nenhuma aula cadastrada
                        </option>
                      )}
                      {aulas?.map((aula) => (
                        <option key={aula.id} value={aula.id}>
                          {aula.titulo}
                        </option>
                      ))}
                    </select>
                    {errors.id && (
                      <ErrorMessage>{errors.id.message}</ErrorMessage>
                    )}
                  </div>
                )}

                <Input label="Título da Aula" {...register('titulo')} />
                {errors.titulo && (
                  <ErrorMessage>{errors.titulo.message}</ErrorMessage>
                )}
                <Input label="Data" type="date" {...register('data')} />
                {errors.data && (
                  <ErrorMessage>{errors.data.message}</ErrorMessage>
                )}

                <label htmlFor="descricao">Descrição</label>
                <textarea
                  className="w-full h-20 border border-gray-700 p-2 rounded-md"
                  id="descricao"
                  {...register('descricao')}
                />
                {errors.descricao && (
                  <ErrorMessage>{errors.descricao.message}</ErrorMessage>
                )}
                <div className="flex justify-end gap-4">
                  {!ligado && aulaId && (
                    <button
                      type="button"
                      className="text-white mt-4 py-2 px-3 rounded-md cursor-pointer bg-red-500 hover:bg-red-700"
                      onClick={excluir}
                    >
                      Excluir
                    </button>
                  )}
                  <BotaoPrincipal disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Salvar'}
                  </BotaoPrincipal>
                </div>
              </>
            )}
          </div>

          {disciplina && (ligado || aulaId) && (
            <>
              <h3 className="font-titulo text-lg text-gray-800 mt-8">
                Lista de Presença
              </h3>
              <div className="w-4/5">
                <Table headers={['Nome', 'Presente']}>
                  {!ligado &&
                    presencas
                      ?.sort((a, b) =>
                        a.matricula.usuario.nome.localeCompare(
                          b.matricula.usuario.nome,
                        ),
                      )
                      .map((presenca) => (
                        <tr
                          key={presenca.id}
                          className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                        >
                          <td className="px-4 py-3 text-gray-800 font-medium">
                            {presenca.matricula.usuario.nome}
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="w-5 h-5 accent-purple-500"
                              {...register(`presencas.${presenca.id}` as const)}
                            />
                          </td>
                        </tr>
                      ))}
                  {ligado &&
                    alunosMatriculados
                      ?.sort((a, b) =>
                        a.usuario.nome.localeCompare(b.usuario.nome),
                      )
                      .map((matricula) => (
                        <tr
                          key={matricula.id}
                          className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                        >
                          <td className="px-4 py-3 text-gray-800 font-medium">
                            {matricula.usuario.nome}
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="w-5 h-5 accent-purple-500"
                              {...register(
                                `presencas.${matricula.id}` as const,
                              )}
                            />
                          </td>
                        </tr>
                      ))}
                </Table>
              </div>
            </>
          )}
        </form>
      )}
    </main>
  );
};

export default Aulas;
