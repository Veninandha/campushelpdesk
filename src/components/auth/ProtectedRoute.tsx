import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  role: 'admin' | 'student';
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== role) {
    return <Navigate to={`/${user.role}`} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;