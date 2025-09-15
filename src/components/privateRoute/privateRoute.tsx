'use client';
import { Navigate, useLocation } from 'react-router';
import { useAuthUser } from '../../util/checkLogin';

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const loginUser = useAuthUser();
  const location = useLocation();

  if (loginUser === undefined) {
    return <div>Загрузка...</div>;
  }

  if (loginUser === null) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
