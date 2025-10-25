import { useEffect, useState } from 'react';
import Table from '../components/Table';
import TituloPrincipal from '../components/TituloPrincipal';
import api from '../api/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import Modal from '../components/Modal';
import Input from '../components/Input';
import FormCursos from '../components/FormCursos';

export interface Icurso {
  id: number;
  nome: string;
}
const Cursos = () => {
  const [cursos, setCursos] = useState<Icurso[]>();
  const [listaCursos, setListaCursos] = useState<Icurso[]>();
  const [cursoSelecionado, setCursoSelecionado] = useState<Icurso>();
  const [loading, setLoading] = useState(true);
  const [isOpenModalExcluir, setIsOpenModalExcluir] = useState(false);
  const [isOpenModalAtualizar, setIsOpenModalAtualizar] = useState(false);
  const [isOpenModalCriar, setIsOpenModalCriar] = useState(false);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const data = (await api.get<Icurso[]>('/cursos')).data;

        setCursos(data);
        setListaCursos(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
      setLoading(false);
    };
    fetchCursos();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (pesquisa.trim() === '') {
        setListaCursos(cursos);
      } else {
        const termo = pesquisa.toLowerCase();
        const filter = cursos?.filter(
          (disciplina) =>
            disciplina.nome.toLowerCase().includes(termo) ||
            String(disciplina.id) === termo,
        );
        setListaCursos(filter);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [pesquisa, cursos]);

  function abrirModalExcluir(disciplina: Icurso) {
    setCursoSelecionado(disciplina);
    setIsOpenModalExcluir(true);
  }
  function abrirModalAtualizar(disciplina: Icurso) {
    setCursoSelecionado(disciplina);
    setIsOpenModalAtualizar(true);
  }
  function abrirModalCriar() {
    setIsOpenModalCriar(true);
  }
  function excluirDisciplina(id: number) {
    try {
      api.delete(`/cursos/${id}`);
      setIsOpenModalExcluir(false);
      setCursos((prev) => prev?.filter((disciplina) => disciplina.id !== id));
      toast.success('Curso excluido com sucesso');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.erro);
      }
    }
  }

  return (
    <main className="flex flex-col p-4 items-center justify-center">
      <TituloPrincipal styles="mb-6">Lista de Cursos</TituloPrincipal>
      <button
        className="text-white bg-green-500 hover:bg-green-600 py-2 px-3 rounded-md cursor-pointer flex items-center justify-center gap-1"
        onClick={abrirModalCriar}
      >
        <PlusIcon /> Criar Curso
      </button>
      {loading === false && cursos?.length === 0 ? (
        <h3 className="font-titulo">Nenhum Curso</h3>
      ) : (
        <div className="w-4/5">
          <div className="mb-2">
            <Input
              label="Pesquise..."
              placeholder="Pesquise por ID ou nome"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
          </div>
          <Table headers={['id', 'nome', 'ações']}>
            {listaCursos?.map((disciplina) => (
              <tr
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                key={disciplina.id}
              >
                <td className="px-4 py-3 text-gray-600">{disciplina.id}</td>
                <td className="px-4 py-3 text-gray-800 font-medium">
                  {disciplina.nome}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  <button
                    onClick={() => abrirModalExcluir(disciplina)}
                    className="cursor-pointer"
                    title="Excluir"
                  >
                    <Trash2Icon className="text-red-500" />
                  </button>
                  <button
                    onClick={() => abrirModalAtualizar(disciplina)}
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
              titulo={`Excluir Usuário: ${cursoSelecionado?.nome}`}
              setIsOpen={setIsOpenModalExcluir}
            >
              <div className="flex items-center justify-between">
                <p>
                  Tem certeza que deseja excluir o registro de{' '}
                  {cursoSelecionado?.nome}?
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
                    onClick={() => excluirDisciplina(cursoSelecionado!.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </Modal>
          )}
          {isOpenModalCriar && (
            <Modal titulo="Criar Curso" setIsOpen={setIsOpenModalCriar}>
              <FormCursos
                setIsOpenModal={setIsOpenModalCriar}
                setCursos={setCursos}
                setListaCursos={setListaCursos}
              />
            </Modal>
          )}
          {isOpenModalAtualizar && (
            <Modal titulo="Atualizar Curso" setIsOpen={setIsOpenModalAtualizar}>
              <FormCursos
                setIsOpenModal={setIsOpenModalAtualizar}
                setCursos={setCursos}
                setListaCursos={setListaCursos}
                curso={cursoSelecionado}
              />
            </Modal>
          )}
        </div>
      )}
    </main>
  );
};

export default Cursos;
