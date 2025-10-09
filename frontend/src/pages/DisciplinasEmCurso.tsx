import { useEffect, useState } from 'react';
import Accordion from '../components/Accordion';
import TituloPrincipal from '../components/TituloPrincipal';
import api from '../api/api';
import { useAuthContext } from '../contexts/useAuthContext';
import PesquisaUsuario from '../components/PesquisaUsuario';
import type { IusuarioBusca } from '../interfaces/IusuarioBusca';

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
  const [selecionado, setSelecionado] = useState<IusuarioBusca | null>(null);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      if (!user || (user.role === 'administrador' && !selecionado)) {
        setMatriculas(undefined);
        return;
      }
      try {
        const dados = (
          await api.get(
            `/matriculas/usuarios/${
              user.role === 'administrador' ? selecionado?.id : user.id
            }/cursando`,
          )
        ).data;
        setMatriculas(dados);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDisciplinas();
  }, [user, selecionado]);

  return (
    <main className="p-4 flex flex-col items-center">
      <TituloPrincipal styles="mb-16">Disciplinas em Curso</TituloPrincipal>
      {user?.role === 'administrador' && (
        <PesquisaUsuario
          role="aluno"
          selecionado={selecionado}
          setSelecionado={setSelecionado}
        />
      )}
      {matriculas?.map((matricula) => (
        <Accordion
          key={matricula.id}
          matriculaId={matricula.id}
          disciplina={matricula.disciplinaRealizada.disciplina.nome}
          professor={matricula.disciplinaRealizada.professor.nome}
        />
      ))}
      {!matriculas && user?.role !== 'administrador' && (
        <p>Você não esta cursando nenhuma disciplina!</p>
      )}
    </main>
  );
};

export default DisciplinasEmCurso;
