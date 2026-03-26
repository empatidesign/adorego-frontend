import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('admin_token');
  const role = localStorage.getItem('user_role');
  if (!token || role !== 'admin') {
    return <Navigate to="/admin" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
