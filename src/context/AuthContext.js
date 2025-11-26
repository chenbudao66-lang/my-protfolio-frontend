import React, { createContext, useState, useContext } from 'react';

// 创建认证上下文
const AuthContext = createContext();

// 创建自定义Hook以便在其他组件中使用
export function useAuth() {
  return useContext(AuthContext);
}

// 认证提供者组件
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // 登录函数
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
  };

  // 登出函数
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  // 检查是否已登录
  const isAuthenticated = () => {
    return !!token;
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}