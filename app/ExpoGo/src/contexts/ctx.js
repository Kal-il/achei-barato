import React from "react";
import { useStorageState } from "./useStorageState";
import { ApiClient } from "../api/ApiClient.js";
import { Authenticator } from "../api/Authenticator";
import { Alert } from "react-native";

const AuthContext = React.createContext({
  signIn: async () => {},
  signOut: () => {},
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }
  return value;
}

export function SessionProvider(props) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const signIn = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const auth = new Authenticator();
    let token = auth.fetchAccessToken();


    const api = new ApiClient();
    try {
      await api.loginUser(formData);
      setSession(token);
    } catch (error) {
      throw error
    }
  };

  const signOut = async () => {
    try {
      const api2 = new ApiClient();
      await api2.logoutUser();
      setSession(null);
    } catch (error) {
      throw error
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
}
