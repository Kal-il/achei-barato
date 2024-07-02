import React, { useState, useEffect } from "react";
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
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ApiClient } from "../../../api/ApiClient";
import ErrorMessage from "../../../components/ErrorMessage";

const LastRegisterScreen = () => {
  const router = useRouter();
  const [cnpj, setCNPJ] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const loadSecureStoreData = async () => {
      setCNPJ((await SecureStore.getItemAsync("cnpj")) || "");
      setNomeEmpresa((await SecureStore.getItemAsync("nomeEmpresa")) || "");
      setRazaoSocial((await SecureStore.getItemAsync("razaoSocial")) || "");
      setTelefone((await SecureStore.getItemAsync("telefone")) || "");
    };
    loadSecureStoreData();
  }, []);

  const handleRegister = async () => {
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

    const data = {
      cnpj,
      razao_social: razaoSocial,
      nome_fantasia: nomeEmpresa,
      telefone,
      cep,
      estado,
      cidade,
      bairro,
      endereco,
      numero_endereco: 1,
      complemento: "string",
      nome_responsavel: "string",
      cpf_responsavel: "09263613176",
      usuario: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        nome: "string",
        email: "user@example.com",
        dono_mercado: true,
        is_active: true,
        is_superuser: false,
        created_at: "2024-04-20T19:05:32.869Z",
        updated_at: "2024-04-20T19:05:32.869Z",
        deleted: false,
      },
    };

    const api = new ApiClient();

    setLoading(true);
    let houveErro;
    try {
      await api.createMercado(data);
      router.replace("/market-index");
    } catch (err) {
      if (err.response) {
        houveErro = err;
        if (err.response.status == 500) {
          setErro(
            "Ocorreu um erro interno no servidor. Tente novamente mais tarde."
          );
        } else if (err.response.status == 422) {
          setErro("Ocorreu um erro inesperado. Tente novamente mais tarde.");
        } else {
          setErro(err.response.data.detail);
        }
      } else {
        setErro("Ocorreu um erro inesperado. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
      if (!houveErro) {
        await SecureStore.deleteItemAsync("cnpj");
        await SecureStore.deleteItemAsync("nomeEmpresa");
        await SecureStore.deleteItemAsync("razaoSocial");
        await SecureStore.deleteItemAsync("telefone");
      }
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
      {/* <Link href="auth/store-register/RegisterScreen2">
        <TouchableOpacity style={styles.goBackButton}>
          <Image
            source={require("../../../assets/seta2.png")}
            style={styles.goBackImage}
          />
        </TouchableOpacity> */}
      {/* </Link> */}
      {/* Logo no canto superior direito */}
      <Image
        source={require("../../../assets/logo2.png")}
        style={styles.logo}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Quase lá! Preencha o {"\n"}
          <Text style={styles.highlightText}>endereço</Text>.
        </Text>

        {erro && (
          <ErrorMessage mensagem={erro} maxWidth={"100%"}></ErrorMessage>
        )}
        <TextInput
          style={styles.input}
          placeholder="CEP"
          keyboardType="default"
          autoCapitalize="none"
          value={cep}
          onChangeText={setCep}
        />
        <TextInput
          style={styles.input}
          placeholder="Estado"
          keyboardType="default"
          autoCapitalize="none"
          value={estado}
          onChangeText={setEstado}
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          keyboardType="default"
          autoCapitalize="none"
          value={cidade}
          onChangeText={setCidade}
        />
        <TextInput
          style={styles.input}
          placeholder="Bairro"
          keyboardType="default"
          autoCapitalize="none"
          value={bairro}
          onChangeText={setBairro}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereco"
          keyboardType="default"
          autoCapitalize="none"
          value={endereco}
          onChangeText={setEndereco}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 24,
    padding: 20,
    marginTop: 50,
    elevation: 2,
  },
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
    elevation: 3,
  },
  button: {
    width: "60%",
    alignSelf: "flex-end",
    height: 40,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
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

export default LastRegisterScreen;
