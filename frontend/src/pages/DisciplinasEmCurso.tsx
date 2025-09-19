import { useEffect, useState } from 'react';
import Accordion from '../components/Accordion';
import Layout from '../components/Layout';
import TituloPrincipal from '../components/TituloPrincipal';
import api from '../api/api';
import { useAuthContext } from '../contexts/useAuthContext';

const DisciplinasEmCurso = () => {
  const [matriculas, setMatriculas] = useState<
    {
      id: number;
      alunoId: number;
      disciplinaRealizadaId: number;
      disciplinaRealizada: {
        disciplina: {
          nome: string;
        };
        professor: {
          nome: string;
        };
      };
    }[]
  >();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const dados = (
          await api.get(`/matriculas/usuarios/${user?.id}/cursando`)
        ).data;
        setMatriculas(dados);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDisciplinas();
  }, [user?.id]);

  return (
    <Layout>
      <main className="p-4 flex flex-col items-center">
        <TituloPrincipal styles="mb-16">Disciplinas em Curso</TituloPrincipal>
        {matriculas?.map((matricula) => (
          <Accordion
            key={matricula.id}
            matriculaId={matricula.id}
            disciplina={matricula.disciplinaRealizada.disciplina.nome}
            professor={matricula.disciplinaRealizada.professor.nome}
          />
        ))}
      </main>
    </Layout>
  );
};

export default DisciplinasEmCurso;
