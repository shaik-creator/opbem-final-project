import { Navigate, Outlet } from 'react-router-dom';
import LoadingState from '../common/LoadingState';
import { useAuth } from '../../services/authService';

export default function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-xl">
          <LoadingState rows={4} />
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children || <Outlet />;
}
