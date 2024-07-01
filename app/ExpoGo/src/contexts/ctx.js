import React, { useCallback, useEffect, useState } from "react";
import { ApiClient } from "../api/ApiClient.js";
import * as SecureStore from "expo-secure-store";

const AuthContext = React.createContext({
  signIn: async () => {},
  signOut: () => {},
  isMercado: false,
  isLoaded: false,
  user: null,
});

const useStorageState = (key) => {
  const [state, setState] = useState("");
  const [valor, setValor] = useState("");

  useEffect(() => {
    const fetchValor = () => {
      let value;
      value = SecureStore.getItem(key);
      if (value) {
        setValor(value);
      }
    };

    fetchValor();
  }, [key]);

  useEffect(() => {
    setState(valor);
  }, [valor]);

  const setValue = useCallback(
    (valor) => {
      if (valor) {
        setState(valor);
        SecureStore.setItem(key, valor);
      }
    },
    [key],
  );

  return [state, setValue];
};

export function useAuth() {
  const value = React.useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped in a <SessionProvider />");
  }
  return value;
}

export function AuthProvider({ children }) {
  const [isMercado, setIsMercado] = useStorageState("is-mercado");
  const [user, setUser] = useStorageState("user");

  const signIn = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const api = new ApiClient();
    try {
      await api.loginUser(formData);
      usuario = await api.getUserDetail();

      if (usuario) {
        setUser(user);
        if (usuario.dono_mercado) {
          setIsMercado("mercado");
        } else {
          setIsMercado("consumidor");
        }
      } else {
        console.log('aqui')
        setUser(null);
      }
    } catch (error) {
        console.log('rgefgefgdfg')
      setUser(null);
      setIsMercado("deslogado");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const api2 = new ApiClient();
      await api2._authenticator.cleanUserState();
      setIsMercado("deslogado");
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isMercado }}>
      {children}
    </AuthContext.Provider>
  );
}
