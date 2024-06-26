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

const ButtonCard = ({ text, IconComponent, iconSize, iconName}) => {
  return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.nameIconContaier}>
            <IconComponent name={iconName} size={iconSize} />
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {text}
            </Text>
          </View>
          <AntDesign name="arrowright" size={36}/>
        </View>
      </View>
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
    gap: 20 
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
})

export default ButtonCard;