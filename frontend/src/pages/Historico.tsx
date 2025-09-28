import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';
import TituloPrincipal from '../components/TituloPrincipal';
import api from '../api/api';
import { useAuthContext } from '../contexts/useAuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import Card from '../components/Card';
import { stringToDate } from '../utils/ConverteStringEmDate';

const Historico = () => {
  const { user } = useAuthContext();

  type typeCursos = {
    id: number;
    dataInicio: string | Date;
    dataFim: string | null | Date;
    status: string;
    alunoId: number;
    gradeId: number;
    grade: {
      id: number;
      versao: number;
      cursoId: number;
      curso: {
        id: number;
        nome: string;
      };
    };
  };

  const [cursos, setCursos] = useState<typeCursos[]>();

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const data = (
          await api.get<typeCursos[]>(`/matriculas-cursos/usuarios/${user?.id}`)
        ).data;
        data.forEach((dado) => {
          dado.dataInicio = stringToDate(dado.dataInicio as string);
        });
        data.forEach((dado) => {
          if (dado.dataFim) {
            dado.dataFim = stringToDate(dado.dataFim as string);
          }
        });
        setCursos(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
    };
    fetchCursos();
  }, [user?.id]);

  const [radioSelecionado, setRadioSelecionado] = useState<number>(0);

  type typeGrade = {
    id: number;
    versao: number;
    cursoId: number;
    disciplinas: {
      id: number;
      nome: string;
      quantidadeAulas: number;
    }[];
  };

  type typeMatriculaDisciplinaRealizada = {
    id: number;
    notaFinal: number | null;
    presencaFinal: number | null;
    status: 'cursando' | 'aprovado' | 'reprovado' | 'abandonado';
    alunoId: number;
    disciplinaRealizadaId: number;
    disciplinaRealizada: {
      dataInicio: string;
      dataFim: null | string;
      disciplinaId: number;
    };
  };

  const [grade, setGrade] = useState<typeGrade>();
  const [matriculaDiscipliansRealizadas, setMatriculaDisciplinasRealizadas] =
    useState<typeMatriculaDisciplinaRealizada[]>();

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        if (radioSelecionado === 0) return;
        const data = (await api.get<typeGrade>(`/grades/${radioSelecionado}`))
          .data;
        setGrade(data);
        const data2 = (
          await api.get<typeMatriculaDisciplinaRealizada[]>(
            `/matriculas/usuarios/${user?.id}`,
          )
        ).data;
        setMatriculaDisciplinasRealizadas(data2);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
    };
    fetchGrade();
  }, [radioSelecionado, user?.id]);

  const disciplinas: {
    id: number;
    nome: string;
    quantidadeAulas: number;
    notaFinal: number | null;
    presencaFinal: number | null;
    status: 'cursando' | 'aprovado' | 'reprovado' | 'abandonado' | null;
    dataInicio: Date | null;
    dataFim: null | Date;
  }[] = [];

  for (const disciplinaGrade of grade?.disciplinas ?? []) {
    let aprovado: (typeof disciplinas)[number] | null = null;
    let cursando: (typeof disciplinas)[number] | null = null;
    let reprovado: (typeof disciplinas)[number] | null = null;
    let abandonado: (typeof disciplinas)[number] | null = null;

    for (const matricula of matriculaDiscipliansRealizadas ?? []) {
      if (disciplinaGrade.id === matricula.disciplinaRealizada.disciplinaId) {
        if (matricula.status === 'aprovado') {
          aprovado = {
            id: disciplinaGrade.id,
            nome: disciplinaGrade.nome,
            quantidadeAulas: disciplinaGrade.quantidadeAulas,
            notaFinal: matricula.notaFinal,
            presencaFinal: matricula.presencaFinal,
            status: matricula.status,
            dataInicio: stringToDate(
              matricula.disciplinaRealizada.dataInicio as string,
            ),
            dataFim: stringToDate(
              matricula.disciplinaRealizada.dataFim as string,
            ),
          };
          break; // não precisa olhar mais, prioridade é aprovado
        }

        if (matricula.status === 'cursando') {
          cursando = {
            id: disciplinaGrade.id,
            nome: disciplinaGrade.nome,
            quantidadeAulas: disciplinaGrade.quantidadeAulas,
            notaFinal: null,
            presencaFinal: null,
            status: matricula.status,
            dataInicio: stringToDate(
              matricula.disciplinaRealizada.dataInicio as string,
            ),
            dataFim: null,
          };
          // não dá break aqui, porque pode ter um aprovado depois
        } else if (matricula.status === 'reprovado') {
          reprovado = {
            id: disciplinaGrade.id,
            nome: disciplinaGrade.nome,
            quantidadeAulas: disciplinaGrade.quantidadeAulas,
            notaFinal: matricula.notaFinal,
            presencaFinal: matricula.presencaFinal,
            status: matricula.status,
            dataInicio: stringToDate(
              matricula.disciplinaRealizada.dataInicio as string,
            ),
            dataFim: stringToDate(
              matricula.disciplinaRealizada.dataFim as string,
            ),
          };
        } else if (matricula.status === 'abandonado') {
          abandonado = {
            id: disciplinaGrade.id,
            nome: disciplinaGrade.nome,
            quantidadeAulas: disciplinaGrade.quantidadeAulas,
            notaFinal: null,
            presencaFinal: null,
            status: matricula.status,
            dataInicio: stringToDate(
              matricula.disciplinaRealizada.dataInicio as string,
            ),
            dataFim: stringToDate(
              matricula.disciplinaRealizada.dataFim as string,
            ),
          };
        }
      }
    }

    // salva o que tiver prioridade
    if (aprovado) {
      disciplinas.push(aprovado);
    } else if (cursando) {
      disciplinas.push(cursando);
    } else if (reprovado && abandonado) {
      if (reprovado.dataInicio! >= abandonado.dataInicio!) {
        disciplinas.push(reprovado);
      } else {
        disciplinas.push(abandonado);
      }
    } else if (reprovado) {
      disciplinas.push(reprovado);
    } else if (abandonado) {
      disciplinas.push(abandonado);
    } else {
      disciplinas.push({
        id: disciplinaGrade.id,
        nome: disciplinaGrade.nome,
        quantidadeAulas: disciplinaGrade.quantidadeAulas,
        notaFinal: null,
        presencaFinal: null,
        status: null,
        dataInicio: null,
        dataFim: null,
      });
    }
  }

  return (
    <Layout>
      <main className="flex flex-col p-4 items-center">
        <TituloPrincipal styles="mb-4">Histórico</TituloPrincipal>
        <div className="flex overflow-x-auto gap-4 py-2 w-full justify-center flex-wrap">
          {!cursos && (
            <h3 className="font-titulo">
              Você não está matriculado em nenhum curso!
            </h3>
          )}
          {cursos &&
            cursos.map((curso) => (
              <div
                key={curso.id}
                className="flex flex-col basis-90 grow-0 shrink-0"
              >
                <Card>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-titulo p-4 text-gray-900">
                        {curso.grade.curso.nome}
                      </h3>
                      <p className="pl-4">Status: {curso.status}</p>
                      <p className="pl-4">
                        Data de Inicio:{' '}
                        {(curso.dataInicio as Date).toLocaleDateString('pt-br')}
                      </p>
                      <p className="pl-4">
                        Data de Término:{' '}
                        {curso.dataFim
                          ? (curso.dataFim as Date).toLocaleDateString('pt-br')
                          : 'Em andamento'}
                      </p>
                    </div>
                    <input
                      type="radio"
                      name="selecionaMatriculaCurso"
                      value={curso.gradeId}
                      checked={radioSelecionado === curso.gradeId}
                      onChange={(e) =>
                        setRadioSelecionado(Number(e.target.value))
                      }
                      className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full relative
                       checked:border-purple-700 checked:after:absolute checked:after:w-3 checked:after:h-3 checked:after:rounded-full
                        checked:after:bg-purple-500 checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 
                        checked:after:-translate-y-1/2 transition"
                    />
                  </div>
                </Card>
              </div>
            ))}
        </div>
        <div className="w-4/5">
          {radioSelecionado > 0 && (
            <Table
              headers={[
                'Disciplina',
                'Nota',
                'Presença',
                'Status',
                'Início',
                'Fim',
              ]}
            >
              {disciplinas.map((disciplina) => (
                <tr
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                  key={disciplina.id}
                >
                  <td className="px-4 py-3 text-gray-800 font-medium">
                    {disciplina.nome}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {disciplina.notaFinal ?? '-'}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {disciplina.presencaFinal ?? '-'}/
                    {disciplina.quantidadeAulas}
                  </td>
                  {disciplina.status ? (
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 capitalize rounded-full ${
                          {
                            cursando: 'bg-blue-100 text-blue-700',
                            aprovado: 'bg-green-100 text-green-700',
                            reprovado: 'bg-red-100 text-red-700',
                            abandonado: 'bg-yellow-100 text-yellow-700',
                          }[disciplina.status]
                        }`}
                      >
                        {disciplina.status}
                      </span>
                    </td>
                  ) : (
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700 whitespace-nowrap">
                        Não Cursado
                      </span>
                    </td>
                  )}
                  <td className="px-4 py-3 text-gray-600">
                    {disciplina.dataInicio?.toLocaleDateString('pt-br') ?? '-'}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {disciplina.dataFim?.toLocaleDateString('pt-br') ?? '-'}
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Historico;
