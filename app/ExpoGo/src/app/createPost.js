import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import ImageInput from "../components/ImageInput";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { ApiClient } from "../api/ApiClient";

const { width, height } = Dimensions.get("window"); //essa função retorna o tamanho da tela do dispositivo

export default function CriarPost() {
  const [titulo, setTitulo] = useState("");
  const [legenda, setLegenda] = useState("");
  const [preco, setPreco] = useState("");
  const [produto, setProduto] = useState("");
  const [imagem, setImagem] = useState(null);
  const api = new ApiClient();

  const [erroFormulario, setErroFormulario] = useState("");

  const _validarFormulario = () => {
    if (!titulo || !legenda) {
      setErroFormulario("Todos os campos devem estar preenchidos");
      return false;
    }

    if (!imagem) {
      setErroFormulario("Você deve selecionar uma imagem");
      return false;
    }

    return true;
  };

  const handleCriarPost = async () => {
    if (!_validarFormulario()) {
      return;
    }

    let erros;
    const parametros = await api.getParametrosRequisicao({
      imagem: imagem,
      formulario: { titulo: titulo, legenda: legenda, preco: preco, produto: produto },
    });

    try {
      await api.createPost(parametros);
    } catch (e) {
      erros = e.response.data.detail;
      console.error(erros);
    }
  };

  const imageToParent = (childData) => {
    setImagem(childData);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FF0F7B", "#F89B29"]}
        start={{ x: 0.8, y: 0.8 }}
        end={{ x: 0, y: 0.2 }}
        style={{
          position: "absolute",
          width: "100%",
          height: "50%",
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          top: 30,
          zIndex: 0,
        }}
      ></LinearGradient>

      <View style={styles.formContainer}>
        <View style={styles.titleAreaContainer}>
          <View style={styles.titleArea}>
            <Text style={styles.title}>Compartilhe uma {"\n"}promoção</Text>
          </View>
          {erroFormulario && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginBottom: 20,
                backgroundColor: "white",
                padding: 8,
                borderRadius: 8,
                backgroundColor: "#F9EEEE",
              }}
            >
              <MaterialIcons
                name="error"
                size={24}
                style={styles.icons}
                color={"#d83933"}
              />
              <Text>{erroFormulario}</Text>
            </View>
          )}
        </View>
        <View style={styles.formArea}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Insira o título do seu post"
              placeholderTextColor="#7E48CC"
              value={titulo}
              onChangeText={(text) => setTitulo(text)}
            />
          </View>
          <View style={styles.inputLongTextView}>
            <TextInput
              style={styles.inputLongText}
              placeholder="Insira a legenda do seu post"
              placeholderTextColor="#7E48CC"
              multiline={true}
              numberOfLines={6}
              value={legenda}
              onChangeText={(text) => setLegenda(text)}
            />
          </View>
          <View style={{justifyContent: "flex-start", width: "80%", marginBottom: 10}}>
            <Text>Informações opcionais:</Text>
          </View>
          <View style={{flexDirection: "row", gap: 20}}>
            <View style={styles.inputSmallView}>
              <TextInput 
              style={styles.inputText} 
              placeholder="Nome do produto"
              placeholderTextColor="#7E48CC"
              value={produto}
              onChangeText={(text) => setProduto(text)}
              />
            </View>
            <View style={styles.inputSmallView}>
              <TextInput 
              style={styles.inputText} 
              placeholder="Preço do produto"
              placeholderTextColor="#7E48CC"
              value={preco}
              onChangeText={(text) => setPreco(text)}
              />
            </View>
          </View>
          <View style={styles.imageInputView}>
            <ImageInput
              ButtonText={"Selecione a foto"}
              ButtonIcon={"camera-alt"}
              ButtonIconColor={"#7E48CC"}
              imageToParent={imageToParent}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={handleCriarPost}
            style={{ width: "95%", alignItems: "flex-end" }}
          >
            <View style={[styles.button, { backgroundColor: "#659BFF" }]}>
              <Text style={styles.text}>Postar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
  },
  header: {
    height: height / 4.5,
  },
  imageInputView: {},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F67235",
  },
  formArea: {
    width: "100%",
    alignItems: "center",
  },
  formContainer: {
    marginTop: 100,
  },
  titleAreaContainer: {
    width: "100%",
    alignItems: "center",
  },
  titleArea: {
    width: "90%",
    marginLeft: 10,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "700",
    color: "white",
  },
  inputView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 24,
    height: "8%",
    marginBottom: "5%",
    justifyContent: "center",
    padding: 20,
  },
  inputSmallView: {
    width: "40%",
    backgroundColor: "#fff",
    borderRadius: 24,
    height: "8%",
    marginBottom: "5%",
    justifyContent: "center",
    padding: 20,
  },
  inputLongTextView: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 24,
    marginBottom: "5%",
    padding: 20,
    justifyContent: "flex-start",
  },
  inputText: {
    height: 50,
  },
  inputLongText: {
    height: 200,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#659BFF",
    borderRadius: 24,
    width: width * 0.35,
    height: height * 0.06,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
