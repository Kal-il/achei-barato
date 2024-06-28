import React, { useEffect, useState } from "react";
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
import * as SecureStore from "expo-secure-store";
import ErrorMessage from "../../../components/ErrorMessage";

const RegisterScreen = () => {
  const router = useRouter();

  const [cnpj, setCNPJ] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);

  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchMensagem = async () => {
      let mensagemData = SecureStore.getItem("mensagem");
      if (mensagemData) {
        setMensagem(mensagemData);
        await SecureStore.deleteItemAsync("mensagem")
      }
    };

    fetchMensagem();
  }, []);

  useEffect(() => {
    if (mensagem) {
      setTimeout(() => {
        setMensagem("");
      }, 5000);
    }
  }, [mensagem]);

  const handleContinue = () => {
    if (
      cnpj === "" ||
      nomeEmpresa === "" ||
      razaoSocial === "" ||
      telefone === ""
    ) {
      setErro("Todos os campos devem ser preenchidos.");
      return;
    }
    setLoading(true);
    try {
      SecureStore.setItem("cnpj", cnpj);
      SecureStore.setItem("nomeEmpresa", nomeEmpresa);
      SecureStore.setItem("razaoSocial", razaoSocial);
      SecureStore.setItem("telefone", telefone);

      // Sucesso no registro
      console.log("redirecionando");
      router.push("auth/store-register/RegisterScreen3");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#FF0F7B", "#F89B29"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Botão de voltar no canto superior esquerdo */}
      {/* Logo no canto superior direito */}
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
          Agora, faça o cadastro de sua
          <Text style={styles.highlightText}> empresa</Text>.
        </Text>

        {mensagem && (
          <ErrorMessage mensagem={mensagem} maxWidth={"100%"}></ErrorMessage>
        )}

        <TextInput
          style={styles.input}
          placeholder="Nome da sua empresa"
          keyboardType="default"
          autoCapitalize="none"
          value={nomeEmpresa}
          onChangeText={setNomeEmpresa}
        />
        <TextInput
          style={styles.input}
          placeholder="Razão Social"
          keyboardType="default"
          autoCapitalize="none"
          value={razaoSocial}
          onChangeText={setRazaoSocial}
        />
        <TextInput
          style={styles.input}
          placeholder="CNPJ"
          keyboardType="phone-pad"
          autoCapitalize="none"
          value={cnpj}
          onChangeText={setCNPJ}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          keyboardType="phone-pad"
          autoCapitalize="none"
          value={telefone}
          onChangeText={setTelefone}
        />
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
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
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#F67235",
  },
  input: {
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  button: {
    width: "60%",
    height: 40,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 20,
    alignSelf: "flex-end",
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
  goBackButton: {},
  goBackImage: {
    width: 25,
    height: 25,
  },
});

export default RegisterScreen;
