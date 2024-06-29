import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ApiClient } from "../api/ApiClient.js";
import { GoogleSignInScreen } from "../components/GoogleSignIn.js";
import { useRouter, Link, Redirect } from "expo-router"; // Importa o useRouter
import { useAuth } from "../contexts/ctx.js"; // Importe o hook useSession
import ErrorMessage from "../components/ErrorMessage.js";

const { height, width } = Dimensions.get("window");

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();
  const [erro, setErro] = useState("");

  const handleErrorResponse = (error) => {
    if (error.response) {
      setErro(error.response.data.detail);
    } else if (error.status == 401) {
      setErro("E-mail ou senha estão incorretos");
    } else {
      setErro(
        "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
      );
    }
  };

  const handleRedirect = async () => {
    router.replace("/auth/user-register/register-user-1");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setErro("Nenhum campo pode estar vazio.");
      return;
    }

    let errorResponse;
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      errorResponse = error;
      handleErrorResponse(error);
    } finally {
      setLoading(false);
    }

    if (!errorResponse) {
      router.replace("/");
    }
  };

  return (
    <LinearGradient
      colors={["#FF0F7B", "#F89B29"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/acheibarato.png")}
            style={styles.image}
          />
          <Text style={styles.logo}>
            <Text style={{ color: "white" }}>Achei</Text>{" "}
            <Text style={{ color: "#7F48CA" }}>Barato</Text>
          </Text>
        </View>

        {erro && <ErrorMessage mensagem={erro}></ErrorMessage>}

        <View style={{ marginBottom: "5%" }}>
          <View style={{ gap: 15 }}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Seu e-mail"
                placeholderTextColor="#7E48CC"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Sua senha"
                placeholderTextColor="#7E48CC"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          </View>
          <TouchableOpacity style={{ alignSelf: "flex-end" }}>
            <Text style={styles.loginText} marginTop="1%">
              Esqueceu sua Senha?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: "80%", gap: 10 }}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.loginText}>Fazer Login</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          <GoogleSignInScreen text={"Continuar com o Google"} />
        </View>

        <TouchableOpacity
          style={{ flexDirection: "row", marginTop: 10 }}
          onPress={handleRedirect}
        >
          <Text style={styles.text}>Não tem uma conta? </Text>
          <Text style={styles.redirectText}>Cadastre-se!</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: "15%",
  },
  image: {
    height: height * 0.25,
    aspectRatio: 1,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fff",
    marginBottom: 40,
  },
  inputView: {
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 24,
    height: height * 0.07,
    justifyContent: "center",
    padding: 20,
    elevation: 3,
  },
  inputText: {
    height: 50,
    color: "#7E48CC",
  },
  loginText: {
    color: "white",
    marginHorizontal: "3%",
    fontWeight: "bold",
  },
  redirectText: {
    color: "white",
    fontWeight: "bold",
  },
  text: { color: "white", fontWeight: "500" },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: "5%",
    elevation: 2,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: "3%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "white",
  },
  separator: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    width: width,
    alignSelf: "center",
    marginTop: "3%",
    marginBottom: "5%",
  },
});
