import Card from '../components/Card';
import Layout from '../components/Layout';
import TituloPrincipal from '../components/TituloPrincipal';

const Home = () => {
  return (
    <Layout>
      <main className="p-4">
        <TituloPrincipal styles="text-center">Home</TituloPrincipal>
        <div className="md:grid grid-cols-2">
          <Card
            titulo="Disciplinas em Curso"
            paragrafo="Você deseja visualizar as disciplinas que você está cursando atualmente?"
            nomeDoBotao="Visualizar"
            to="/disciplinas-em-curso"
          />
          <Card
            titulo="Atualizar Cadastro"
            paragrafo="Você deseja atualizar seu cadastro?"
            nomeDoBotao="Atualizar"
            to="/atualizar-cadastro"
          />
          <Card
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
