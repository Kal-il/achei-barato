import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from 'expo-secure-store'
import { ApiClient } from "../api/ApiClient";
import {useRouter} from "expo-router";

const { height, width } = Dimensions.get('window');


const CadastroScreen = ({ navigation }) => {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleCadastrar = async () => {
    if (senha === "" || confirmarSenha === "") {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    const nome = await SecureStore.getItemAsync("nome");
    const email = await SecureStore.getItemAsync("email");
    const telefone = await SecureStore.getItemAsync("telefone");
    const cep = await SecureStore.getItemAsync("cep");
    const estado = await SecureStore.getItemAsync("estado");
    const cidade = await SecureStore.getItemAsync("cidade");
    const bairro = await SecureStore.getItemAsync("bairro");
    const endereco = await SecureStore.getItemAsync("endereco");
    const router = useRouter();

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
      telefone: parseInt(telefone)
    };

    const api = new ApiClient();
    
    try {
      console.log(customer);
      console.log("tentando cadastrar");
      const response = await api.createCostumer(customer);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso.");
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

  return (
    <LinearGradient colors={["#F67235", "#A9C6FC"]} style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={{ width: 85, height: 85, marginTop: "20%" }}
        />
        <Text style={styles.logo}>
          <Text style={{ color: "#FF5C00" }}>Achei</Text>{" "}
          <Text style={{ color: "#7F48CA" }}>Barato</Text>
        </Text>
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fff",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 24,
    height: "6%",
    marginBottom: "5%",
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#8D8D8D",
  },
  button: {
    width: width * 0.4,
    height: height * 0.05,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
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
