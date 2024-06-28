import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router, useFocusEffect, useRouter } from "expo-router";
import GradientBackground from "../../../components/gradient";
import { useCallback, useEffect, useState } from "react";
import { Authenticator } from "../../../api/Authenticator";
import { ApiClient } from "../../../api/ApiClient";
import PromotionCard from "../../../components/PromotionCard";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function Liked() {
  const [produtos, setProdutos] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const renderProduto = ({ item }) => {
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
  };

  useFocusEffect(
    useCallback(() => {
      const fetchLikedProducts = async () => {
        const api = new ApiClient();

        let produtosData;
        try {
          produtosData = await api.getFavoritedPosts();
          setProdutos(produtosData);
          setMensagem("");
        } catch (e) {
          if (e.response) {
            if (e.response.status == 404) {
              setProdutos([]);
              setMensagem("Você ainda não curtiu nada.");
            }
          }
        }
      };

      fetchLikedProducts();
    }, [])
  );

  return (
    <View style={styles.container}>
      {produtos && (
        <FlatList
          ListHeaderComponent={
            <View>
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  height: StatusBar.currentHeight + 5,
                }}
              >
                <GradientBackground />
              </View>
              <StatusBar
                translucent={true}
                backgroundColor="transparent"
                barStyle="light-content"
              />
              <View style={styles.main}>
                <Text style={styles.title}>Itens Curtidos</Text>
                <View style={styles.line}>
                  <GradientBackground />
                </View>
              </View>
              {mensagem && (
                <View
                  style={{
                    fontSize: 20,
                    paddingHorizontal: "10%",
                    marginTop: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    name="error"
                    size={52}
                    color="#878787"
                  ></MaterialIcons>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: "center",
                      color: "#878787",
                    }}
                  >
                    {mensagem}
                  </Text>
                </View>
              )}
            </View>
          }
          data={produtos}
          renderItem={renderProduto}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    marginTop: "20%",
    gap: 8,
    marginBottom: 20,
  },
  line: {
    width: width * 0.95,
    height: height * 0.004,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#CF5A7C",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
