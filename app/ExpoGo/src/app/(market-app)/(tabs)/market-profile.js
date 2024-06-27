import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import ImagesPicker from "../../../components/ImagesPicker.js";
import ProfileScreenButton from "../../../components/ProfileSreenButton.js";
import { ApiClient } from "../../../api/ApiClient.js";
import { useEffect, useState } from "react";
import GradientBackground from "../../../components/gradient.js";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function Perfil() {
  const [loading, setLoading] = useState(true);
  const [mercado, setMercado] = useState(null);

  useEffect(() => {
    const fetchMercado = async () => {
      const api = new ApiClient();
      let mercadoData;

      try {
        mercadoData = await api.getMercadoUsuario();

        mercadoData.foto = `data:image/jpg;base64,${mercadoData.foto}`;
        setMercado(mercadoData);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchMercado();
  }, []);

  return (
    <View style={styles.container}>
      {mercado && (
        <View>
          <LinearGradient
            colors={["#FF0F7B", "#F89B29"]}
            start={{ x: 0.8, y: 0.8 }}
            end={{ x: 0, y: 0.2 }}
            style={{
              width: "120%",
              marginLeft: "-10%",
              elevation: 5,
              marginBottom: 35,
            }}
          >
            <View style={styles.header}>
              <View style={styles.ProfileImage}>
                <ImagesPicker
                  imageSize={0.16}
                  ImageHolder={{ uri: mercado.foto }}
                  ImageBorderRadius={100}
                ></ImagesPicker>
              </View>
              <View>
                <Text style={styles.title}>{mercado.nome_fantasia}</Text>
                <Text style={styles.subtitle}>{mercado.razao_social}</Text>
                <Text style={styles.subtitle}>
                  {mercado.cidade}, {mercado.estado}
                </Text>
              </View>
            </View>
          </LinearGradient>

          <View style={{ alignItems: "center" }}>
            <ProfileScreenButton
              ButtonLink={"/store/edit-profile"}
              ButtonText={"Editar Perfil"}
              ButtonIcon={"edit"}
              ButtonIconColor={"#8D8D8D"}
            />
            <ProfileScreenButton
              ButtonLink={"/store/edit-location"}
              ButtonText={"Editar Localização"}
              ButtonIcon={"map"}
              ButtonIconColor={"#8D8D8D"}
            />
            <ProfileScreenButton
              ButtonLink={"/configuration"}
              ButtonText={"Configurações"}
              ButtonIcon={"settings"}
              ButtonIconColor={"#8D8D8D"}
            />
            <ProfileScreenButton
              ButtonLink={"/store/logout"}
              ButtonText={"Sair"}
              ButtonIcon={"logout"}
              ButtonIconColor={"#FF6565"}
            />
          </View>
        </View>
      )}

      {loading && (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: "10%",
    marginVertical: 20,
  },
  ProfileImage: {},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
});
