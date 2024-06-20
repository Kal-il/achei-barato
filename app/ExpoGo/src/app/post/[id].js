import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ApiClient } from "../../api/ApiClient";
import ImagesPicker from "../../components/ImagesPicker";
import FavoriteButton from "../../components/favoriteButton";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function PostDetail() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const api = new ApiClient();
    let postData, erro;
    try {
      postData = api.getPostData(id);
    } catch (e) {
      erro = e;
    }

    setPost(postData);
  }, []);

  return (
    <View style={{ paddingTop: 75 }}>
      <LinearGradient
        colors={["#FF0F7B", "#F89B29"]}
        start={{ x: 0.8, y: 0.8 }}
        end={{ x: 0, y: 0.2 }}
        style={{
          position: "absolute",
          width: "100%",
          height: "16%",
          // borderBottomLeftRadius: 18,
          // borderBottomRightRadius: 18,
          top: 0,
          zIndex: 0,
        }}
      ></LinearGradient>
      <View style={styles.mainPadding}>
        <View style={styles.postAuthor}>
          <Image
            style={styles.imageProfile}
            source={require("../../assets/profile.png")}
          />
          <View>
            <Text style={styles.textAuthor}>Kalil Garcia Canudo</Text>
            <Text style={styles.textDate}>12h04 • 20 de Junho de 2024</Text>
          </View>
        </View>
        <View style={styles.postInfo}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Promoção boa na casa do robson</Text>
            <Text style={styles.subtitle}>
              Encontrada promoção top na casa do robson preço barato demais ce
              ta doido
            </Text>
          </View>
          <View style={{ marginTop: 15, marginBottom: 15 }}>
            <Image
              style={styles.image}
              source={require("../../assets/apple.png")}
            ></Image>
            <View style={styles.postAction}>
              <Text style={{fontWeight: "bold"}}>Curtir</Text>
              <FavoriteButton/>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postAction: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 5
  },
  textDate: {
    fontSize: 12,
  },
  textAuthor: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    maxHeight: "50%",
    borderRadius: 12,
  },
  imageProfile: {
    height: "auto",
    width: 40,
    aspectRatio: 1,
  },
  postDate: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  postAuthor: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
    alignItems: "center",
    marginBottom: 36,
  },
  postInfo: {},
  infoContainer: {
    gap: 10,
  },
  header: {
    width: width,
    height: "60%",
    alignItems: "center",
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
  },
  backgroundImage: {
    width: width,
    height: height / 2.5,
    position: "absolute",
  },
  main: {
    backgroundColor: "white",
    height: "100%",
    paddingTop: 10,
  },
  mainPadding: {
    paddingHorizontal: 18,
  },
});
