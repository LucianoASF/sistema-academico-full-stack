import { useEffect, useState } from 'react';
import Table from '../components/Table';
import TituloPrincipal from '../components/TituloPrincipal';
import api from '../api/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { stringToDate } from '../utils/ConverteStringEmDate';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { useAuthContext } from '../contexts/useAuthContext';
import { useNavigate } from 'react-router';

const ListaMatriculaCursos = () => {
  interface ImatriculaCurso {
    id: number;
    status: 'cursando' | 'finalizado' | 'trancado' | 'abandonado';
    dataInicio: Date | string;
    dataFim: Date | string | null;
    alunoId: number;
    usuario: {
      nome: string;
    };
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
  }
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [matriculaCursos, setMatriculaCursos] = useState<ImatriculaCurso[]>();
  const [listaMatriculaCursos, setListaMatriculaCursos] =
    useState<ImatriculaCurso[]>();
  const [loading, setLoading] = useState(true);
  const [isOpenModalExcluir, setIsOpenModalExcluir] = useState(false);
  const [matriculaSelecionada, setMatriculaSelecionada] =
    useState<ImatriculaCurso>();
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    const fetchMatriculas = async () => {
      try {
        const data = (await api.get<ImatriculaCurso[]>('/matriculas-cursos'))
          .data;
        data.forEach((d) => {
          d.dataInicio = stringToDate(d.dataInicio as string);
          if (d.dataFim) d.dataFim = stringToDate(d.dataFim as string);
        });
        setMatriculaCursos(data);
        setListaMatriculaCursos(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
      setLoading(false);
    };
    fetchMatriculas();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (pesquisa.trim() === '') {
        setListaMatriculaCursos(matriculaCursos);
      } else {
        const termo = pesquisa.toLowerCase();
        const filter = matriculaCursos?.filter(
          (m) =>
            m.usuario.nome.toLowerCase().includes(termo) ||
            String(m.id) === termo ||
            m.grade.curso.nome.toLowerCase().includes(termo) ||
            m.status.toLowerCase().includes(termo),
        );
        setListaMatriculaCursos(filter);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [pesquisa, matriculaCursos]);

  function abrirModalExcluir(matricula: ImatriculaCurso) {
    setMatriculaSelecionada(matricula);
    setIsOpenModalExcluir(true);
  }
  function excluirMatricula(id: number) {
    try {
      api.delete(`/matriculas-cursos/${id}`);
      setIsOpenModalExcluir(false);
      setMatriculaCursos((prev) =>
        prev?.filter((matricula) => matricula.id !== id),
      );
      toast.success('Matrícula excluida com sucesso');
      if (user?.id === id) logout();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.erro);
      }
    }
  }

  return (
    <main className="flex flex-col p-4 items-center justify-center">
      <TituloPrincipal styles="mb-6">
        Lista de Matrículas de Cursos
      </TituloPrincipal>
      {loading === false && matriculaCursos?.length === 0 ? (
        <h3 className="font-titulo">Nenhum Matrícula de Curso</h3>
      ) : (
        <div className="w-4/5">
          <div className="mb-2">
            <Input
              label="Pesquise..."
              placeholder="Pesquise por ID, nome de aluno, curso ou status"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
          </div>
          <Table
            headers={[
              'id',
              'nome',
              'curso',
              'status',
              'data de início',
              'data de término',
              'ações',
            ]}
          >
            {listaMatriculaCursos?.map((matricula) => (
              <tr
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                key={matricula.id}
              >
                <td className="px-4 py-3 text-gray-600">{matricula.id}</td>
                <td className="px-4 py-3 text-gray-800 font-medium">
                  {matricula.usuario.nome}
                </td>
                <td className="px-4 py-3 text-gray-800">
                  {matricula.grade.curso.nome}
                </td>
                <td className="px-4 py-3 text-gray-800">{matricula.status}</td>
                <td className="px-4 py-3 text-gray-600">
                  {(matricula.dataInicio as Date).toLocaleDateString('pt-br')}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {matricula.dataFim
                    ? (matricula.dataInicio as Date).toLocaleDateString('pt-br')
                    : '-'}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  <button
                    onClick={() => abrirModalExcluir(matricula)}
                    className="cursor-pointer"
                    title="Excluir"
                  >
                    <Trash2Icon className="text-red-500" />
                  </button>
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/matriculas-de-cursos/${matricula.id}/editar`,
                      )
                    }
                    className="cursor-pointer"
                    title="Atualizar"
                  >
                    <PencilIcon className="text-green-500" />
                  </button>
                </td>
              </tr>
            ))}
          </Table>

          {isOpenModalExcluir && (
            <Modal
              titulo={`Deseja realmete excluia a matrícula de n° ${matriculaSelecionada?.id}?`}
              setIsOpen={setIsOpenModalExcluir}
            >
              <div className="flex items-center justify-between flex-col md:flex-row gap-2">
                <p>
                  Tem certeza que deseja Excluir Matrícula de n°
                  {matriculaSelecionada?.id}, de{' '}
                  {matriculaSelecionada?.usuario.nome} no curso{' '}
                  {matriculaSelecionada?.grade.curso.nome}?
                </p>
                <div className="flex gap-3">
                  <button
                    className="cursor-pointer px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                    onClick={() => setIsOpenModalExcluir(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="cursor-pointer px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                    onClick={() => excluirMatricula(matriculaSelecionada!.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      )}
    </main>
  );
};

export default ListaMatriculaCursos;
