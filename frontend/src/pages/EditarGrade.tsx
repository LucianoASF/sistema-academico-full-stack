import { useEffect, useState } from 'react';
import Table from '../components/Table';
import TituloPrincipal from '../components/TituloPrincipal';
import type { Idisciplina } from '../interfaces/Idisciplina';
import api from '../api/api';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';

const EditarGrade = () => {
  interface Igrade {
    id: number;
    versao: number;
    cursoId: number;
    disciplinas: {
      id: number;
      nome: string;
      quantidadeAulas: number;
    }[];
    curso: {
      nome: string;
    };
  }

  const navigate = useNavigate();
  const { id } = useParams();
  const [disciplinas, setDisciplinas] = useState<Idisciplina[]>();
  const [grade, setGrade] = useState<Igrade>();
  const [disciplinasSelecionadasId, setDisciplinasSelecionadasId] = useState<
    number[]
  >([]);
  const [disciplinasNaoSelecionadasId, setDisciplinasNaoSelecionadasId] =
    useState<number[]>([]);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const dados = (await api.get<Igrade>(`/grades/${id}`)).data;
        setGrade(dados);
        const selecionadas = dados.disciplinas.map((d) => d.id);
        setDisciplinasSelecionadasId(selecionadas);
        const data = (await api.get<Idisciplina[]>('/disciplinas')).data;
        setDisciplinas(data);
        const disciplinasNaoSelecionadas = data.filter(
          (disciplina) => !selecionadas.includes(disciplina.id),
        );
        setDisciplinasNaoSelecionadasId(
          disciplinasNaoSelecionadas.map((d) => d.id),
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
    };
    fetchDisciplinas();
  }, [id]);

  async function Enviar() {
    try {
      await api.patch(`/grades/${id}/disciplinas/adicionar`, {
        disciplinas: disciplinasSelecionadasId,
      });
      await api.patch(`/grades/${id}/disciplinas/remover`, {
        disciplinas: disciplinasNaoSelecionadasId,
      });
      toast.success('Alterações salvas com sucesso!');
      navigate('/admin/grades');
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.erro);
      }
    }
  }

  return (
    <main className="flex flex-col p-4 items-center">
      <TituloPrincipal styles="mb-4">Editar Grade</TituloPrincipal>
      <div className="mb-4 text-center">
        <h4>
          Curso: <b>{grade?.curso.nome}</b>
        </h4>
        <h4>
          Versão da Grade: <b>{grade?.versao}</b>
        </h4>
      </div>
      <div className="w-4/5">
        <Table
          headers={['id', 'Disciplina', 'quantidade de aulas', 'selecionar']}
        >
          {disciplinas?.map((disciplina) => (
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
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-purple-500 cursor-pointer"
                  checked={disciplinasSelecionadasId.includes(disciplina.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDisciplinasSelecionadasId((prev) => [
                        ...prev,
                        disciplina.id,
                      ]);
                      setDisciplinasNaoSelecionadasId((prev) =>
                        prev.filter((item) => disciplina.id !== item),
                      );
                    } else {
                      setDisciplinasNaoSelecionadasId((prev) => [
                        ...prev,
                        disciplina.id,
                      ]);
                      setDisciplinasSelecionadasId((prev) =>
                        prev.filter((item) => disciplina.id !== item),
                      );
                    }
                  }}
                />
              </td>
            </tr>
          ))}
        </Table>
        <div className="flex justify-end">
          <button
            className="bg-purple-950 text-white mt-4 py-2 px-3 rounded-md cursor-pointer hover:bg-purple-900 hover:text-gray-200"
            onClick={Enviar}
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </main>
  );
};

export default EditarGrade;
