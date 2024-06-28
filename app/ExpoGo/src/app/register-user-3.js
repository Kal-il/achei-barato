import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import { ApiClient } from "../api/ApiClient";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/ctx";

const { height, width } = Dimensions.get("window");

const CadastroScreen = () => {
  const router = useRouter();
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  console.log("oi");

  const { signIn } = useAuth();

  const handleCadastrar = async () => {
    if (senha === "" || confirmarSenha === "") {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    let nome, email, telefone, cep, estado, cidade, bairro, endereco;

    try {
      nome = await SecureStore.getItemAsync("nome");
      email = await SecureStore.getItemAsync("email");
      telefone = await SecureStore.getItemAsync("telefone");
      cep = await SecureStore.getItemAsync("cep");
      estado = await SecureStore.getItemAsync("estado");
      cidade = await SecureStore.getItemAsync("cidade");
      bairro = await SecureStore.getItemAsync("bairro");
      endereco = await SecureStore.getItemAsync("endereco");
    } catch (error) {
      console.error("Erro ao obter dados do SecureStore:", error);
      return;
    }

    const customer = {
      nome: nome,
      email: email,
      password: senha,
      cep: cep,
      estado: estado,
      cidade: cidade,
      bairro: bairro,
      endereco: endereco,
      complemento: "",
      numero_endereco: 1,
      telefone: parseInt(telefone),
    };

    const api = new ApiClient();

    try {
      console.log(customer);
      await api.createCostumer(customer);

      console.log("indo logar");
      await signIn(customer.email, customer.password);
      console.log("logado");
      router.replace("/");
      // Navegar para outra tela ou limpar os campos de entrada, se necessário
    } catch (error) {
      console.log(error);
      handleErrorResponse(error.response ? error.response.status : 500);
    }
  };

  const handleErrorResponse = (status) => {
    switch (status) {
      case 400:
        Alert.alert("Erro", "Erro nos dados inseridos no formulário.");
        break;
      case 403:
        Alert.alert(
          "Erro",
          "Você não tem permissão para acessar este recurso."
        );
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

  return (
    <LinearGradient colors={["#FF0F7B", "#F89B29"]} style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 85, height: 85, marginTop: "20%" }}
          />
          <Text style={styles.logo}>
            <Text style={{ color: "white" }}>Achei</Text>{" "}
            <Text style={{ color: "#7F48CA" }}>Barato</Text>
          </Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#303030" }}
            >
              Quase lá!
            </Text>
            <Text style={{ fontSize: 18, color: "#303030" }}>
              Insira a sua senha.
            </Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Senha"
              placeholderTextColor="#8D8D8D"
              secureTextEntry={true}
              value={senha}
              onChangeText={(text) => setSenha(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Confirmar Senha"
              placeholderTextColor="#8D8D8D"
              secureTextEntry={true}
              value={confirmarSenha}
              onChangeText={(text) => setConfirmarSenha(text)}
            />
          </View>

          <TouchableOpacity onPress={handleCadastrar}>
            <View style={styles.button}>
              <Text style={styles.loginText}>Cadastrar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 24,
    elevation: 2,
  },
  logoContainer: {
    alignItems: "center",
  },
  container: {
    height: "100%",
  },
  innerContainer: {
    width: "90%",
    alignSelf: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fff",
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#F2F2F2",
    borderRadius: 24,
    height: "6%",
    marginBottom: "5%",
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#303030",
  },
  button: {
    width: width * 0.4,
    height: height * 0.05,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "flex-end",
    elevation: 2,
  },
  socialBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginBottom: "1%",
    marginTop: "3%",
  },
  socialBtn: {
    width: "48%",
    borderRadius: 25,
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontWeight: "bold",
    color: "white",
  },
  socialText: {
    color: "white",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 1,
  },
  orContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 1,
    marginTop: -68,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "white",
  },
  orText: {
    color: "white",
    paddingHorizontal: 10,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  link: {
    color: "white",
    textDecorationLine: "underline",
  },
  textContainer: {
    marginTop: 1,
    paddingHorizontal: 2,
  },
});

export default CadastroScreen;
