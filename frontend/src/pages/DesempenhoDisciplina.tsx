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

const DesempenhoDisciplina = () => {
  const { user } = useAuthContext();
  const [disciplinas, setDisciplinas] = useState<IdisciplinaRealizada[]>();
  const [disciplinaSelecionada, setDisciplinaSelecionada] =
    useState<string>('');
  const [matriculas, setMatriculas] = useState<Imatricula[]>();
  const [numeroAulas, setNumeroAulas] = useState(0);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const data = (
          await api.get<IdisciplinaRealizada[]>(
            `/disciplinas-realizadas/usuarios/${user?.id}`,
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
  }, [user?.id]);

  useEffect(() => {
    if (!disciplinaSelecionada) return;
    const fetchMatriculasAulasAvaliacoes = async () => {
      const matriculas = (
        await api.get<Imatricula[]>(
          `/matriculas/disciplinas-realizadas/${disciplinaSelecionada}`,
        )
      ).data;
      setMatriculas(matriculas);
      const aulas = (
        await api.get<{ quantidade: number }>(
          `/disciplinas-realizadas/${disciplinaSelecionada}/aulas`,
        )
      ).data;
      setNumeroAulas(aulas.quantidade);
    };
    fetchMatriculasAulasAvaliacoes();
  }, [disciplinaSelecionada]);

  return (
    <Layout>
      <main className="flex flex-col items-center p-4">
        <TituloPrincipal styles="mb-6">Desempenho</TituloPrincipal>
        {!disciplinas ? (
          <h3>Você não está dando nenhuma disciplina!</h3>
        ) : (
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
            <div className="w-4/5">
              <Table
                headers={[
                  'Nome',
                  'Aulas Totais',
                  'Presença',
                  'pontos distribuídos',
                  'Pontos do aluno',
                  'ver mais',
                ]}
              >
                {/* {listaDeAlunosEmOrdemAlfabetica?.map((a) => (
                  <tr
                    key={a.matriculaId}
                    className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <td className="px-4 py-3 text-gray-800 font-medium">
                      {a.nome}
                    </td>
                    <td></td>
                  </tr>
                ))} */}
              </Table>
            </div>
          </>
        )}
      </main>
    </Layout>
  );
};

export default DesempenhoDisciplina;
