import { Link } from "expo-router";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FavoriteButton from "./favoriteButton";

const { height, width } = Dimensions.get("window");

const ProductCard = ({ preco, nome, marca, descricao }) => {
  const formatPrice = ({ price }) => {
    price = String(price);
    if (price.indexOf(".") == -1) {
      return "R$" + price + ",00";
    }
    return "R$" + price.replace(".", ",");
  };
  return (
    <View style={styles.Card}>
      <View style={styles.cardContent}>
        <TouchableOpacity>
          <Image
            source={require("../assets/apple.png")}
            style={styles.productImage}
          />
        </TouchableOpacity>
        <View>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>{nome}</Text>
            <Text style={{ fontSize: 18 }}>{marca}</Text>
          </View>

          <Text style={{ flexWrap: "wrap", maxWidth: "80%" }}>{descricao}</Text>
          <Text style={styles.price}>{formatPrice({ price: preco })}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  cardContent: {
    gap: 15,
    flexDirection: "row",
  },
  productImage: {
    aspectRatio: 1,
    height: height * 0.16,
    borderRadius: 16,
  },
  Card: {
    width: width * 0.93,
    borderColor: "#E9E9E9",
    borderWidth: 1,
    borderRadius: 16,
    padding: "4%",
    margin: "2%",
    backgroundColor: "#fff",
    elevation: 5,
    justifyContent: "space-between",
    alignSelf: "center",
  },
  UpperCard: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.75,
  },
  promotionImage: {
    aspectRatio: 1,
    width: width * 0.27,
    height: height * 0.14,
    borderRadius: 16,
  },
  marketProfile: {
    width: width * 0.12,
    height: height * 0.06,
    aspectRatio: 1,
    borderWidth: 1,
  },
  PromotionInfos: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginStart: "5%",
    flex: 1,
  },
  MarketInfos: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  PricesAndTag: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  promotionName: {
    fontSize: 18,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  Prices: {
    flexDirection: "column",
  },
  Tag: {
    backgroundColor: "orange",
    borderRadius: 16,
    alignContent: "center",
    alignItems: "center",
    padding: "2%",
    color: "white",
    fontWeight: "bold",
  },
  OldPrice: {
    color: "red",
    textDecorationLine: "line-through",
  },
  Price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  BottonCard: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 0.2,
    marginTop: "5%",
  },
  button: {
    height: height * 0.045,
    width: width * 0.24,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  LikeButton: {
    height: height * 0.045,
    borderColor: "#FF5F5F",
    width: width * 0.24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
  },
});

export default ProductCard;
