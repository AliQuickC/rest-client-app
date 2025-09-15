'use client';
import { Navigate } from 'react-router';
import { auth } from '../../config/firebase';

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!auth.currentUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
