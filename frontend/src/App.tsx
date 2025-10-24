import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import NavigationSetter from './helpers/Setters';
import DisciplinasEmCurso from './pages/DisciplinasEmCurso';
import AtualizarCadastro from './pages/AtualizarCadastro';
import { Bounce, ToastContainer } from 'react-toastify';
import Historico from './pages/Historico';
import Aulas from './pages/Aulas';
import Avaliacoes from './pages/Avaliacoes';
import DesempenhoDisciplina from './pages/DesempenhoDisciplina';
import Layout from './components/Layout';
import ListaUsuarios from './pages/ListaUsuarios';
import EditarUsuario from './pages/EditarUsuario';
import CriarUsuario from './pages/CriarUsuario';
import ListaDisciplinas from './pages/ListaDisciplinas';
import CriarDisciplina from './pages/CriarDisciplina';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavigationSetter />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/disciplinas-em-curso"
              element={
                <PrivateRoute roles={['aluno', 'administrador']}>
                  <DisciplinasEmCurso />
                </PrivateRoute>
              }
            />
            <Route
              path="/atualizar-cadastro"
              element={
                <PrivateRoute roles={['aluno', 'professor']}>
                  <AtualizarCadastro />
                </PrivateRoute>
              }
            />
            <Route
              path="/historico"
              element={
                <PrivateRoute roles={['aluno', 'administrador']}>
                  <Historico />
                </PrivateRoute>
              }
            />
            <Route
              path="/aulas"
              element={
                <PrivateRoute roles={['professor', 'administrador']}>
                  <Aulas />
                </PrivateRoute>
              }
            />
            <Route
              path="/avaliacoes"
              element={
                <PrivateRoute roles={['professor', 'administrador']}>
                  <Avaliacoes />
                </PrivateRoute>
              }
            />
            <Route
              path="/desempenho"
              element={
                <PrivateRoute roles={['professor', 'administrador']}>
                  <DesempenhoDisciplina />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/usuarios"
              element={
                <PrivateRoute roles={['administrador']}>
                  <ListaUsuarios />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/usuarios/:id/editar"
              element={
                <PrivateRoute roles={['administrador']}>
                  <EditarUsuario />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/usuarios/criar"
              element={
                <PrivateRoute roles={['administrador']}>
                  <CriarUsuario />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/disciplinas"
              element={
                <PrivateRoute roles={['administrador']}>
                  <ListaDisciplinas />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/disciplinas/criar"
              element={
                <PrivateRoute roles={['administrador']}>
                  <CriarDisciplina />
                </PrivateRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
