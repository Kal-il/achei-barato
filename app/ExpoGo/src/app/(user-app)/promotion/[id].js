import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
import BotomSheet from "@gorhom/bottom-sheet";
import { Link, useLocalSearchParams } from "expo-router";
import CommentCard from "../../../components/CommentCard.js";
import MapView from "react-native-maps";
import { ApiClient } from "../../../api/ApiClient.js";

import { MaterialIcons } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");

export default function PromotionPage({
  imageSource,
  MarketImageProfile,
  MarketName,
  MarketProfileLink,
  PromotionName,
  OldPrice,
  Price,
  tag,
  PromotionLink,
  CommentsNumber,
  LikesNumber,
  description,
}) {
  imageSource = require("../../../assets/apple.png");
  MarketImageProfile = require("../../../assets/supermercado.png");
  MarketName = "Supermercado Central";
  OldPrice = "R$ 15,99";
  Price = "R$ 10,49";
  PromotionName = "Maçã";
  tag = "Promoção";
  CommentsNumber = "20";
  LikesNumber = 15;
  description =
    "A maçã é uma fruta muito saborosa e saudável, rica em fibras e vitaminas. Compre agora mesmo e aproveite o preço promocional!";
  MarketProfileLink = "/store-profile";

  const bottonSheetRef = React.useRef(null);
  const snapPoints = React.useMemo(
    () => [height / 2.2, height / 2.2, height],
    []
  );
  const { id, erp } = useLocalSearchParams();
  const [produto, setProduto] = useState(null);
  const [promocao, setPromocao] = useState(null);
  const [mercado, setMercado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  console.log("erp:" + typeof erp);
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const formatPrice = ({ price }) => {
    price = String(price);
    if (price.indexOf(".") == -1) {
      return "R$" + price + ",00";
    }
    return "R$" + price.replace(".", ",");
  };

  const api = new ApiClient();
  const formatDate = ({ date }) => {
    date = new Date(date);
    (dia = date.getDate().toString().padStart(2, "0")), (mes = date.getMonth()); //+1 pois no getMonth Janeiro começa com zero.
    return dia + " de " + meses[mes];
  };

  useEffect(() => {
    const fetchPromotionData = async () => {
      let produtoData, mercadoData, promocaoData;
      try {
        produtoData = await api.getProdutoPorUUID(id);

        mercadoData = await api.getMercadoPorUUID(produtoData.mercado_id);
        promocaoData = await api.getPromocaoPorUUID(produtoData.promocao_id);

        promocaoData.percentual_desconto =
          promocaoData.percentual_desconto * 100 + "%";

        promocaoData.data_inicial = formatDate({
          date: promocaoData.data_inicial,
        });
        promocaoData.data_final = formatDate({ date: promocaoData.data_final });

        setProduto(produtoData);
        setMercado(mercadoData);
        setPromocao(promocaoData);
        setLoading(false);
      } catch (e) {
        setErro("Ocorreu um erro ao carregar a promoção.");
        setLoading(false);
      }
    };

    const fetchPromotionErpData = async () => {
      let produtoData, mercadoData;
      try {
        produtoData = await api.getProdutoERP(id);
        mercadoData = await api.getMercadoPorUUID(produtoData.mercado_id);

        setProduto(produtoData);
        setMercado(mercadoData);
        setLoading(false);
      } catch (e) {
        setErro("Ocorreu um erro ao carregar a promoção.");
        setLoading(false);
      }
    };

    if (erp === "true") {
      fetchPromotionErpData();
    } else {
      fetchPromotionData();
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {loading && (
          <ImageBackground
            source={require("../../../assets/apple.png")}
            style={styles.PromotionImage}
          />
        )}
        {!loading && produto && (
          <ImageBackground
            source={
              produto.foto
                ? { uri: `data:image/jpg;base64,${produto.foto}` }
                : require("../../../assets/apple.png")
            }
            style={styles.PromotionImage}
          />
        )}
        <BotomSheet
          ref={bottonSheetRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: "#fff" }}
          android_keyboardInputMode="adjustResize"
          renderHandle={() => null}
          handleStyle={styles.handle}
          handleHeight={0}
        >
          {!loading && !erro && produto && (
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                {erp && (
                  <View>
                    <View style={{ width: "100%", marginTop: 15 }}>
                      <Text style={styles.title}>{produto.nome}</Text>
                      <Text style={styles.marca}>{produto.marca}</Text>
                    </View>

                    <View style={styles.PricesErp}>
                      <View style={styles.oldPriceContainer}>
                        <Text style={{ fontSize: 24 }}>De </Text>
                        <Text style={styles.OldPrice}>
                          {formatPrice({ price: produto.preco })}
                        </Text>
                      </View>
                      <View style={styles.priceContainer}>
                        <Text style={{ fontSize: 32 }}>Por </Text>
                        <Text style={styles.Price}>
                          {formatPrice({ price: produto.preco_promocional })}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                {!erp && (
                  <View style={styles.topInfoContainer}>
                    <View style={{ width: "50%" }}>
                      <Text style={styles.title}>{produto.nome}</Text>
                      <Text style={styles.marca}>{produto.marca}</Text>
                    </View>
                    <View style={styles.PricesAndTag}>
                      <View style={styles.Prices}>
                        <View style={styles.oldPriceContainer}>
                          <Text style={{ fontSize: 24 }}>De </Text>
                          <Text style={styles.OldPrice}>
                            {formatPrice({ price: produto.preco })}
                          </Text>
                        </View>
                        <View style={styles.priceContainer}>
                          <Text style={{ fontSize: 32 }}>Por </Text>
                          <Text style={styles.Price}>
                            {formatPrice({ price: produto.preco_promocional })}
                          </Text>
                        </View>
                        {promocao && (
                          <Text style={styles.Tag}>
                            {promocao.percentual_desconto} de desconto!
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                )}
                <View style={{ paddingVertical: 20, width: "93%", gap: 5 }}>
                  {produto.descricao && (
                    <View style={styles.descriptionRow}>
                      <MaterialIcons
                        name="info"
                        size={26}
                        style={{ marginTop: 3 }}
                        color="#f0a356"
                      ></MaterialIcons>
                      <Text style={styles.text}>{produto.descricao}</Text>
                    </View>
                  )}
                  {promocao && (
                    <View style={styles.dateRow}>
                      <MaterialIcons
                        name="calendar-month"
                        size={26}
                        color="#f0a356"
                      ></MaterialIcons>
                      <Text style={styles.text}>
                        Até o dia {promocao.data_final}
                      </Text>
                    </View>
                  )}
                </View>
                {mercado && (
                  <View style={styles.infoMercado}>
                    <View style={styles.dadosMercado}>
                      <Text style={{ ...styles.text, fontWeight: "bold" }}>
                        No mercado {produto.nome_mercado}
                      </Text>
                      <Text
                        style={{
                          ...styles.textMercado,
                          maxWidth: "90%",
                          textAlign: "right",
                        }}
                      >
                        {mercado.endereco}, {mercado.bairro}, {mercado.cidade},{" "}
                        {mercado.estado}
                      </Text>
                    </View>
                    <Link
                      href={{
                        pathname: "/market/[id]",
                        params: { id: mercado.id },
                      }}
                      asChild
                    >
                      <TouchableOpacity>
                        <Image
                          source={{ uri: `oi` }}
                          style={styles.perfilMercado}
                        />
                      </TouchableOpacity>
                    </Link>
                  </View>
                )}
              </View>
              <ScrollView style={styles.commentsArea}>
                <Text style={styles.commentsTitle}>Comentários</Text>
                <CommentCard
                  commentAuthor={"String dos Santos"}
                  commentDate={"05/05/24"}
                  commentText={
                    "As maçãs estavam ótimas, e pelo preço que paguei valeu muito a pena!"
                  }
                  commentAuthorImage={require("../../../assets/profile.png")}
                />
                <CommentCard
                  commentAuthor={"String dos Santos"}
                  commentDate={"05/05/24"}
                  commentText={
                    "As maçãs estavam ótimas, e pelo preço que paguei valeu muito a pena!"
                  }
                  commentAuthorImage={require("../../../assets/profile.png")}
                />
              </ScrollView>
            </View>
          )}
          {loading && (
            <View
              style={{
                marginTop: "40%",
              }}
            >
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          {erro && (
            <View
              style={{
                fontSize: 20,
                paddingHorizontal: "10%",
                marginTop: 80,
                gap: 10,
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
                style={{ fontSize: 20, textAlign: "center", color: "#878787" }}
              >
                {erro}
              </Text>
            </View>
          )}
        </BotomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  infoMercado: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 5,
    gap: 10,
  },
  perfilMercado: {
    width: width * 0.15,
    height: height * 0.07,
    aspectRatio: 1,
    borderWidth: 1,
  },
  dadosMercado: {
    alignItems: "flex-end",
  },
  descriptionRow: {
    flexDirection: "row",
    gap: 8,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleContainer: {
    justifyContent: "center",
    paddingHorizontal: "5%",
    maxWidth: "100%",
  },
  marca: {
    flexWrap: "wrap",
    fontSize: 18,
    fontWeight: "bold",
  },
  oldPriceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: -12,
  },
  topInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceContainer: { flexDirection: "row", alignItems: "baseline" },
  PricesAndTag: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
  },
  Prices: {
    flexDirection: "column",
  },
  PricesErp: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  Tag: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    backgroundColor: "#F67439",
    borderRadius: 8,
    textAlign: "center",
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  OldPrice: {
    fontSize: 24,
    color: "red",
    textDecorationLine: "line-through",
  },
  Price: {
    fontSize: 32,
    color: "green",
    fontWeight: "bold",
  },
  title: {
    color: "#F57136",
    fontSize: 32,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 20,
    color: "#38434D",
    flexWrap: "wrap",
  },
  textMercado: {
    fontSize: 18,
    color: "#38434D",
    flexWrap: "wrap",
  },
  commentsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#74A4FF",
    margin: "5%",
    alignSelf: "center",
  },
  location: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },
  locationMap: {
    borderRadius: 16,
    overflow: "hidden",
  },
  map: {
    width: width * 0.9,
    height: height / 5,
  },
  handle: {
    backgroundColor: "#F67439",
    color: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  PromotionImage: {
    width: width,
    height: height / 1.5,
    resizeMode: "cover",
  },
  description: {
    width: "90%",
    justifyContent: "center",
    backgroundColor: "red",
  },
});
