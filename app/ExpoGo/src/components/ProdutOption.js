import { Link } from "expo-router";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FavoriteButton from "./favoriteButton";
import { TouchableWithoutFeedback } from "react-native";

const { height, width } = Dimensions.get("window");

const ProductOption = ({
  id,
  preco,
  nome,
  marca,
  imagem,
  appendProduct,
  removeProduct,
}) => {
  const [selected, setSelected] = useState(false);
  const formatPrice = ({ price }) => {
    price = String(price);
    if (price.indexOf(".") == -1) {
      return "R$" + price + ",00";
    }
    return "R$" + price.replace(".", ",");
  };

  const selectProduct = () => {
    if (!selected) {
      setSelected(true);
      appendProduct(id);
    } else {
      setSelected(false);
      removeProduct(id);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={selectProduct}>
      <View
        style={{
          ...styles.Card,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={styles.cardContent}>
          <TouchableOpacity>
            <Image
              source={
                imagem
                  ? { uri: `data:image/jpg;base64,${imagem}` }
                  : require("../assets/apple.png")
              }
              style={styles.productImage}
            />
          </TouchableOpacity>
          <View
            style={{
              maxWidth: "90%",
              marginBottom: "5%",
              marginLeft: 10,
              alignItems: "baseline",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{nome}</Text>
            <Text style={{ fontSize: 16 }}>{marca}</Text>
            <Text style={styles.price}>{formatPrice({ price: preco })}</Text>
          </View>
        </View>
        {selected && (
          <View style={{alignSelf: "baseline"}}>
            <AntDesign name="checkcircle" color={"green"} size={24} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  selectedBorder: { borderWidth: 5, borderColor: "#5fbf36" },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  productImage: {
    aspectRatio: 1,
    height: height * 0.08,
    borderRadius: 14,
  },
  Card: {
    width: "90%",
    borderRadius: 14,
    paddingHorizontal: "3%",
    paddingVertical: "3%",
    margin: "2%",
    backgroundColor: "#fff",
    elevation: 3,
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

export default ProductOption;
