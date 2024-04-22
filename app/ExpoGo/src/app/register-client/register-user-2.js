import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import * as SecureStore from 'expo-secure-store'

const CadastroScreen = ({ navigation }) => {
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");

  const handleCadastrar = () => {
    // Lógica para cadastrar o usuário aqui
    if (
      cep === "" ||
      estado === "" ||
      cidade === "" ||
      bairro === "" ||
      endereco === ""
    ) {
      // Verifica se algum campo está vazio
      return;
    }

    SecureStore.setItem("cep", cep);
    SecureStore.setItem("estado", estado);
    SecureStore.setItem("cidade", cidade);
    SecureStore.setItem("bairro", bairro);
    SecureStore.setItem("endereco", endereco);
  };

  return (
    <LinearGradient colors={["#F67235", "#A9C6FC"]} style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Cep"
            keyboardType="TextInput"
            autoCapitalize="none"
            value={cep}
            onChangeText={setCep}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Estado"
            keyboardType="TextInput"
            autoCapitalize="none"
            value={estado}
            onChangeText={setEstado}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Cidade"
            keyboardType="TextInput"
            autoCapitalize="none"
            value={cidade}
            onChangeText={setCidade}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Bairro"
            keyboardType="TextInput"
            autoCapitalize="none"
            value={bairro}
            onChangeText={setBairro}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Endereco"
            keyboardType="TextInput"
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
