import { useEffect, useState } from 'react';
import Accordion from '../components/Accordion';
import Table from '../components/Table';
import TituloPrincipal from '../components/TituloPrincipal';
import type { Icurso } from '../interfaces/Icurso';
import api from '../api/api';
import { toast } from 'react-toastify';
import axios from 'axios';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router';

const ListarGrades = () => {
  interface Igrade {
    id: number;
    versao: number;
    cursoId: number;
    disciplinas: {
      id: number;
      nome: string;
      quantidadeAulas: number;
    }[];
  }
  const navigate = useNavigate();
  const [cursos, setCursos] = useState<Icurso[]>();
  const [selectCurso, setSelectCurso] = useState<number>();
  const [grades, setGrades] = useState<Igrade[]>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [gradeSelecionada, setGradeSelecionada] = useState<Igrade>();

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const dados = (await api.get<Icurso[]>('/cursos')).data;
        setCursos(dados.sort((a, b) => a.nome.localeCompare(b.nome)));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
    };
    fetchCursos();
  }, []);
  useEffect(() => {
    if (!selectCurso) return;
    const fetchGrades = async () => {
      try {
        const dados = (await api.get<Igrade[]>(`/grades/cursos/${selectCurso}`))
          .data;
        setGrades(dados);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
    };
    fetchGrades();
  }, [selectCurso]);

  function abrirModal(grade: Igrade) {
    setGradeSelecionada(grade);
    setIsOpenModal(true);
  }
  function excluirGrade(id: number) {
    try {
      api.delete(`/grades/${id}`);
      setIsOpenModal(false);
      setGrades((prev) => prev?.filter((grade) => grade.id !== id));
      toast.success('Grade excluida com sucesso');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.erro);
      }
    }
  }

  return (
    <main className="flex flex-col p-4 items-center justify-center">
      <TituloPrincipal styles="mb-6">Grades</TituloPrincipal>
      {cursos?.length === 0 ? (
        <p>Nenhum curso encontrado!</p>
      ) : (
        <>
          <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 mb-6">
            <label htmlFor="curso">Selecione o Curso</label>
            <select
              id="curso"
              className="w-full border border-gray-700 p-2 rounded-md"
              defaultValue=""
              value={selectCurso}
              onChange={(e) => setSelectCurso(Number(e.target.value))}
            >
              <option disabled hidden value="">
                Selecione um curso
              </option>
              {cursos?.map((curso) => (
                <option value={curso.id}>{curso.nome}</option>
              ))}
            </select>
          </div>

          {grades && grades.length === 0 && (
            <p>Nenhuma grade cadastrada para esse curso</p>
          )}
          {grades &&
            grades.length > 0 &&
            grades.map((grade) => (
              <Accordion
                key={grade.id}
                header={<p className="mb-6 text-xl">Versão: {grade.versao}</p>}
                body={
                  <>
                    {grade.disciplinas.length === 0 ? (
                      <p>Nenhuma disciplina cadastrada para essa grade</p>
                    ) : (
                      <Table headers={['disciplina', 'quantidade de aulas']}>
                        {grade.disciplinas.map((disciplina) => (
                          <tr
                            key={disciplina.id}
                            className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                          >
                            <td className="px-4 py-3 text-gray-600">
                              {disciplina.nome}
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {disciplina.quantidadeAulas}
                            </td>
                          </tr>
                        ))}
                      </Table>
                    )}
                    <div className="flex justify-end mt-4 gap-2">
                      <button
                        className="text-white bg-green-500 hover:bg-green-600 py-2 px-3 rounded-md cursor-pointer"
                        onClick={() =>
                          navigate(`/admin/grades/${grade.id}/editar`)
                        }
                      >
                        Editar
                      </button>
                      <button
                        className="text-white bg-red-500 hover:bg-red-600 py-2 px-3 rounded-md cursor-pointer"
                        onClick={() => abrirModal(grade)}
                      >
                        Excluir
                      </button>
                    </div>
                  </>
                }
              />
            ))}
          {isOpenModal && (
            <Modal
              titulo={`Excluir Grade de número: ${gradeSelecionada?.versao}`}
              setIsOpen={setIsOpenModal}
            >
              <div className="flex items-center justify-between">
                <p>
                  Tem certeza que deseja excluir o registro da versão{' '}
                  {gradeSelecionada?.versao}?
                </p>
                <div className="flex gap-3">
                  <button
                    className="cursor-pointer px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                    onClick={() => setIsOpenModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="cursor-pointer px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                    onClick={() => excluirGrade(gradeSelecionada!.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </>
      )}
    </main>
  );
};

export default ListarGrades;
