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
import axios from "axios";
import { fetchToken, setToken } from "./Auth";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // lógica para autenticar o usuário aqui
    if ((username == "") & (password == "")) {
      return;
    }

    axios
      .post("http://192.168.1.113:8000/api/v1/usuario/usuario/login", {
        email: username,
        password: password,
      })
      .then(function (response) {
        console.log(response.data.access_token, "response.data.access_token");
        if (response.data.access_token) {
          setToken(response.data.access_token);
          console.log("token jwt definido");
        }
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  return (
    <LinearGradient colors={["#F67235", "#A9C6FC"]} style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('./assets/logo.png')} />
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

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Fazer Login</Text>
        </TouchableOpacity>

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

  loginBtn: {
    width: '50%',
    backgroundColor: '#3672F6',
    borderRadius: 25,
    height: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    marginBottom: '10%',
  },
  loginText: {
    color: "white",
  },
});
