import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ApiClient } from "../api/ApiClient.js";
import { GoogleSignInScreen } from "../components/GoogleSignIn.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'; // Importa o useRouter
import { useSession } from '../contexts/authContext'; // Importe o hook useSession

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useSession(); // Use o hook useSession

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Erro", "Usuário ou senha inválidos");
      return;
    }
  
    setLoading(true);
  
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
  
    const api = new ApiClient();
    try {
      // Chamada para login
      const response = await api.loginUser(formData);
  
      // Console.log para depuração
      console.log('stringo');
  
      // Verifica se a resposta está definida
      if (response) {
        // Verifica o status da resposta apenas se ela estiver definida
        if (response.status === 200) {
          const data = await response.json();
          await AsyncStorage.setItem("access-token", data["access"]);
          Alert.alert("Sucesso", "Login efetuado com sucesso");
        } else {
          handleErrorResponse(response.status);
        }
      } else {
        // Adiciona um log para depurar
        console.error("Resposta da API não definida");
        Alert.alert("Erro", "Resposta da API não definida");
      }
    } catch (error) {
      // Adicione um alerta ou tratamento de erro aqui, se necessário
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
        <Image source={require('../assets/logo.png')} />
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

        <Text style={styles.loginText}>Ou</Text>

        <GoogleSignInScreen style={{ margin: 2 }} />

        <TouchableOpacity>
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
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fff",
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 24,
    height: '8%',
    marginBottom: '5%',
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#7E48CC',
  },
  loginText: {
    color: "white",
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
});
