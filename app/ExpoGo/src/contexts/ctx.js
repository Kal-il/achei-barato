import React, { useState } from "react";
import { useStorageState } from './useStorageState';
import { ApiClient } from "../api/ApiClient";
import { Alert } from "react-native";

const AuthContext = React.createContext({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  return React.useContext(AuthContext);
}

export function SessionProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [[isLoading, session], setSession] = useStorageState('session');

  const signIn = async (username, password) => {

    setLoading(true); // Inicia o carregamento

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const api = new ApiClient();
    try {
      await api.loginUser(formData);
      console.log("Usuário logado com sucesso!")
      const user = await api.getUserDetail();
      console.log(user);
      setSession(true); // Isso seria a resposta da API com a sessão do usuário
    } catch (error) {
      if (error.response.status == 404) {
        console.error("Erro ao logar usuário:", error.response.data.detail);
        Alert.alert("Erro", "Erro ao logar usuário: " + error.response.data.detail);
      }
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  const signOut = () => {
    setSession(false);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading: loading }}>
      {children}
    </AuthContext.Provider>
  );
}
