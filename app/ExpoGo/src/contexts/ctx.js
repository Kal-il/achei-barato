import React from 'react';
import { useStorageState } from './useStorageState';
import { ApiClient } from '../api/ApiClient.js';
import { Authenticator } from '../api/Authenticator';

const AuthContext = React.createContext({
  signIn: async () => {},
  signOut: () => {},
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }
  return value;
}

export function SessionProvider(props) {
  const [[isLoading, session], setSession] = useStorageState('session');

  const signIn = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    console.log("Tentando obter token...");
    const auth = new Authenticator();
    let token = auth.fetchAccessToken();
  
    console.log("Token obtido:", token);
  
    const api = new ApiClient();
    try {
      console.log("Tentando logar usuário...");
      await api.loginUser(formData);
      setSession(token);
      console.log("Usuário logado com sucesso!");
    } catch (error) {
      // Adiciona um log para depurar
      if (error.response.status == 404) {
        console.error("Erro ao logar usuário:", error.response.data.detail);
        Alert.alert("Erro", "Erro ao logar usuário: " + error.response.data.detail);
      } else {
        console.error("Erro inesperado ao logar usuário:", error);
      }
    }
  };
  
  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
}

const handleErrorResponse = (status) => {
  switch (status) {
    case 400:
      Alert.alert("Erro", "Erro nos dados inseridos no formulário.");
      break;
    case 403:
      Alert.alert("Erro", "Você não tem permissão para acessar este recurso.");
      break;
    case 404:
      Alert.alert("Erro", "Dado não encontrado.");
      break;
    case 409:
      Alert.alert("Erro", "Esta ação já foi realizada.");
      break;
    case 500:
      Alert.alert("Erro", "Erro no servidor. Tente novamente mais tarde.");
      break;
    default:
      Alert.alert("Erro", "Erro inesperado. Tente novamente mais tarde.");
      break;
  }
};