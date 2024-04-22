import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
	ActivityIndicator 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ApiClient } from "../api/ApiClient.js";
import { GoogleSignInScreen } from "./GoogleSignIn.js"

    
  

export default function Dashboard() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
  
      // Botão auxiliar para deletar tokens
      const handleDeleteTokens = () => {
          deleteToken("access-token");
          deleteToken("refresh-token");
      }
  
    const handleLogin = () => {
      // lógica para autenticar o usuário aqui
      if ((username == "") & (password == "")) {
        return;
      }
  
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
  
      api = new ApiClient();
      api.loginUser(formData);
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
        <GoogleSignInScreen/>
        <TouchableOpacity> 
          <Text style={styles.loginText} marginTop='1%'>Esqueceu sua Senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.loginText}>Fazer Login</Text>
        </TouchableOpacity>
    

        <TouchableOpacity> 
          <Text style={styles.loginText}>Não tem uma conta? Cadastre-se!</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const TesteScreen = ({navigation}) => {
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(true);

  const fetchUsername = async () => {

    const api = new ApiClient();
    api.getUserDetail("api/v1/usuario/usuario/eu")
    usuario = await api.getUserDetail("api/v1/usuario/usuario/eu")
    setUsername(usuario["nome"])
	setLoading(false);

  };

	useEffect(() => {
	  fetchUsername();
	}, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
		  <Button title="teste" onPress={() => navigation.navigate('HomeScreen')}/>
      </View>
    );
  }
  
  return(
    <LinearGradient colors={["#F67235", "#A9C6FC"]} style={styles.container}>
      <Text> {username} </Text>
      <Button title="teste" onPress={() => navigation.navigate('HomeScreen')}/>
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

