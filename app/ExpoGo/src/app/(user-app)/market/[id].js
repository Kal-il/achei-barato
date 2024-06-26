import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatListComponent,
  FlatList,
} from "react-native";
import ImagesPicker from "../../../components/ImagesPicker.js";
import Button from "../../../components/Button.js";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { ApiClient } from "../../../api/ApiClient.js";
import PromotionCard from "../../../components/PromotionCard.js";
import { ScrollView } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Dashboard() {
  // imagens e nomes para fins de teste do design, podem ser apagados se preciso
  MarketBackgroundImage = require("../../../assets/apple.png");
  MarketProfileImage = require("../../../assets/supermercado.png");

  const [isFolowing, setIsFolowing] = useState(false);
  const [mercado, setMercado] = useState(null);
  const [promocoes, setPromocoes] = useState([]);
  const { id } = useLocalSearchParams();
  const api = new ApiClient();

  const renderPromocao = ({ item }) => {
    return (
      <PromotionCard
        MarketImageProfile={require("../../../assets/supermercado.png")}
        imageSource={require("../../../assets/apple.png")}
        MarketName={item.nome_mercado}
        OldPrice={item.preco}
        Price={item.preco_promocional}
        promotionId={item.id}
        PromotionName={item.nome}
        tag="Promoção"
        CommentsNumber={15}
        LikesNumber={15}
        MarketProfileLink="/"
      />
    );
  };

  useEffect(() => {
    const fetchMercadoData = async () => {
      let mercadoData, promocoesData;
      try {
        mercadoData = await api.getMercadoPorUUID(id);
        promocoesData = await api.getPromocoesMercado(id);
      } catch (e) {
        console.error(e);
      }

      setMercado(mercadoData);
      setPromocoes(promocoesData);
    };

    fetchMercadoData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} barStyle="light-content" />
      <ScrollView>
      <View style={styles.header}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../../../assets/apple.png")}
        ></ImageBackground>
        <View style={styles.ProfileImage}>
          <ImagesPicker
            imageSize={0.16}
            ImageHolder={MarketProfileImage}
            ImageBorderRadius={100}
          />
        </View>
      </View>

      {mercado && (
        <View style={styles.main}>
          <Text style={styles.title}>{mercado.nome_fantasia}</Text>
          <TouchableOpacity
            onPress={() => setIsFolowing(!isFolowing)}
            style={{ marginTop: "2%" }}
          >
            <Button
              title={isFolowing ? "Seguindo" : "Seguir"}
              ButtonColor={isFolowing ? "#7D49CB" : ""}
            />
          </TouchableOpacity>
          <View style={styles.line} />
          <Text style={styles.subtitle}>Promoções</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="search-outline" size={28} color={"grey"} />
            <TextInput
              style={styles.inputText}
              placeholder="Pesquisar"
              placeholderTextColor="grey"
            />
          </View>
          <ScrollView>
            <View style={{ alignSelf: "center" }}>
              <FlatList
                data={promocoes}
                renderItem={renderPromocao}
                keyExtractor={(item) => item.id}
              />
            </View>
          </ScrollView>
          <View style={styles.line} />
        </View>
      )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  main: {
    maxWidth: 960,
    marginHorizontal: "auto",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  header: {
    width: width,
    height: height / 3.5,
    alignItems: "center",
    overflow: "hidden",
  },
  backgroundImage: {
    width: width,
    height: height / 4.5,
    position: "absolute",
  },
  ProfileImage: {
    position: "absolute",
    top: height / 9,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: "white",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5A6BA9",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#CF5A7C",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "2%",
    marginBottom: 10,
    height: height * 0.05,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    paddingHorizontal: "4%",
  },
  inputText: {
    marginLeft: 10, // para dar um espaço entre o ícone e o texto
    color: "grey",
    flex: 1,
  },
  line: {
    width: width,
    height: 2,
    backgroundColor: "#C6C6C6",
    marginVertical: "4%",
  },
});
