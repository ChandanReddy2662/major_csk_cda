// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedTokens = localStorage.getItem('authTokens');
  const storedUser = localStorage.getItem('user');

  const [authTokens, setAuthTokens] = useState(storedTokens ? JSON.parse(storedTokens) : null);
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  useEffect(() => {
    if (authTokens) {
      localStorage.setItem('authTokens', JSON.stringify(authTokens));
    } else {
      localStorage.removeItem('authTokens');
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [authTokens, user]);

  const login = (data) => {
    setAuthTokens(data.token);
    setUser(data.user);
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authTokens, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth, AuthContext };