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
import { Link } from "expo-router";
import { Feather, FontAwesome } from "@expo/vector-icons";
import PromotionCard from "../../../components/PromotionCard.js";
import GradientBackground from "../../../components/gradient.js";
import { Authenticator } from "../../../api/Authenticator.js";
import PostCard from "../../../components/PostCard.js";
import { ApiClient } from "../../../api/ApiClient.js";

const windowDimensions = Dimensions.get("window");
const windowWidth = windowDimensions.width;
const { height, width } = Dimensions.get("window");
const Height = "100%";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const api = new ApiClient();

  const [data, setData] = useState([
    {
      imageSource: require("../../../assets/apple.png"),
      MarketImageProfile: require("../../../assets/supermercado.png"),
      MarketName: "Supermercado Central",
      OldPrice: "R$ 15,99",
      Price: "R$ 10,49",
      PromotionLink: "/promotion",
      PromotionName: "Maçã",
      tag: "Promoção",
      CommentsNumber: "20",
      LikesNumber: 15,
      MarketProfileLink: "/store-profile",
      id: "1",
    },
  ]);

  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let posts, produtos, produtosErp, erro;

      try {
        posts = await api.getTodosPosts();
        posts.forEach((post) => {
          post.imagem = `data:image/jpg;base64,${post.imagem}`;
        });
      } catch (e) {
        erro = e;
      }

      try {
        let resultados = await api.getProdutosPromocao();
        if (resultados) {
          produtos = resultados.produtos
          produtosErp = resultados.produtos_erp
        }
      } catch (e) {
        erro = e;
      }

      if (posts) {
        const lista = [
          ...produtos.map((item) => ({ ...item, type: "promocao" })),
          ...produtosErp.map((item) => ({ ...item, type: "erp" })),
          ...posts.map((item) => ({ ...item, type: "post" })),
        ];
        setList(lista);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {}, [list]);

  const renderItem = ({ item }) => {
    if (item.type === "post") {

      console.log('post')
      return (
        <PostCard
          postId={item.id}
          imagem={item.imagem}
          titulo={item.titulo}
          preco={item.preco}
          autor={item.autor}
        />
      );
    }

    if (item.type === "promocao") {

      console.log('promocao')
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
          marketId={item.mercado_id}
          LikesNumber={15}
        />
      );
    }

    if (item.type === "erp") {
      console.log('erp')
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
          marketId={item.mercado_id}
          LikesNumber={15}
          isErp={true}
        />
      );
  };

    return null;
  }

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

            <View style={styles.notification}>
              <Link href={"/notification"}>
                <Feather
                  style={styles.bell}
                  name="bell"
                  size={24}
                  color="grey"
                />
              </Link>
            </View>
          </View>
        </GradientBackground>
      </View>

      {list && (
        <FlatList
          data={list}
          renderItem={renderItem}
          ListHeaderComponent={
            <ScrollView style={{ zIndex: 0 }}>
              <ScrollView
                style={[styles.Scrolpromocoes, { height: 180 }]}
                horizontal={true}
              >
                <Image
                  source={require("../../../assets/promodebatata.jpeg")}
                  style={{ width: windowWidth, height: Height, flex: 1 }}
                />
                <Image
                  source={require("../../../assets/promodebatata.jpeg")}
                  style={{ width: windowWidth, height: Height }}
                />
                <Image
                  source={require("../../../assets/acheibarato.png")}
                  style={{ width: windowWidth, height: Height }}
                />
              </ScrollView>

              <View style={styles.viewLocalizacao}>
                <Text style={styles.textLocalization}>Localização</Text>
              </View>

              {loading && (
                <View
                  style={{
                    marginTop: "40%",
                  }}
                >
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              )}
            </ScrollView>
          }
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
