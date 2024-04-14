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
import { deleteToken } from "./Auth";
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { ApiClient } from "./api/ApiClient";

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


	// Botão auxiliar para deletar tokens
	const handleDeleteTokens = () => {
		deleteToken("access-token");
		deleteToken("refresh-token");
		console.log("tokens apagados")
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

		<View style={flexDirection="row"}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Fazer Login</Text>
        </TouchableOpacity>
        <Button title="apagra" onPress={handleDeleteTokens}/>

        <Button title="teste" onPress={() => navigation.navigate('TesteScreen')}/>
		</View>

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
