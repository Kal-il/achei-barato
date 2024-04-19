import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  FlatList, Center, NativeBaseProvider,
  Box,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { fetchToken, setToken, deleteToken } from "./Auth";
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {GoogleSignInScreen} from "./GoogleSignIn";


export default function App() {
  const Stack = createNativeStackNavigator()
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="TesteScreen" component={TesteScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const HomeScreen = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  
  deleteToken();
  
  const signOut = async () => {
    console.log('Deslogando usuário');
    try {
      await GoogleSignin.signOut();
      console.log('Usuário deslogado');
  
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogin = () => {
    // lógica para autenticar o usuário aqui
    if ((username == "") & (password == "")) {
      return;
    }


    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
  
    axios
      .post("http://192.168.105.20:8000/api/v1/usuario/usuario/login", formData)
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
        {/* <Image source={require('./assets/logo.png')} />
        <Text style={styles.logo}>
          <Text style={{ color: "#FF5C00" }}>Achei</Text>
          {' '}
          <Text style={{ color: '#7F48CA' }}>Barato</Text>
        </Text> */}
        {/* <View style={styles.inputView}>

          <TextInput
            style={styles.inputText}
            placeholder="Nome de Usuário"
            placeholderTextColor="#7E48CC"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View> */}
        {/* <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Senha"
            placeholderTextColor="#7E48CC"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View> */}
        
        {/* <TouchableOpacity> 
          <Text style={styles.loginText} marginTop='1%'>Esqueceu sua Senha?</Text>
        </TouchableOpacity> */}

        
        

        <GoogleSignInScreen />
        
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

const TesteScreen = ({navigation}) => {
  const jwtToken = fetchToken("jwt_token");
  const [username, setUsername] = useState("");

  const getUsername = async () => {
    console.log("chama api");
    await axios
    .get("http://192.168.105.20:8000/api/v1/usuario/usuario/eu", {
      headers: {'Authorization': 'Bearer ' + jwtToken, }
    })
    .then(function (response) {
      setUsername(response.data['nome']);
    }).catch(function (error) {
      console.log(error);
      console.log("não autenticado");
      setUsername("Você não está autenticado");
      // Trata erro (redireciona, exibe mensagem de erro, etc)
    });
  };

  getUsername();

  return(
    <LinearGradient colors={["#F67235", "#A9C6FC"]} style={styles.container}>
      {/* { username && (
        <FlatList
          data={username}
          renderItem={renderUsername}
        />
      )} */}
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
