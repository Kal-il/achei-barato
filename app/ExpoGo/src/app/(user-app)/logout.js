import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../../contexts/ctx.js"; // Importe o hook useSession
import { Alert } from "react-native";
import { Button } from "react-native-elements";
import React, { useState } from "react";
import { ApiClient } from "../../api/ApiClient.js";

export default function logout() {
  const api = new ApiClient();

  const [loading, setLoading] = useState(false);
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      // await api.logoutUser();
      signOut();
      console.log("Usuário deslogado com sucesso!");
      router.replace("/sign-in");
    } catch (error) {
      console.error("Erro ao deslogar usuário:", error);
      Alert.alert(
        "Erro",
        "Erro ao deslogar usuário: " + error.response.data.detail
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Button onPress={handleLogout} title="LogOut">
          {loading && <ActivityIndicator size="small" color="red" />}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
