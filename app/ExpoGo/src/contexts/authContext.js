import React from 'react';
import { useStorageState } from './useStorageState';
import { ApiClient } from '../api/ApiClient.js';

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

    const api = new ApiClient();
    try {
      const response = await api.loginUser(formData);

      if (response.status === 200) {
        const data = await response.json();
        await setSession(data["access"]);
      } else {
        handleErrorResponse(response.status);
      }
    } catch (error) {
      Alert.alert("Erro", "Erro inesperado. Tente novamente mais tarde.");
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
