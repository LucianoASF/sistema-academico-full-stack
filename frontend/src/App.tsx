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
import Aula from './pages/Aula';
import Avaliacoes from './pages/Avaliacoes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavigationSetter />
        <Routes>
          <Route path="/login" element={<Login />} />
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
              <PrivateRoute roles={['aluno']}>
                <DisciplinasEmCurso />
              </PrivateRoute>
            }
          />
          <Route
            path="/atualizar-cadastro"
            element={
              <PrivateRoute roles={['aluno']}>
                <AtualizarCadastro />
              </PrivateRoute>
            }
          />
          <Route
            path="/historico"
            element={
              <PrivateRoute roles={['aluno']}>
                <Historico />
              </PrivateRoute>
            }
          />
          <Route
            path="/aula"
            element={
              <PrivateRoute roles={['professor']}>
                <Aula />
              </PrivateRoute>
            }
          />
          <Route
            path="/avaliacoes"
            element={
              <PrivateRoute roles={['professor']}>
                <Avaliacoes />
              </PrivateRoute>
            }
          />
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
