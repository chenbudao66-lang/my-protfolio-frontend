import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  // 如果用户未认证，重定向到登录页面
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // 如果用户已认证，渲染子组件
  return children;
}

export default ProtectedRoute;