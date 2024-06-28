import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
} from "react-native";
import { Link, useRouter } from "expo-router";
import ImagesPicker from "../../../components/ImagesPicker.js";
import ProfileScreenButton from "../../../components/ProfileSreenButton.js";
import { ApiClient } from "../../../api/ApiClient.js";
import { useEffect, useState } from "react";
import { Authenticator } from "../../../api/Authenticator.js";

const { width, height } = Dimensions.get("window");

export default function Perfil() {
  const [consumidor, setConsumidor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fotoPerfil, setFotoPerfil] = useState("");

  const fetchConsumidorData = async () => {
    const api = new ApiClient();

    let erros, consumidorData;
    try {
      consumidorData = await api.getConsumidorData();
    } catch (e) {
      erros = e;
    }

    if (consumidorData) {
      setLoading(false);
      setConsumidor(consumidorData);
      if (consumidorData) {
        foto = `data:image/jpg;base64,${consumidorData.foto}`;
        setFotoPerfil(foto);
      }
    }
  };

  useEffect(() => {
    fetchConsumidorData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.ProfileImage}>
          {fotoPerfil ? (
            <ImagesPicker
              imageSize={0.16}
              ImageHolder={{ uri: fotoPerfil }}
              ImageBorderRadius={100}
            ></ImagesPicker>
          ) : (
            <ImagesPicker
              imageSize={0.16}
              ImageHolder={require("../../../assets/profile.png")}
              ImageBorderRadius={100}
            ></ImagesPicker>
          )}
          {consumidor && <Text style={styles.title}>{consumidor.nome}</Text>}
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <ProfileScreenButton
          ButtonLink={"/edit-profile"}
          ButtonText={"Editar Perfil"}
          ButtonIcon={"edit"}
          ButtonIconColor={"#4a4a4a"}
        />
        <ProfileScreenButton
          ButtonLink={"/configuration"}
          ButtonText={"Configurações"}
          ButtonIcon={"settings"}
          ButtonIconColor={"#4a4a4a"}
        />
        <ProfileScreenButton
          ButtonLink={"/edit-location"}
          ButtonText={"Editar Localização"}
          ButtonIcon={"map"}
          ButtonIconColor={"#4a4a4a"}
        />
        <ProfileScreenButton
          ButtonLink={"/logout"}
          ButtonText={"Sair"}
          ButtonIcon={"logout"}
          ButtonIconColor={"#FF6565"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: height / 4.5,
  },
  ProfileImage: {
    ignoraSafeArea: true,
    alignItems: "center",
    marginBottom: "3%",
    backgroundColor: "#ABC6FD",
    height: height / 9,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F67235",
  },
});
