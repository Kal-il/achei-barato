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
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ApiClient } from "../api/ApiClient.js";
import { GoogleSignInScreen } from "../components/GoogleSignIn.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, Link } from 'expo-router'; // Importa o useRouter
import { useSession } from '../contexts/ctx.js'; // Importe o hook useSession

const { height, width } = Dimensions.get('window');

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useSession();
  const router = useRouter();

  const handleRedirect = async () => {
    router.replace("/register-user-1")
  }

  const handleLogin = async () => {
    console.log("handleLogin chamado"); // Log para depuração
    if (!username || !password) {
      Alert.alert("Erro", "Usuário ou senha inválidos");
      return;
    }

    setLoading(true);
    try {
      await signIn(username, password);
      console.log("funciona carai"); 
      router.replace("/");
    } catch (error) {
      console.error("deu merda:", error); // Log para depuração
      Alert.alert("otário: " + error.message);
    } finally {
      setLoading(false);
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
    <LinearGradient
      colors={['#A9C6FC', '#F67235']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Image source={require('../assets/logo.png')} style = {styles.image} />
        <Text style={styles.logo}>
          <Text style={{ color: "#FF5C00" }}>Achei</Text>
          {' '}
          <Text style={{ color: '#7F48CA' }}>Barato</Text>
        </Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Nome de Usuário"
            placeholderTextColor="#7E48CC"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Senha"
            placeholderTextColor="#7E48CC"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.loginText} marginTop='1%'>Esqueceu sua Senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.loginText}>Fazer Login</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.loginText}>Ou</Text>
          <View style={styles.line} />
        </View>

        <GoogleSignInScreen style={{ margin: 2 }} />

        <View style={styles.separator} />
        
        <TouchableOpacity onPress={handleRedirect}>
          <Text style={styles.loginText}>Não tem uma conta? Cadastre-se!</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

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
  image: {
    width: width * 0.5,
    height: height * 0.25,
    marginBottom: '5%',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fff",
    marginBottom: 40,
  },
  inputView: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 24,
    height: height * 0.07,
    marginBottom: '5%',
    justifyContent: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  inputText: {
    height: 50,
    color: '#7E48CC',
  },
  loginText: {
    color: "white",
    marginHorizontal: "3%",
    fontWeight: "bold", 
  },
  button: {
    width: '40%',
    height: 40,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: '5%',
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
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: '3%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "white",
  },
  separator: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    width: width,
    alignSelf: 'center',
    marginTop: '3%',
    marginBottom: '5%',
  },
});