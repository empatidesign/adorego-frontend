import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('admin_token');
  const role = localStorage.getItem('user_role');

  if (!token || role !== 'admin') {
    if (token && role !== 'admin') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('user_role');
    }
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

