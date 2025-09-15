import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import NavigationSetter from './helpers/Setters';
import DisciplinasEmCurso from './pages/DisciplinasEmCurso';

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
