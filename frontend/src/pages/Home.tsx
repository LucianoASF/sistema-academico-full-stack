import CardHome from '../components/CardHome';
import TituloPrincipal from '../components/TituloPrincipal';
import { useAuthContext } from '../contexts/useAuthContext';

const Home = () => {
  const { user } = useAuthContext();

  return (
    <main className="p-4">
      <TituloPrincipal styles="text-center">Home</TituloPrincipal>
      <div className="md:grid grid-cols-2">
        {user?.role === 'aluno' && (
          <>
            <CardHome
              titulo="Disciplinas em Curso"
              paragrafo="Você deseja visualizar as disciplinas que você está cursando atualmente?"
              nomeDoBotao="Visualizar"
              to="/disciplinas-em-curso"
            />
            <CardHome
              titulo="Atualizar Cadastro"
              paragrafo="Você deseja atualizar seu cadastro?"
              nomeDoBotao="Atualizar"
              to="/atualizar-cadastro"
            />
            <CardHome
              titulo="Histórico"
              paragrafo="Você deseja visualizar seu histórico?"
              nomeDoBotao="Visualizar"
              to="/historico"
            />
          </>
        )}
        {user?.role === 'professor' && (
          <>
            <CardHome
              titulo="Lançar ou ver aulas/presenças"
              paragrafo="Você deseja visualizar ou lançar aulas/presenças?"
              nomeDoBotao="Visualizar"
              to="/aulas"
            />
            <CardHome
              titulo="Lançar ou ver avaliações/notas"
              paragrafo="Você deseja visualizar ou lançar avaliações/notas?"
              nomeDoBotao="Visualizar"
              to="/avaliacoes"
            />
            <CardHome
              titulo="Atualizar Cadastro"
              paragrafo="Você deseja atualizar seu cadastro?"
              nomeDoBotao="Atualizar"
              to="/atualizar-cadastro"
            />
            <CardHome
              titulo="Ver desemenho dos alunos"
              paragrafo="Você deseja visualizar o desempenho dos seus alunos nas suas disciplinas?"
              nomeDoBotao="Visualizar"
              to="/desempenho"
            />
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
