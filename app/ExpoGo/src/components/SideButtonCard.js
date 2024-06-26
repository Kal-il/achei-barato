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

const SideButtonCard = ({ text, IconComponent, iconSize, iconName}) => {
  return (
        <View style={styles.cardHorizontal}>
          <View style={styles.horizontalCardContent}>
            <View style={styles.horizontalNameIconContaier}>
              <IconComponent name={iconName} size={iconSize} />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {text}
              </Text>
            </View>
            <AntDesign
              style={{ alignSelf: "flex-end" }}
              name="arrowright"
              size={36}
            />
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
  horizontalCardContent: {
    gap: 20,
  },
  horizontalNameIconContaier: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardHorizontal: {
    flex: 1,
    height: "100%",
    borderColor: "#E9E9E9",
    borderWidth: 1,
    borderRadius: 16,
    padding: "4%",
    backgroundColor: "#fff",
    elevation: 5,
    justifyContent: "space-between",
    alignSelf: "center",
  },
})

export default SideButtonCard;