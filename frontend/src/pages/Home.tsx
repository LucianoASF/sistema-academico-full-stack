import CardHome from '../components/CardHome';
import Layout from '../components/Layout';
import TituloPrincipal from '../components/TituloPrincipal';

const Home = () => {
  return (
    <Layout>
      <main className="p-4">
        <TituloPrincipal styles="text-center">Home</TituloPrincipal>
        <div className="md:grid grid-cols-2">
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
        </div>
      </main>
    </Layout>
  );
};

export default Home;
