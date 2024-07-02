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
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import GoogleSignInScreen from "../../../components/GoogleSignIn";
import ErrorMessage from "../../../components/ErrorMessage";

const { height, width } = Dimensions.get("window");

const CadastroScreen = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleCadastrar = async () => {
    if (nome === "" || email === "" || telefone === "") {
      setErro("Todos os campos devem ser preenchidos.");
      return;
    }

    console.log("emial: " + email);

    SecureStore.setItem("nome", nome);
    SecureStore.setItem("email", email);
    SecureStore.setItem("telefone", telefone);

    setLoading(true);
    try {
      router.push("/auth/user-register/register-user-2");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatarTelefone = (input) => {
    let formattedInput = input.replace(/\D/g, "");
    setTelefone(formattedInput);
  };

  useEffect(() => {
    const fetchErro = async () => {
      let erroData = SecureStore.getItem("erro");
      if (erroData) {
        setErro(erroData);
        await SecureStore.deleteItemAsync("erro");
      }
    };

    const fetchPlaceholder = async () => {
      let nomeData = await SecureStore.getItemAsync("nome");
      let emailData = await SecureStore.getItemAsync("email");
      let telefoneData = await SecureStore.getItemAsync("telefone");

      if (nomeData && emailData && telefoneData) {
        setNome(nomeData);
        setEmail(emailData);
        setTelefone(telefoneData);
      }
    };

    fetchErro();
    fetchPlaceholder();
  }, []);

  return (
    <LinearGradient
      colors={["#FF0F7B", "#F89B29"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/acheibarato.png")}
            style={{ width: 85, height: 85, marginTop: "10%" }}
          />
          <Text style={styles.logo}>
            <Text style={{ color: "white" }}>Achei</Text>{" "}
            <Text style={{ color: "#7F48CA" }}>Barato</Text>
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.contentTitle}>Faça seu cadastro</Text>
            </View>

            {erro && (
              <ErrorMessage mensagem={erro} maxWidth={"100%"}></ErrorMessage>
            )}
            <View style={{ gap: 20 }}>
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
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                animating={loading}
              />
            )}
            <View style={{ marginTop: 30, marginBottom: 15, gap: 8 }}>
              <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
                <Text style={styles.loginText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>Ou</Text>
            <View style={styles.line} />
          </View>

          <View style={{ gap: 10 }}>
            <GoogleSignInScreen text={"Cadastrar com o Google"} />
            <Link href={"auth/store-register/RegisterScreen"} asChild>
              <TouchableOpacity style={styles.smallerButton}>
                <Text style={{ color: "#303030", fontWeight: "bold" }}>
                  Cadastre-se como{" "}
                </Text>
                <Text style={styles.redirectText}>empresa</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  contentTitle: { fontSize: 24, fontWeight: "bold", color: "#303030" },
  contentContainer: {
    gap: 10,
    marginTop: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 24,
    elevation: 2,
  },
  logoContainer: {
    alignItems: "center",
  },
  container: {
    height: "100%",
  },
  innerContainer: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fff",
  },
  inputView: {
    backgroundColor: "#F2F2F2",
    borderRadius: 16,
    height: "6%",
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#303030",
  },
  button: {
    width: "100%",
    height: height * 0.05,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    alignSelf: "center",
    elevation: 3,
  },
  smallerButton: {
    width: "100%",
    height: height * 0.05,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 24,
    alignSelf: "center",
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
  redirectText: {
    color: "#FF0F7B",
    fontWeight: "bold",
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
    color: "#303030",
    fontWeight: "bold",
    marginHorizontal: "5%",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  link: {
    color: "#FF0F7B",
    textDecorationLine: "underline",
    fontWeight: "bold",
    textAlign: "center",
  },
  textContainer: {
    marginTop: 1,
    flexDirection: "row",
    alignSelf: "center",
    paddingHorizontal: 2,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: "3%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#303030",
  },
  separator: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    width: width,
    alignSelf: "center",
    marginTop: "3%",
    marginBottom: "5%",
  },
});

export default CadastroScreen;
