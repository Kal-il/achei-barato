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
import FavoriteButton from "./favoriteButton.js";
const { height, width } = Dimensions.get("window");

const PostCard = ({ postId, imagem, titulo, preco, autor }) => {
  return (
    <View style={postStyles.card}>
      <View style={postStyles.cardContent}>
        <View style={postStyles.textContainer}>
          <View>
            <Text style={postStyles.textBold}>{titulo}</Text>
            <Text style={postStyles.userName}>{autor}</Text>
          </View>
          <View>
            <View>
              <Text style={postStyles.price}>R${preco}</Text>
            </View>
            <View style={postStyles.buttonContainer}>
              <FavoriteButton />
              <Link
                href={{
                  pathname: "/post/[id]",
                  params: { id: postId },
                }}
              >
                <TouchableOpacity>
                  <AntDesign
                    name="arrowright"
                    size={24}
                    style={postStyles.icons}
                  />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
        <Link
          href={{
            pathname: "/post/[id]",
            params: { id: postId },
          }}
          asChild
        >
          <TouchableOpacity>
            <Image source={{uri: imagem}} style={postStyles.promotionImage} />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const postStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    height: height * 0.25,
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
    fontSize: 16,
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

export default PostCard;
