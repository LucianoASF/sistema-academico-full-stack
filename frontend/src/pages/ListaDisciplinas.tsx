import { useEffect, useState } from 'react';
import Table from '../components/Table';
import TituloPrincipal from '../components/TituloPrincipal';
import api from '../api/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Trash2Icon } from 'lucide-react';
import Modal from '../components/Modal';
import Input from '../components/Input';

const ListaDisciplinas = () => {
  interface Idisciplina {
    id: number;
    nome: string;
    quantidadeAulas: number;
  }
  const [disciplinas, setDisciplinas] = useState<Idisciplina[]>();
  const [listaDisciplinas, setListaDisciplinas] = useState<Idisciplina[]>();
  const [disciplinaSelecionada, setDisciplinaSelecionada] =
    useState<Idisciplina>();
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = (await api.get<Idisciplina[]>('/disciplinas')).data;

        setDisciplinas(data);
        setListaDisciplinas(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
      setLoading(false);
    };
    fetchUsuarios();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (pesquisa.trim() === '') {
        setListaDisciplinas(disciplinas);
      } else {
        const termo = pesquisa.toLowerCase();
        const filter = disciplinas?.filter(
          (disciplina) =>
            disciplina.nome.toLowerCase().includes(termo) ||
            String(disciplina.id) === termo,
        );
        setListaDisciplinas(filter);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [pesquisa, disciplinas]);

  function abrirModal(disciplina: Idisciplina) {
    setDisciplinaSelecionada(disciplina);
    setIsOpenModal(true);
  }
  function excluirDisciplina(id: number) {
    try {
      api.delete(`/disciplinas/${id}`);
      setIsOpenModal(false);
      setDisciplinas((prev) =>
        prev?.filter((disciplina) => disciplina.id !== id),
      );
      toast.success('Disciplina excluida com sucesso');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.erro);
      }
    }
  }

  return (
    <main className="flex flex-col p-4 items-center justify-center">
      <TituloPrincipal styles="mb-6">Lista de Disciplinas</TituloPrincipal>
      {loading === false && disciplinas?.length === 0 ? (
        <h3 className="font-titulo">Nenhum Usuário</h3>
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
          <Table headers={['id', 'nome', 'quantidade de aulas', 'ações']}>
            {listaDisciplinas?.map((disciplina) => (
              <tr
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                key={disciplina.id}
              >
                <td className="px-4 py-3 text-gray-600">{disciplina.id}</td>
                <td className="px-4 py-3 text-gray-800 font-medium">
                  {disciplina.nome}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {disciplina.quantidadeAulas}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  <button
                    onClick={() => abrirModal(disciplina)}
                    className="cursor-pointer"
                    title="Excluir"
                  >
                    <Trash2Icon className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </Table>

          {isOpenModal && (
            <Modal
              titulo={`Excluir Usuário: ${disciplinaSelecionada?.nome}`}
              setIsOpen={setIsOpenModal}
            >
              <div className="flex items-center justify-between">
                <p>
                  Tem certeza que deseja excluir o registro de{' '}
                  {disciplinaSelecionada?.nome}?
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
                    onClick={() => excluirDisciplina(disciplinaSelecionada!.id)}
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

export default ListaDisciplinas;
