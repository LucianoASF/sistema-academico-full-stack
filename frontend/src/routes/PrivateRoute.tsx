import { Navigate } from 'react-router';
import { useAuthContext } from '../contexts/useAuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useAuthContext();
  if (loading) {
    return;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
