import { React } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
const { height, width } = Dimensions.get("window");

const MercadoCard = ({
  mercadoId,
  nomeFantasia,
  endereco,
  bairro,
  cidade,
  estado,
  logo,
}) => {
  return (
    <View style={postStyles.card}>
      <View style={postStyles.cardContent}>
        <Link
          href={{
            pathname: "/market/[id]",
            params: { id: mercadoId },
          }}
          asChild
        >
          <TouchableOpacity>
            {logo && <Image source={{ uri: logo }} style={postStyles.promotionImage} />}
            {!logo && <Image source={require("../assets/apple.png")} style={postStyles.promotionImage} />}
          </TouchableOpacity>
        </Link>
        <View style={postStyles.textContainer}>
          <View>
            <Text style={postStyles.textBold}>{nomeFantasia}</Text>
          </View>
          <View>
            <Text>{endereco}, {bairro}, {cidade}, {estado}</Text>
          </View>
          <View>
            <View style={postStyles.buttonContainer}>
                <TouchableOpacity>
                    <AntDesign name="right" size={24} style={postStyles.icons} />
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const postStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  card: {
    height: height * 0.15,
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
  cardContent: {
    flexDirection: "row",
    gap: 15,
  },
  textContainer: {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: "auto",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textBold: {
    fontWeight: "bold",
    fontSize: 20,
  },
  userName: {
    fontSize: 12,
  },
  price: {
    fontWeight: "bold",
    fontSize: 24,
    color: "green",
  },
  promotionImage: {
    aspectRatio: 1,
    height: "100%",
    borderRadius: 16,
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
});

export default MercadoCard;
