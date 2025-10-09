import { useEffect, useState } from 'react';
import type { IdisciplinaRealizada } from '../interfaces/IdisciplinaRealizada';
import { useAuthContext } from '../contexts/useAuthContext';
import axios from 'axios';
import api from '../api/api';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import TituloPrincipal from '../components/TituloPrincipal';
import Table from '../components/Table';
import type { Imatricula } from '../interfaces/Imatricula';
import type { Iaula } from '../interfaces/Iaula';
import type { Iavaliacao } from '../interfaces/Iavaliacao';
import { EyeIcon } from 'lucide-react';
import Modal from '../components/Modal';
import { stringToDate } from '../utils/ConverteStringEmDate';
import type { IusuarioBusca } from '../interfaces/IusuarioBusca';
import PesquisaUsuario from '../components/PesquisaUsuario';

const DesempenhoDisciplina = () => {
  interface Ipresenca {
    id: number;
    presente: boolean;
    matriculaId: number;
    aulaId: number;
  }
  interface Inota {
    id: number;
    valorObtido: string;
    matriculaId: number;
    avaliacaoId: number;
  }

  const { user } = useAuthContext();
  const [disciplinas, setDisciplinas] = useState<IdisciplinaRealizada[]>();
  const [disciplinaSelecionada, setDisciplinaSelecionada] =
    useState<string>('');
  const [matriculas, setMatriculas] = useState<Imatricula[]>();
  const [aulas, setAulas] = useState<Iaula[]>();
  const [avaliacoes, setAvaliacoes] = useState<Iavaliacao[]>();
  const [presencas, setPresencas] = useState<Ipresenca[]>();
  const [notas, setNotas] = useState<Inota[]>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [matriculaSelecionada, setMatriculaSelecioada] = useState<Imatricula>();
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
    if (!disciplinaSelecionada) return;
    const fetch = async () => {
      const matriculas = (
        await api.get<Imatricula[]>(
          `/matriculas/disciplinas-realizadas/${disciplinaSelecionada}`,
        )
      ).data;
      setMatriculas(matriculas);
      const aulas = (
        await api.get<Iaula[]>(
          `/disciplinas-realizadas/${disciplinaSelecionada}/aulas`,
        )
      ).data;
      aulas.forEach((a) => {
        a.data = stringToDate(a.data as string);
      });
      const aulasOrdenadas = aulas.sort(
        (a, b) => (a.data as Date).getTime() - (b.data as Date).getTime(),
      );
      setAulas(aulasOrdenadas);
      const avaliacoes = (
        await api.get<Iavaliacao[]>(
          `/disciplinas-realizadas/${disciplinaSelecionada}/avaliacoes`,
        )
      ).data;
      avaliacoes.forEach((a) => {
        a.data = stringToDate(a.data as string);
      });
      const avaliacoesOrdenadas = avaliacoes.sort(
        (a, b) => (a.data as Date).getTime() - (b.data as Date).getTime(),
      );
      setAvaliacoes(avaliacoesOrdenadas);
      const presencas = (
        await api.get<Ipresenca[]>(
          `/disciplinas-realizadas/${disciplinaSelecionada}/aulas/presencas`,
        )
      ).data;
      setPresencas(presencas);
      const notas = (
        await api.get<Inota[]>(
          `/disciplinas-realizadas/${disciplinaSelecionada}/avaliacoes/notas`,
        )
      ).data;
      setNotas(notas);
    };
    fetch();
  }, [disciplinaSelecionada]);

  const valorTotal = avaliacoes?.reduce((acc, a) => acc + a.valor, 0);

  function abrirModal(matricula: Imatricula) {
    setMatriculaSelecioada(matricula);
    setIsOpenModal(true);
  }
  return (
    <Layout>
      <main className="flex flex-col items-center p-4">
        <TituloPrincipal styles="mb-6">Desempenho</TituloPrincipal>
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
          <>
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
              <label htmlFor="disciplina">Selecione a Disciplina</label>
              <select
                id="disciplina"
                className="w-full border border-gray-700 p-2 rounded-md"
                defaultValue=""
                onChange={(e) => setDisciplinaSelecionada(e.target.value)}
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
            </div>

            {disciplinaSelecionada && matriculas && matriculas.length > 0 && (
              <div className="w-4/5 mt-8">
                <Table
                  headers={[
                    'Nome',
                    'Aulas Totais',
                    'Presenças',
                    'pontos distribuídos',
                    'Pontos do aluno',
                    'ver mais',
                  ]}
                >
                  {matriculas
                    .sort((a, b) =>
                      a.usuario.nome.localeCompare(b.usuario.nome),
                    )
                    .map((m) => (
                      <tr
                        key={m.id}
                        className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                      >
                        <td className="px-4 py-3 text-gray-800 font-medium">
                          {m.usuario.nome}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {aulas?.length}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {
                            presencas?.filter(
                              (presenca) =>
                                presenca.matriculaId === m.id &&
                                presenca.presente,
                            )?.length
                          }
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {valorTotal}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {notas
                            ?.filter((n) => n.matriculaId === m.id)
                            .reduce(
                              (acc, nota) => acc + Number(nota.valorObtido),
                              0,
                            )
                            .toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          <button
                            className="cursor-pointer flex items-center justify-center w-full"
                            onClick={() => abrirModal(m)}
                          >
                            <EyeIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                </Table>
              </div>
            )}
            {!matriculas ||
              (matriculas.length === 0 && <p>Nenhum aluno matriculado!</p>)}
          </>
        )}
        {isOpenModal && matriculaSelecionada && (
          <Modal
            setIsOpen={setIsOpenModal}
            titulo={`Desempenho de ${matriculaSelecionada.usuario.nome}`}
          >
            <h3 className="font-titulo text-center mb-4">Avaliações</h3>
            {avaliacoes && avaliacoes.length > 0 ? (
              <Table headers={['Avaliação', 'data', 'valor', 'nota']}>
                {avaliacoes.map((a) => (
                  <tr
                    key={a.id}
                    className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <td className="px-4 py-3 text-gray-800 font-medium">
                      {a.nome}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {(a.data as Date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{a.valor}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {notas?.find(
                        (n) =>
                          n.avaliacaoId === a.id &&
                          matriculaSelecionada.id === n.matriculaId,
                      )?.valorObtido ?? '-'}
                    </td>
                  </tr>
                ))}
              </Table>
            ) : (
              <p>Nenhuma avaliação cadastrada</p>
            )}
            <h3 className="font-titulo text-center my-4">Aulas</h3>
            {aulas && aulas.length > 0 ? (
              <Table headers={['Aula', 'data', 'presença']}>
                {aulas.map((a) => (
                  <tr
                    key={a.id}
                    className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <td className="px-4 py-3 text-gray-800 font-medium">
                      {a.titulo}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {(a.data as Date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {(() => {
                        const presente = presencas?.find(
                          (p) =>
                            p.aulaId === a.id &&
                            p.matriculaId === matriculaSelecionada?.id,
                        )?.presente;

                        return presente === undefined ? (
                          <span
                            title="O aluno não estava matriculado na data dessa aula"
                            className="cursor-help text-gray-500 italic"
                          >
                            Não matriculado
                          </span>
                        ) : presente ? (
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            Presente
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                            Ausente
                          </span>
                        );
                      })()}
                    </td>
                  </tr>
                ))}
              </Table>
            ) : (
              <p>Nenhuma aula cadastrada</p>
            )}
          </Modal>
        )}
      </main>
    </Layout>
  );
};

export default DesempenhoDisciplina;
