import { useEffect, useState } from 'react';
import Table from '../components/Table';
import TituloPrincipal from '../components/TituloPrincipal';
import api from '../api/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import { stringToDate } from '../utils/ConverteStringEmDate';
import { ListChevronsUpDownIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { useAuthContext } from '../contexts/useAuthContext';
import { useNavigate } from 'react-router';

const ListaUsuarios = () => {
  interface Iusuario {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    dataNascimento: Date | string;
    role: 'professor' | 'aluno' | 'administrador';
  }
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Iusuario[]>();
  const [listaUsuarios, setListaUsuarios] = useState<Iusuario[]>();
  const [loading, setLoading] = useState(true);
  const [isOpenModalDetalhes, setIsOpenModalDetalhes] = useState(false);
  const [isOpenModalExcluir, setIsOpenModalExcluir] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Iusuario>();
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = (await api.get<Iusuario[]>('/usuarios?completo=true'))
          .data;
        data.forEach(
          (d) => (d.dataNascimento = stringToDate(d.dataNascimento as string)),
        );
        setUsuarios(data);
        setListaUsuarios(data);
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
        setListaUsuarios(usuarios);
      } else {
        const termo = pesquisa.toLowerCase();
        const filter = usuarios?.filter(
          (usuario) =>
            usuario.nome.toLowerCase().includes(termo) ||
            String(usuario.id) === termo,
        );
        setListaUsuarios(filter);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [pesquisa, usuarios]);

  function abrirModalDetalhes(usuario: Iusuario) {
    setUsuarioSelecionado(usuario);
    setIsOpenModalDetalhes(true);
  }
  function abrirModalExcluir(usuario: Iusuario) {
    setUsuarioSelecionado(usuario);
    setIsOpenModalExcluir(true);
  }
  function excluirUsuario(id: number) {
    try {
      api.delete(`/usuarios/${id}`);
      setIsOpenModalExcluir(false);
      setUsuarios((prev) => prev?.filter((usuario) => usuario.id !== id));
      toast.success('Usuário excluido com sucesso');
      if (user?.id === id) logout();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.erro);
      }
    }
  }

  return (
    <main className="flex flex-col p-4 items-center justify-center">
      <TituloPrincipal styles="mb-6">Lista de Usuários</TituloPrincipal>
      {loading === false && usuarios?.length === 0 ? (
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
          <Table
            headers={['id', 'nome', 'data de nascimento', 'role', 'ações']}
          >
            {listaUsuarios?.map((usuario) => (
              <tr
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                key={usuario.id}
              >
                <td className="px-4 py-3 text-gray-600">{usuario.id}</td>
                <td className="px-4 py-3 text-gray-800 font-medium">
                  {usuario.nome}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {(usuario.dataNascimento as Date).toLocaleDateString('pt-br')}
                </td>
                <td className="px-4 py-3 text-gray-600 capitalize">
                  {usuario.role}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  <button
                    onClick={() => abrirModalDetalhes(usuario)}
                    className="cursor-pointer"
                    title="Detalhes"
                  >
                    <ListChevronsUpDownIcon className="text-blue-500" />
                  </button>
                  <button
                    onClick={() => abrirModalExcluir(usuario)}
                    className="cursor-pointer"
                    title="Excluir"
                  >
                    <Trash2Icon className="text-red-500" />
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/admin/usuarios/${usuario.id}/editar`)
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
          {isOpenModalDetalhes && (
            <Modal
              titulo="Detalhes do usuário"
              setIsOpen={setIsOpenModalDetalhes}
            >
              <div className="flex justify-center">
                <div>
                  <p>
                    <span className="font-bold">ID:</span>{' '}
                    {usuarioSelecionado?.id}
                  </p>
                  <p>
                    <span className="font-bold">Nome:</span>{' '}
                    {usuarioSelecionado?.nome}
                  </p>
                  <p>
                    <span className="font-bold">Email:</span>{' '}
                    {usuarioSelecionado?.email}
                  </p>
                  <p>
                    <span className="font-bold">CPF:</span>{' '}
                    {usuarioSelecionado?.cpf.replace(
                      /(\d{3})(\d{3})(\d{3})(\d{2})/,
                      '$1.$2.$3-$4',
                    )}
                  </p>
                  <p>
                    <span className="font-bold">Telefone:</span>{' '}
                    {usuarioSelecionado?.telefone.replace(
                      /(\d{2})(\d{5})(\d{4})/,
                      '($1) $2-$3',
                    )}
                  </p>
                  <p className="capitalize">
                    <span className="font-bold">Role:</span>{' '}
                    {usuarioSelecionado?.role}
                  </p>
                </div>
              </div>
            </Modal>
          )}
          {isOpenModalExcluir && (
            <Modal
              titulo={`Excluir Usuário: ${usuarioSelecionado?.nome}`}
              setIsOpen={setIsOpenModalExcluir}
            >
              <div className="flex items-center justify-between">
                <p>
                  Tem certeza que deseja excluir o registro de{' '}
                  {usuarioSelecionado?.nome}?
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
                    onClick={() => excluirUsuario(usuarioSelecionado!.id)}
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

export default ListaUsuarios;
