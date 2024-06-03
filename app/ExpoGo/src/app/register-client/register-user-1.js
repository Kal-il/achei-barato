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
import { FontAwesome } from "@expo/vector-icons"; //Importação dos ícones do google e facebook
import { Link } from "expo-router";
import * as SecureStore from 'expo-secure-store'
import GoogleSignInScreen from "../../components/GoogleSignIn";
import { ApiClient } from "../../api/ApiClient";

const CadastroScreen = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleCadastrar = async () => {
    if (nome === "" || email === "" || telefone === "") {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }

    await SecureStore.setItemAsync("nome", nome);
    await SecureStore.setItemAsync("email", email);
    await SecureStore.setItemAsync("telefone", telefone);

    const api = new ApiClient();

    const customer = {
      nome: nome,
      email: email,
      telefone: telefone,
    };

    try {
      const response = await api.createCustomer(customer);

      if (response.status === 201) {
        Alert.alert("Sucesso", "Cadastro realizado com sucesso.");
        navigation.navigate("/register-client/register-user-2");
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

  const formatarTelefone = (input) => {
    let formattedInput = input.replace(/\D/g, "");
    setTelefone(formattedInput);
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
            placeholder="Seu nome"
            placeholderTextColor="#8D8D8D"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Seu email"
            placeholderTextColor="#8D8D8D"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Telefone"
            placeholderTextColor="#8D8D8D"
            value={telefone}
            onChangeText={formatarTelefone}
            keyboardType="phone-pad" // Define o teclado para números
          />
        </View>


        <Link href={"/register-user-2"} asChild>
          <TouchableOpacity style={styles.loginBtn} onPress={handleCadastrar}>
            <Text style={styles.loginText}>Continuar</Text>
          </TouchableOpacity>
        </Link>

		<View style={styles.socialBtnContainer}>
		<GoogleSignInScreen/>
		</View>

        <View style={styles.orContainer}>
          <View style={styles.line}></View>
          <Text style={styles.orText}>ou</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.textContainer}>
        <View style={styles.textContainer}>    
            <Link href={"../(market-app)/RegisterScreen"} asChild>
              <TouchableOpacity>
                <Text style={styles.link}>
                É uma empresa? Cadastre-se aqui!
                </Text>
              </TouchableOpacity>
            </Link>
        </View>
      </View>
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
    fontWeight: "bold",
  },
  textContainer: {
    marginTop: 1,
    paddingHorizontal: 2,
  },
});

export default CadastroScreen;
