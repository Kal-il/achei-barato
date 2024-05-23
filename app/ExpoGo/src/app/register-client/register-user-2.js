import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { ApiClient } from "../../api/ApiClient";

const CadastroScreen = ({ navigation }) => {
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");

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

    const api = new ApiClient();

    const customerAddress = {
      cep: cep,
      estado: estado,
      cidade: cidade,
      bairro: bairro,
      endereco: endereco,
    };

    try {
      const response = await api.createCustomerAddress(customerAddress);

      if (response.status === 201) {
        Alert.alert("Sucesso", "Cadastro realizado com sucesso.");
        navigation.navigate("/register-client/register-user-3");
      } else {
        handleErrorResponse(response.status);
      }
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
            placeholder="Cep"
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
            keyboardType="default"
            autoCapitalize="none"
            value={endereco}
            onChangeText={setEndereco}
          />
        </View>

        <Link href={"/register-client/register-user-3"} asChild>
          <TouchableOpacity style={styles.loginBtn} onPress={handleCadastrar}>
            <Text style={styles.loginText}>Continuar</Text>
          </TouchableOpacity>
        </Link>

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
  loginText: {
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
