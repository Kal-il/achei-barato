import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
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
    [],
  );
  console.log("teste");
  const { id } = useLocalSearchParams();
  const [produto, setProduto] = useState(null);
  const [promocao, setPromocao] = useState(null);
  const [mercado, setMercado] = useState(null);

  const formatPrice = ({ price }) => {
    price = String(price);
    if (price.indexOf(".") == -1) {
      return "R$" + price + ".00";
    }
    return "R$" + price;
  };

  useEffect(() => {
    console.log(id);
    const fetchPromotionData = async () => {
      const api = new ApiClient();
      let produtoData;
      try {
        produtoData = await api.getProdutoPorUUID(id);
        setProduto(produtoData);

        mercadoData = await api.getMercadoPorUUID(produtoData.mercado_id);
        setMercado(mercadoData);

        console.log(JSON.stringify(produto));
        console.log(JSON.stringify(mercado));
      } catch (e) {
        console.log(e)
      }


    };

    fetchPromotionData();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/apple.png")}
          style={styles.PromotionImage}
        />
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
          {produto && 
          <View style={styles.container}>
            <View style={{justifyContent: "center", paddingHorizontal: "5%"}}>
              <Text style={styles.title}>{produto.nome}</Text>
              <View style={styles.PricesAndTag}>
                <View style={styles.Prices}>
                  <Text style={styles.OldPrice}>{formatPrice({price: produto.preco})}</Text>
                  <Text style={styles.Price}>{formatPrice({price: produto.preco_promocional})}</Text>
                </View>
                <Text style={styles.Tag}>{tag}</Text>
              </View>
              <View style={{margin: 15}}>
                <Text style={styles.text}>{produto.descricao}</Text>
              </View>
            </View>
            <View style={styles.location}>
              <Text style={styles.text}>Rotas para {produto.nome_mercado}</Text>
              <Link
                href={
                  "https://www.google.com/maps/place/UFT+-+Campus+Palmas/@-10.1784032,-48.3622366,17z/data=!3m1!4b1!4m6!3m5!1s0x9324cafd50dab483:0xf471612c2e3c89db!8m2!3d-10.1784085!4d-48.3596617!16s%2Fg%2F11b8_nrwwp?entry=ttu"
                }
                asChild
              >
                <TouchableOpacity>
                  <View style={styles.locationMap}>
                    <View>
                      {/* <MapView style={styles.map}/>*/}
                      <Image
                        source={require("../../../assets/maps.jpg")}
                        style={styles.map}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
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
          </View>}
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
  PricesAndTag: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  Prices: {
    flexDirection: "column",
    justifyContent: "center",
  },
  Tag: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    backgroundColor: "#F67439",
    borderRadius: 16,
    padding: "2%",
  },
  OldPrice: {
    fontSize: 24,
    color: "red",
    textDecorationLine: "line-through",
    marginBottom: -12,
  },
  Price: {
    fontSize: 38,
    color: "green",
    fontWeight: "bold",
  },
  title: {
    color: "#F57136",
    fontSize: 32,
    fontWeight: "bold",
    alignSelf: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#F67439",
  },
  text: {
    fontSize: 16,
    color: "#38434D",
    textAlign: "justify",
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
    backgroundColor: "red"
  }
});
