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

const PromotionCard = ({
  imagem,
  marketImagem,
  MarketName,
  marketId,
  PromotionName,
  OldPrice,
  Price,
  tag,
  LikesNumber,
  promotionId,
  pathname,
  isErp,
}) => {
  const formatPrice = ({ price }) => {
    price = String(price);
    if (price.indexOf(".") == -1) {
      return price + ",00";
    }
    return price.replace(".", ",");
  };
  console.log(marketImagem);
  return (
    <View style={styles.Card}>
      <View style={styles.UpperCard}>
        <Link
          href={{
            pathname: `/${pathname ? pathname : "promotion"}/[id]`,
            params: { id: promotionId, erp: isErp ? isErp : false },
          }}
          asChild
        >
          <TouchableOpacity>
            {imagem ? (
              <Image
                source={{ uri: `data:image/jpg;base64,${imagem}` }}
                style={styles.promotionImage}
              />
            ) : (
              <Image
                source={require("../assets/apple.png")}
                style={styles.promotionImage}
              />
            )}
          </TouchableOpacity>
        </Link>
        <View style={styles.PromotionInfos}>
          <View style={styles.MarketInfos}>
            <Link
              href={{
                pathname: "market/[id]",
                params: { id: marketId },
              }}
              asChild
            >
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Text>{MarketName}</Text>
                <Image
                  source={{ uri: `data:image/jpg;base64,${marketImagem}` }}
                  style={styles.marketProfile}
                />
              </TouchableOpacity>
            </Link>
          </View>
          <Text style={styles.promotionName}>{PromotionName}</Text>
          <View style={styles.PricesAndTag}>
            <View style={styles.Prices}>
              <Text style={styles.OldPrice}>
                {"R$" + formatPrice({ price: OldPrice })}
              </Text>
              <Text style={styles.Price}>
                {"R$" + formatPrice({ price: Price })}
              </Text>
            </View>
            <View>
              <Text style={styles.Tag}>{tag}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.BottonCard}>
        <Link
          href={{
            pathname: `/${pathname ? pathname : "promotion"}/[id]`,
            params: { id: promotionId },
          }}
          asChild
        >
          <TouchableOpacity>
            <View style={styles.button}>
              <MaterialIcons name="share" size={24} color="grey" />
            </View>
          </TouchableOpacity>
        </Link>

        <View style={styles.button}>
          <MaterialIcons name="expand-more" size={24} color="grey" />
          <Link
            href={{
              pathname: `/${pathname ? pathname : "promotion"}/[id]`,
              params: { id: promotionId },
            }}
            asChild
          >
            <TouchableOpacity>
              <Text>Ver mais</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.LikeButton}>
          <FavoriteButton postId={promotionId} />
          <Text style={{ color: "#FF5F5F" }}>{LikesNumber}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default PromotionCard;
