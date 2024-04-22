import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from 'expo-secure-store'
import { ApiClient } from "../../api/ApiClient";

const CadastroScreen = ({ navigation }) => {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleCadastrar = async () => {
    // Lógica para cadastrar o usuário aqui
    if (
      senha === "" ||
      confirmarSenha === ""
    ) {
      return;
    }
    if (senha !== confirmarSenha) {
      return;
    }

    const nome = SecureStore.getItem("nome");
    const email = SecureStore.getItem("email");
    const telefone = SecureStore.getItem("telefone");
    const cep = SecureStore.getItem("cep");
    const estado = SecureStore.getItem("estado");
    const cidade = SecureStore.getItem("cidade");
    const bairro = SecureStore.getItem("bairro");
    const endereco = SecureStore.getItem("endereco");

    costumer = {
      nome: nome,
      email: email,
      password: senha,
      cep: cep,
      estado: estado,
      cidade: cidade,
      bairro: bairro,
      endereco: endereco,
      numero_endereco: 1,
      telefone: parseInt(telefone)
    }

    const api = new ApiClient();
    
    let erros;
    try {
      await api.createCostumer(costumer);
    } catch (err) {
      erros = err.response;
      console.log('erro', err)
    }

    if (erros) {
      console.error(erros);
    }
  };

  return (
    <LinearGradient colors={["#F67235", "#A9C6FC"]} style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require("../../assets/logo.png")}
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

        <TouchableOpacity style={styles.loginBtn} onPress={handleCadastrar}>
          <Text style={styles.loginText}>Cadastrar</Text>
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
  loginBtn: {
    width: "65%",
    backgroundColor: "#3672F6",
    borderRadius: 25,
    height: "6%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2%",
    marginBottom: "2%",
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
