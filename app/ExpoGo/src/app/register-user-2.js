import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ApiClient } from "../api/ApiClient";

const CadastroScreen = () => {
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const router = useRouter();

  const handleCadastrar = async () => {
    if (
      cep === "" ||
      estado === "" ||
      cidade === "" ||
      bairro === "" ||
      endereco === ""
    ) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }

    await SecureStore.setItemAsync("cep", cep);
    await SecureStore.setItemAsync("estado", estado);
    await SecureStore.setItemAsync("cidade", cidade);
    await SecureStore.setItemAsync("bairro", bairro);
    await SecureStore.setItemAsync("endereco", endereco);

    try {
      router.replace("/register-user-3");
    } catch (error) {
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
            style={{ width: 85, height: 85, marginTop: "10%" }}
          />
          <Text style={styles.logo}>
            <Text style={{ color: "white" }}>Achei </Text>
            <Text style={{ color: "#7F48CA" }}>Barato</Text>
          </Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={{ marginTop: 10, marginBottom: 30 }}>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#303030" }}
            >
              Insira seu endereço
            </Text>
            <Text style={{ fontSize: 18, color: "#303030" }}>
              Usamos esses dados para encontrar as promoções mais próximas de
              você.
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="CEP"
                placeholderTextColor={"#8D8D8D"}
                keyboardType="numeric"
                autoCapitalize="none"
                value={cep}
                onChangeText={setCep}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Estado"
                placeholderTextColor={"#8D8D8D"}
                keyboardType="default"
                autoCapitalize="none"
                value={estado}
                onChangeText={setEstado}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Cidade"
                placeholderTextColor={"#8D8D8D"}
                keyboardType="default"
                autoCapitalize="none"
                value={cidade}
                onChangeText={setCidade}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Bairro"
                placeholderTextColor={"#8D8D8D"}
                keyboardType="default"
                autoCapitalize="none"
                value={bairro}
                onChangeText={setBairro}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Endereco"
                placeholderTextColor={"#8D8D8D"}
                keyboardType="default"
                autoCapitalize="none"
                value={endereco}
                onChangeText={setEndereco}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={handleCadastrar}>
            <Text style={styles.loginText}>Continuar</Text>
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
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fff",
  },
  innerContainer: {
    width: "90%",
    alignSelf: "center",
  },
  inputView: {
    backgroundColor: "#F2F2F2",
    borderRadius: 16,
    height: "6%",
    marginBottom: "5%",
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#303030",
  },
  loginBtn: {
    width: "50%",
    backgroundColor: "#3672F6",
    borderRadius: 16,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2%",
    marginBottom: "2%",
    alignSelf: "flex-end",
  },
  loginText: {
    fontWeight: "bold",
    color: "white",
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
