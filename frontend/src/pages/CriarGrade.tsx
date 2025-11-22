import { useEffect, useState } from 'react';
import Table from '../components/Table';
import TituloPrincipal from '../components/TituloPrincipal';
import type { Idisciplina } from '../interfaces/Idisciplina';
import api from '../api/api';
import { toast } from 'react-toastify';
import axios from 'axios';
import type { Icurso } from '../interfaces/Icurso';
import { useNavigate } from 'react-router';

const CriarGrade = () => {
  const navigate = useNavigate();
  const [disciplinas, setDisciplinas] = useState<Idisciplina[]>();
  const [cursos, setCursos] = useState<Icurso[]>();
  const [selectCurso, setSelectCurso] = useState<number>();
  const [disciplinasId, setDisciplinasId] = useState<number[]>([]);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const data = (await api.get<Idisciplina[]>('/disciplinas')).data;
        setDisciplinas(data);
        const dados = (await api.get<Icurso[]>('/cursos')).data;
        setCursos(dados);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.erro);
        }
      }
    };
    fetchDisciplinas();
  }, []);

  async function Enviar() {
    try {
      const grade = (
        await api.post<{ id: number; versao: number; cursoId: number }>(
          `/grades/${selectCurso}`,
        )
      ).data;
      await api.patch(`/grades/${grade.id}/disciplinas/adicionar`, {
        disciplinas: disciplinasId,
      });
      toast.success('Grade criada com sucesso!');
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
      <TituloPrincipal styles="mb-10">Criar Grade</TituloPrincipal>

      {cursos?.length === 0 ? (
        <p>Nenhum curso encontrado!</p>
      ) : (
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
              <option key={curso.id} value={curso.id}>
                {curso.nome}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectCurso && (
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
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDisciplinasId((prev) => [...prev, disciplina.id]);
                      } else {
                        setDisciplinasId((prev) =>
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
              Criar Grade
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default CriarGrade;
