import { React } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import FavoriteButton from "./favoriteButton.js";
const { height, width } = Dimensions.get("window");

const ButtonCard = ({ text, link, IconComponent, iconSize, iconName, onPress }) => {
  return (
    <Link href={link} asChild>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.nameIconContaier}>
              <IconComponent name={iconName} size={iconSize} />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{text}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    </Link>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  horizontalCardContent: {
    gap: 20,
  },
  horizontalNameIconContaier: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  nameIconContaier: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  card: {
    width: "93%",
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
});

export default ButtonCard;
