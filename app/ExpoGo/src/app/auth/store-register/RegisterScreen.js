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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Redirect, useRouter } from "expo-router";
import { ApiClient } from "../../../api/ApiClient.js";
import ErrorMessage from "../../../components/ErrorMessage.js";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleRegister = async () => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setErro("Todos os campos devem ser preenchidos.");
      return;
    }

    if (password !== confirmPassword) {
      setErro("As senhas não coincidem.");
      return;
    }

    const api = new ApiClient();

    const data = {
      nome: username,
      email: email,
      password: password,
      dono_mercado: true,
    };

    setLoading(true);
    try {
      const response = await api.createUser(data);
      router.push("auth/store-register/RegisterScreen2");
    } catch (error) {
      if (error.response) {
        console.log(JSON.stringify(error.response));
        // setErro(error.response.data.detail);
      } else {
        setErro("Ocorreu um erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    router.replace("/sign-in");
  };

  return (
    <LinearGradient
      colors={["#FF0F7B", "#F89B29"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
        <Image
          source={require("../../../assets/seta2.png")}
          style={styles.goBackImage}
        />
      </TouchableOpacity>
      <Image
        source={require("../../../assets/logo2.png")}
        style={styles.logo}
      />
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: "white",
          borderRadius: 24,
          padding: 20,
          marginTop: 50,
          elevation: 2,
        }}
      >
        <Text style={styles.title}>
          Primeiro, seu cadastro {"\n"}
          <Text style={styles.highlightText}>pessoal</Text>.
        </Text>
        <Text style={styles.subtitle}>
          Estes são os dados que serão usados para acessar o aplicativo.
        </Text>
        {erro && (
          <ErrorMessage mensagem={erro} maxWidth={"100%"}></ErrorMessage>
        )}
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirme a senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  highlightText: {
    color: "#7F48CA",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5A6BA9",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#F67235",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#303030",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#fff",
    elevation: 3,
  },
  button: {
    width: "70%",
    height: 40,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: 50,
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    position: "absolute",
    top: -40,
    right: -50,
    width: 200,
    height: 200,
  },
  goBackButton: {
    position: "absolute",
    top: 30,
    left: 10,
    padding: 10,
  },
  goBackImage: {
    width: 25,
    height: 25,
  },
});

export default RegisterScreen;
