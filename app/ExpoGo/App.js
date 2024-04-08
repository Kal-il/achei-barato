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
        <Image source={require("./assets/logo.png")} />
        <Text style={styles.logo}>Faça seu Login</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Usuário"
            placeholderTextColor="#fff"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Senha"
            placeholderTextColor="#fff"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
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
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  loginBtn: {
    width: "60%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});
