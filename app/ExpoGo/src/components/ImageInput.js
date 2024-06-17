import {
  TouchableOpacity,
  Animated,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  Button,
  Image,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

export default function ProfileScreenButton({
  ButtonText,
  ButtonIcon,
  ButtonIconColor,
}) {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableNativeFeedback onPress={pickImage} style={{ borderRadius: 12 }}>
      <View style={styles.Button}>
        {!image && (
          <MaterialIcons
            name="camera-alt"
            size={32}
            style={styles.icons}
            color={ButtonIconColor}
          />
        )}
        {image && (
          <Image
            source={{ uri: image }}
            style={{ height: 100, aspectRatio: 1, borderRadius: 4 }}
          />
        )}
        <Text style={{ color: ButtonIconColor }}>{ButtonText}</Text>
        <AntDesign
          name="arrowright"
          size={24}
          style={styles.icons}
          color={ButtonIconColor}
        />
      </View>
    </TouchableNativeFeedback>
  );
}
const styles = StyleSheet.create({
  Button: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: "5%",
    paddingHorizontal: "5%",
    borderRadius: 24,
    shadowColor: "#B3B3B3", // Suaviza a cor da sombra
    elevation: 5,
  },
});
