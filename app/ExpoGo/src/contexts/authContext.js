import React, { createContext, useState, useEffect } from 'react';
import { Authenticator } from "../api/Authenticator.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = new Authenticator();

  useEffect(() => {
    if (auth.validateToken()) {
      // Se o token for válido, defina o usuário como autenticado
      setUser({});
    } else {
      // Se o token não for válido, defina o usuário como não autenticado
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login: (user) => setUser(user),
      logout: () => setUser(null),
    }}>
      {children}
    </AuthContext.Provider>
  );
};