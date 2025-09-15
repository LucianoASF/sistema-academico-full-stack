import { Navigate } from 'react-router';
import { useAuthContext } from '../contexts/useAuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const PrivateRoute = ({
  children,
  roles = ['aluno', 'professor', 'administrador'],
}: PrivateRouteProps) => {
  const { user, loading } = useAuthContext();
  if (loading) {
    return;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const temPermissao = user && roles.includes(user.role);

  if (!temPermissao) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
