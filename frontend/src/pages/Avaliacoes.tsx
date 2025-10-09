import { useForm } from 'react-hook-form';
import TituloPrincipal from '../components/TituloPrincipal';
import ErrorMessage from '../components/ErrorMessage';
import Input from '../components/Input';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthContext } from '../contexts/useAuthContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Table from '../components/Table';
import BotaoPrincipal from '../components/BotaoPrincipal';
import api from '../api/api';
import type { IdisciplinaRealizada } from '../interfaces/IdisciplinaRealizada';
import type { Imatricula } from '../interfaces/Imatricula';
import { stringToDate } from '../utils/ConverteStringEmDate';
import type { Iavaliacao } from '../interfaces/Iavaliacao';
import type { IusuarioBusca } from '../interfaces/IusuarioBusca';
import PesquisaUsuario from '../components/PesquisaUsuario';

const avaliacaoSchema = z.object({
  id: z
    .string()
    .refine((val) => !isNaN(Number(val)) || val === '', {
      message: 'O valor não é um número',
    })
    .optional(),
  nome: z
    .string()
    .trim()
    .min(5, 'O título deve ter pelo menos 5 caracteres')
    .max(60, 'O título deve ter no máximo 100 caracteres'),

  data: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Data inválida',
  }),
  valor: z.string().refine((val) => !isNaN(Number(val)) || val === '', {
    message: 'O valor não é um número',
  }),
  disciplinaRealizadaId: z
    .string()
    .refine((val) => !isNaN(Number(val)) || val === '', {
      message: 'O valor não é um número',
    }),
  notas: z.record(
    z.string(),
    z
      .string()
      .refine((val) => !isNaN(Number(val)) || val === '', {
        message: 'O valor não é um número',
      })
      .optional(),
  ),
});

type AvaliacaoFormInputs = z.infer<typeof avaliacaoSchema>;

const Avaliacoes = () => {
  interface Inota {
    id: number;
    valorObtido: number;
    matriculaId: number;
    avaliacaoId: number;
    matricula: {
      usuario: {
        nome: string;
      };
    };
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<AvaliacaoFormInputs>({
    resolver: zodResolver(avaliacaoSchema),
    mode: 'onChange',
    defaultValues: {
      notas: {},
    },
  });
  const { user } = useAuthContext();
  const [disciplinas, setDisciplinas] = useState<IdisciplinaRealizada[]>();
  const disciplinaId = watch('disciplinaRealizadaId');
  const avaliacaoId = watch('id');
  const [ligado, setLigado] = useState(false);
  const [avaliacoes, setAvaliacoes] = useState<Iavaliacao[]>();
  const [notas, setNotas] = useState<Inota[]>();
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
    const fetchAvaliacoes = async () => {
      if (ligado || !disciplinaId) {
        setValue('id', undefined);
        setValue('nome', '');
        setValue('data', '');
        setValue('valor', '');
        setValue('notas', {});
        return;
      }
      try {
        const data = (
          await api.get<Iavaliacao[]>(
            `/disciplinas-realizadas/${disciplinaId}/avaliacoes`,
          )
        ).data;
        setAvaliacoes(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
    };
    fetchAvaliacoes();
  }, [ligado, disciplinaId, setValue]);

  useEffect(() => {
    if (!avaliacoes) return;
    const avaliacao = avaliacoes.find((a) => a.id === Number(avaliacaoId));
    if (!avaliacao) return;
    setValue('nome', avaliacao.nome);
    setValue('data', (avaliacao.data as string).slice(0, 10));
    setValue('valor', String(avaliacao.valor));
  }, [avaliacaoId, avaliacoes, setValue]);

  useEffect(() => {
    const fetchNotas = async () => {
      if (!avaliacaoId) return;
      try {
        const data = (
          await api.get<Inota[]>(
            `/disciplinas-realizadas/avaliacoes/${avaliacaoId}/notas`,
          )
        ).data;
        setNotas(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
    };
    fetchNotas();
  }, [avaliacaoId]);

  useEffect(() => {
    if (!notas || notas.length === 0) {
      setValue('notas', {});
      alunosMatriculados?.forEach((a) => setValue(`notas.${a.id}`, ''));
      return;
    }
    setValue('notas', {});
    alunosMatriculados?.forEach((a) => setValue(`notas.${a.id}`, ''));
    notas.forEach((n) => {
      setValue(`notas.${n.matriculaId}`, String(n.valorObtido));
    });
  }, [notas, setValue, alunosMatriculados]);

  useEffect(() => {
    setNotas(undefined);
    setValue('id', undefined);
    setValue('nome', '');
    setValue('data', '');
    setValue('valor', '');
  }, [disciplinaId, ligado, setValue]);

  useEffect(() => {
    const fetchMatriculas = async () => {
      if (!disciplinaId) return;
      try {
        const data = (
          await api.get<Imatricula[]>(
            `/matriculas/disciplinas-realizadas/${disciplinaId}`,
          )
        ).data;
        setAlunosMatriculados(data);
        setValue('notas', {});
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
    };
    fetchMatriculas();
  }, [ligado, disciplinaId, setValue]);

  const alunosENotas: {
    notaId?: number;
    valorObtido?: number;
    matriculaId: number;
    nome: string;
  }[] = [];

  for (const matricula of alunosMatriculados ?? []) {
    let alunoENota: {
      notaId: number;
      valorObtido: number;
      matriculaId: number;
      nome: string;
    } | null = null;
    for (const nota of notas ?? []) {
      if (matricula.id === nota.matriculaId) {
        alunoENota = {
          notaId: nota.id,
          valorObtido: nota.valorObtido,
          matriculaId: nota.matriculaId,
          nome: nota.matricula.usuario.nome,
        };
        break;
      }
    }
    if (alunoENota) {
      alunosENotas.push(alunoENota);
    } else {
      alunosENotas.push({
        nome: matricula.usuario.nome,
        matriculaId: matricula.id,
      });
    }
  }
  const listaDeAlunosEmOrdemAlfabetica = alunosENotas.sort((a, b) =>
    a.nome.localeCompare(b.nome),
  );

  async function excluir() {
    if (!avaliacaoId) return;
    try {
      await api.delete(`/disciplinas-realizadas/avaliacoes/${avaliacaoId}`);
      setValue('id', '');
      setNotas(undefined);
      setValue('notas', {});
      setAvaliacoes((prev = []) =>
        prev.filter((avaliacao) => avaliacao.id !== Number(avaliacaoId)),
      );
      setValue('nome', '');
      setValue('data', '');
      setValue('valor', '');
      toast.success('Aula excluida com sucesso');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.erro);
      }
    }
  }

  async function onSubmit(data: AvaliacaoFormInputs) {
    try {
      if (data.id && !ligado) {
        await api.put(`/disciplinas-realizadas/avaliacoes/${data.id}`, {
          nome: data.nome,
          valor: Number(data.valor),
          data: stringToDate(data.data),
          disciplinaRealizadaId: Number(data.disciplinaRealizadaId),
        });
        const notasArray = alunosENotas.map((a) => ({
          // sempre precisa do matriculaId

          // se já existe nota no banco, vem com id
          ...(a.notaId
            ? {
                id: a.notaId,
                valorObtido:
                  Math.round(Number(data.notas[a.matriculaId] ?? 0) * 100) /
                  100,
              }
            : {
                matriculaId: a.matriculaId,

                id: undefined,
                valorObtido:
                  data.notas[a.matriculaId] === ''
                    ? undefined
                    : Math.round(Number(data.notas[a.matriculaId]) * 100) / 100,
              }),
        }));

        const notasExistentes = notasArray.filter((n) => n.id);
        const notasNovas = notasArray.filter(
          (n) =>
            n.id === undefined &&
            n.valorObtido !== undefined &&
            n.valorObtido >= 0,
        );

        await api.post(
          `/disciplinas-realizadas/avaliacoes/${data.id}/notas`,
          notasNovas,
        );
        await api.patch(
          `/disciplinas-realizadas/avaliacoes/${data.id}/notas`,
          notasExistentes,
        );

        setAvaliacoes((prev) =>
          prev?.map((avaliacao) =>
            avaliacao.id === Number(data.id)
              ? { ...avaliacao, titulo: data.nome }
              : avaliacao,
          ),
        );
        toast.success('Alterações salvas com sucesso!');

        setValue('id', '');
        setValue('nome', '');
        setValue('data', '');
        setValue('valor', '');
        setValue('notas', {});
      } else {
        const avaliacao = await api.post(
          `/disciplinas-realizadas/${data.disciplinaRealizadaId}/avaliacoes`,
          {
            nome: data.nome,
            valor: Number(data.valor),
            data: stringToDate(data.data),
          },
        );

        setLigado(false);
        setAvaliacoes((prev = []) => [...prev, avaliacao.data]);
        setValue('id', String(avaliacao.data.id));
        setAlunosMatriculados(undefined);
        toast.success('sucesso');

        const notasArray = alunosENotas.map((a) => ({
          // sempre precisa do matriculaId
          matriculaId: a.matriculaId,
          valorObtido:
            data.notas[a.matriculaId] === ''
              ? undefined
              : Math.round(Number(data.notas[a.matriculaId]) * 100) / 100,
        }));
        const notas = notasArray.filter(
          (n) => n.valorObtido !== undefined && n.valorObtido >= 0,
        );

        await api.post(
          `/disciplinas-realizadas/avaliacoes/${avaliacao.data.id}/notas`,
          notas,
        );
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.erro);
      }
    }
  }

  return (
    <main className="flex flex-col items-center p-4">
      <TituloPrincipal styles="mb-6">Avaliações</TituloPrincipal>
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

            {disciplinaId && (
              <>
                <div className="flex gap-2 items-center justify-center mt-3">
                  <span className="whitespace-nowrap">Nova Avaliação?</span>
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
                    <label htmlFor="id">Selecione a Avaliação</label>
                    <select
                      id="id"
                      className="border border-gray-700 p-2 rounded-md"
                      defaultValue=""
                      {...register('id')}
                    >
                      {avaliacoes && avaliacoes?.length > 0 ? (
                        <option disabled hidden value="">
                          Selecione uma avaliação
                        </option>
                      ) : (
                        <option disabled hidden value="">
                          Nenhuma avaliação cadastrada
                        </option>
                      )}
                      {avaliacoes?.map((avaliacao) => (
                        <option key={avaliacao.id} value={avaliacao.id}>
                          {avaliacao.nome}
                        </option>
                      ))}
                    </select>
                    {errors.id && (
                      <ErrorMessage>{errors.id.message}</ErrorMessage>
                    )}
                  </div>
                )}

                <Input label="Título da Avaliação" {...register('nome')} />
                {errors.nome && (
                  <ErrorMessage>{errors.nome.message}</ErrorMessage>
                )}
                <Input label="Data" type="date" {...register('data')} />
                {errors.data && (
                  <ErrorMessage>{errors.data.message}</ErrorMessage>
                )}
                <Input label="Valor" {...register('valor')} />
                {errors.valor && (
                  <ErrorMessage>{errors.valor.message}</ErrorMessage>
                )}

                <div className="flex justify-end gap-4">
                  {!ligado && avaliacaoId && (
                    <button
                      type="button"
                      className="text-white mt-4 py-2 px-3 rounded-md cursor-pointer bg-red-500 hover:bg-red-700"
                      onClick={excluir}
                    >
                      Excluir
                    </button>
                  )}
                  <BotaoPrincipal>
                    {isSubmitting ? 'Enviando...' : 'Salvar'}
                  </BotaoPrincipal>
                </div>
              </>
            )}
          </div>

          {disciplinaId && (ligado || avaliacaoId) && (
            <>
              <h3 className="font-titulo text-lg text-gray-800 mt-8">
                Lista de Presença
              </h3>
              <div className="w-4/5">
                <Table headers={['Nome', 'Presente']}>
                  {listaDeAlunosEmOrdemAlfabetica?.map((a) => (
                    <tr
                      key={a.matriculaId}
                      className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <td className="px-4 py-3 text-gray-800 font-medium">
                        {a.nome}
                      </td>
                      <td>
                        <input
                          className={`w-10 h-8 text-center  bg-white border rounded-md ${
                            errors.notas?.[a.matriculaId]
                              ? 'border-red-500'
                              : 'border-black'
                          }`}
                          {...register(`notas.${a.matriculaId}` as const)}
                        />
                        {/* {errors.notas[a.matriculaId] && (
                            <ErrorMessage>
                              {errors.notas[a.matriculaId]?.message}
                            </ErrorMessage>
                          )} */}
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

export default Avaliacoes;
