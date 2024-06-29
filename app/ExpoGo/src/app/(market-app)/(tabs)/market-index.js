import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import {
  Feather,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import GradientBackground from "../../../components/gradient.js";
import { ApiClient } from "../../../api/ApiClient.js";
import ButtonCard from "../../../components/ButtonCard.js";
import SideButtonCard from "../../../components/SideButtonCard.js";

const windowDimensions = Dimensions.get("window");
const windowWidth = windowDimensions.width;
const { height, width } = Dimensions.get("window");
const Height = "100%";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const api = new ApiClient();

  useEffect(() => {
    const fetchUserData = async () => {
      let usuarioData;
      try {
        usuarioData = await api.getUserDetail();
        setUsuario(usuarioData);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUserData();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <GradientBackground>
          <View style={styles.innerHeader}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
              Achei Barato
            </Text>
          </View>
        </GradientBackground>
      </View>
      {!loading && (
        <View>
          <View
            style={{
              width: "93%",
              alignSelf: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            {usuario && (
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                Seja bem-vindo,{" "}
                <Text style={{ color: "#FF0F7B" }}>{usuario.nome}</Text>!
              </Text>
            )}
            <Text
              style={{
                fontSize: 18,
                marginTop: 5,
                fontWeight: "bold",
                color: "#303030",
              }}
            >
              Aqui, você encontra tudo sobre o seu mercado.
            </Text>
          </View>
          <View style={styles.horizontalCardContainer}>
            <SideButtonCard
              text={"Suas\nPromoções"}
              IconComponent={FontAwesome5}
              iconName="store"
              link="/sales"
              iconSize={36}
              hasArrow={true}
            />
            <SideButtonCard
              text={"Seus\nProdutos"}
              IconComponent={MaterialIcons}
              iconName="local-grocery-store"
              iconSize={42}
              link="/products"
              hasArrow={true}
            />
          </View>
          <ButtonCard
            text="Sistema ERP"
            IconComponent={MaterialIcons}
            iconSize={42}
            link="/erp"
            iconName="computer"
          />
        </View>
      )}
      {loading && (
        <View
          style={{
            height: "90%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  horizontalCardContainer: {
    flexDirection: "row",
    maxWidth: "93%",
    alignSelf: "center",
    gap: 10,
    marginBottom: 5,
  },
  container: {
    flex: 1,
  },
  floatingButton: {
    aspectRatio: 1,
    width: width * 0.15,
    borderRadius: 30,
    backgroundColor: "#ee6e73",
    position: "absolute",
    bottom: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: "11%",
  },
  innerHeader: {
    paddingTop: StatusBar.currentHeight + 5, // milagre do frontend
    alignItems: "flex-end",
    alignContent: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "2%",
  },
  inputView: {
    flex: 0.95, //isso faz com que a barra de pesquisa se expanda verticalmente por 95% da header
  },
  inputText: {
    height: height * 0.05,
    color: "grey",
    paddingLeft: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  notification: {
    height: height * 0.05,
    aspectRatio: 1, // Mantém a proporção
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100, //é um circulo
  },
  Scrolpromocoes: {
    flex: 1,
  },
  viewLocalizacao: {
    backgroundColor: "#F67439",
    paddingVertical: 5,
    alignItems: "center",
  },
  textLocalization: {
    color: "#fff",
    fontWeight: "bold",
  },
});
