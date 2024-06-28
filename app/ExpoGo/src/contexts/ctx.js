import React, { useCallback, useEffect, useState } from "react";
import { ApiClient } from "../api/ApiClient.js";
import { Authenticator } from "../api/Authenticator";
import * as SecureStore from "expo-secure-store";

const AuthContext = React.createContext({
  signIn: async () => {},
  signOut: () => {},
  isMercado: false,
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
    [key]
  );

  return [state, setValue];
};

export function useAuth() {
  const value = React.useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }
  return value;
}

export function AuthProvider({ children }) {
  const [isMercado, setIsMercado] = useStorageState("is-mercado");

  const signIn = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const auth = new Authenticator();
    let token = auth.fetchAccessToken();

    const api = new ApiClient();
    try {
      await api.loginUser(formData);
      usuario = await api.getUserDetail();
      console.log(JSON.stringify(usuario));

      if (usuario) {
        if (usuario.dono_mercado) {
          setIsMercado("mercado");
        } else {
          setIsMercado("consumidor");
        }
      }
    } catch (error) {
      setIsMercado("deslogado");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const api2 = new ApiClient();
      await api2._authenticator.cleanUserState();
      setIsMercado("deslogado");
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
