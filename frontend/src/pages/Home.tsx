import CardHome from '../components/CardHome';
import Layout from '../components/Layout';
import TituloPrincipal from '../components/TituloPrincipal';
import { useAuthContext } from '../contexts/useAuthContext';

const Home = () => {
  const { user } = useAuthContext();

  return (
    <Layout>
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
                titulo="Lançar/Ver presenças"
                paragrafo="Você deseja visualizar o lançar presenças de suas aulas?"
                nomeDoBotao="Visualizar"
                to="/aulas"
              />
            </>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Home;
