import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ApiClient } from "../../../api/ApiClient";
import FavoriteButton from "../../../components/favoriteButton";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function PostDetail() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchPostData = async () => {
      const api = new ApiClient();
      let postData, erro;
      try {
        postData = await api.getPostData(id);
      } catch (e) {
        erro = e.response;
      }

      if (postData) {
        postData.imagem = `data:image/jpg;base64,${postData.imagem}`
        setPost(postData);
        setErro("");
      }

      if (erro) {
        setErro(erro.data.detail);
        setPost(null);
      }
    }

    fetchPostData();
  }, []);

  return (
    <ScrollView>
    <View style={{ paddingTop: 100 }}>
      {post &&
      <View style={styles.mainPadding}>
        <View style={styles.postInfo}>
          <View style={styles.infoContainer}>

            <View style={styles.postHeader}>
              <Text style={styles.title}>{post.titulo}</Text>

              <View style={styles.postAuthor}>
                <Image
                  style={styles.imageProfile}
                  source={require("../../../assets/profile.png")}
                />
                <View>
                  <Text style={styles.textAuthor}>{post.autor}</Text>
                  <Text style={styles.textDate}>12h04 • 20 de Junho de 2024</Text>
                </View>
              </View>
            </View>

            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <View style={styles.postTag}>
                <Text style={{fontWeight: "bold", fontSize: 20, paddingHorizontal: 10, paddingVertical: 2}}>Novidade!</Text>
              </View>
              <View>
                <Text style={{color: 'green', fontWeight: "bold", fontSize: 24}}>R${post.preco}</Text>
              </View>
            </View>

          </View>

          <View style={{ marginVertical: 15 }}>
            <Image style={styles.image}source={{uri: post.imagem}}></Image>
            <Text style={styles.subtitle}>
              {post.legenda}
            </Text>

            <View style={styles.postAction}>
              <View style={styles.iconAndText}>
                <TouchableOpacity>
                  <MaterialIcons name="share" size={32} color="grey" />
                </TouchableOpacity>

                <TouchableOpacity>
                  <MaterialIcons name="report" size={38} color="grey" />
                </TouchableOpacity>
              </View>

              <View style={styles.iconAndText}>
                <FavoriteButton tamanho={32}/>
                <Text style={{fontWeight: "bold", fontSize: 20}}>17</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
        } 
        {erro && 
          <View style={{height: height / 1.3, justifyContent: "center", alignItems: "center"}}>
            <MaterialIcons name="sentiment-dissatisfied" size={82} color="#636363"></MaterialIcons>
            <Text style={{fontSize: 36, textAlign: "center", color: "#636363"}}>{erro}.</Text>
          </View>
        }
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  postHeader: {
    gap: 10,
    marginBottom: 5,
  },
  postTag: {
    backgroundColor: "#ffea03", 
    borderRadius: 12, 
    alignItems: "center", 
    justifyContent: "center",
  },
  postAction: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textDate: {
    fontSize: 12,
    justifyContent: "flex-end",
  },
  iconAndText: {
    flexDirection: "row", 
    alignItems: "center", 
    gap: 8
  },
  textAuthor: {
    fontSize: 16,
  },
  image: {
    height: height/2.5,
    borderRadius: 12,
  },
  imageProfile: {
    height: "auto",
    width: 35,
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
    gap: 10,
    alignItems: "center",
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
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 18,
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
