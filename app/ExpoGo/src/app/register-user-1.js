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
  Dimensions
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons"; //Importação dos ícones do google e facebook
import { Link,  useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store'
import GoogleSignInScreen from "../components/GoogleSignIn";
import { ApiClient } from "../api/ApiClient";

const { height, width } = Dimensions.get('window');


const CadastroScreen = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      router.replace("/register-user-2");
    } catch (error) {
      console.log(error);
      handleErrorResponse(error);
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

  const formatarTelefone = (input) => {
    let formattedInput = input.replace(/\D/g, "");
    setTelefone(formattedInput);
  };

  return (
    <LinearGradient 
    colors={['#A9C6FC', '#F67235']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
      >
      <View style={styles.innerContainer}>
        <Image
          source={require("../assets/logo.png")}
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
        <ActivityIndicator size="large" color="#0000ff" animating={loading} />
          <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
            <Text style={styles.loginText}>Continuar</Text>
          </TouchableOpacity>     
		
          <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Ou</Text>
          <View style={styles.line} />
        </View>

        <GoogleSignInScreen/>

        <View style={styles.separator} />
        
        <View style={styles.textContainer}>
          <View style={styles.textContainer}>    

            <Link href={"/RegisterScreen"} asChild>
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
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 24,
    height: height * 0.065,
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
  button: {
    width: width * 0.4,
    height: height * 0.05,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
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
  orText: {
    color: "white",
    fontWeight: "bold",
    marginHorizontal: "5%",
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

export default CadastroScreen;
