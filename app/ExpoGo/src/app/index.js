import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Link, useRootNavigationState, useRouter } from "expo-router";
import { Feather, FontAwesome } from "@expo/vector-icons";
import PromotionCard from "../components/PromotionCard.js";
import GradientBackground from "../components/gradient.js";
import PostCard from "../components/PostCard.js";
import { ApiClient } from "../api/ApiClient.js";
import { useAuth } from "../contexts/ctx.js";
import { LinearGradient } from "expo-linear-gradient";

const windowDimensions = Dimensions.get("window");
const windowWidth = windowDimensions.width;
const { height, width } = Dimensions.get("window");
const Height = "100%";

export default function Dashboard() {
  console.log("09");
  const [repeat, setRepeat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setRepeat(!repeat);
    }, 2000);
  });
  // const {erro, setErro} = useState("");

  // Se o usuário não estiver autenticado, redirecione-o para a página de login
  const { isMercado, user } = useAuth();
  console.log("oi");
  useEffect(() => {
    console.log("oi 2");
    if (user === undefined) {
      if (isMercado == "mercado") {
        console.log("é mercado");
        router.push("/market-index");
      }

      if (isMercado == "deslogado") {
        console.log("deslogado");
        router.push("/sign-in");
      }

      if (isMercado == "consumidor") {
        console.log("consumidor");
        router.push("/home");
      }

      if (isMercado == "") {
        try {
          console.log("oi 3");
          console.log("valor de ismercado: " + isMercado);
          router.push("/sign-in");
        } catch (e) {
          console.log(e);
        }
      }
    } 
  }, [repeat]);

  return (
    <LinearGradient
      colors={["#FF0F7B", "#F89B29"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: "15%",
  },
  image: {
    height: height * 0.25,
    aspectRatio: 1,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fff",
    marginBottom: 40,
  },
  inputView: {
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 24,
    height: height * 0.07,
    justifyContent: "center",
    padding: 20,
    elevation: 3,
  },
  inputText: {
    height: 50,
    color: "#7E48CC",
  },
  loginText: {
    color: "white",
    marginHorizontal: "3%",
    fontWeight: "bold",
  },
  redirectText: {
    color: "white",
    fontWeight: "bold",
  },
  text: { color: "white", fontWeight: "500" },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: "5%",
    elevation: 2,
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
    backgroundColor: "white",
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
