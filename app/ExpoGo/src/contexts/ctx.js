import React, { useState } from "react";
import { useStorageState } from './useStorageState';

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [[isLoading, session], setSession] = useStorageState('session');

  const signIn = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const api = new ApiClient();
    try {
      await api.loginUser(formData);
      setSession('John Doe');  // Isso seria a resposta da API com a sessão do usuário
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Erro ao logar usuário:", error.response.data.detail);
        Alert.alert("Erro", "Erro ao logar usuário: " + error.response.data.detail);
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
