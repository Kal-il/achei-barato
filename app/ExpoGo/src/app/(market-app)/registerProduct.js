
import { Link, useRouter } from "expo-router";
import {
    Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
} from "react-native";
import { View } from "react-native";
import ErrorMessage from "../../components/ErrorMessage";
import { useEffect, useState } from "react";
import { ApiClient } from "../../api/ApiClient";
import ImageInput from "../../components/ImageInput"

const { height, width } = Dimensions.get("window");

export default function RegisterProduct() {
  const [produtos, setProdutos] = useState([]);

  const [descricao, setDescricao] = useState("");
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [marca, setMarca] = useState("")
  const [imagem, setImagem] = useState("")

  const [erro, setErro] = useState("")
  const [erroPreco, setErroPreco] = useState("")

  const router = useRouter();
  const api = new ApiClient();

  const validarFormulario = () => {
    if (!descricao || !preco || !nome || !marca || !imagem) {
      setErro("Todos os campos devem ser preenchidos.")
      return false;
    }

    if (isNaN(preco)) {
      setErroPreco("O preço deve ser um número");
      return false;
    }

    setErro("");
    setErroPreco("");
    return true;
  };

  const imageToParent = (childData) => {
    setImagem(childData);
  }


  const handleRegister = async () => {
    console.log('chamando')
    if(validarFormulario()) {
      console.log('oi')
      data = {
        nome: nome,
        marca: marca,
        descricao: descricao,
        preco: parseFloat(preco),
      }

      data = await api.getParametrosRequisicao({imagem: imagem, formulario: data});

      try {
        await api.createProduto(data);
        router.replace("/products");
      } catch (e) {
        console.log(JSON.stringify(e.response.data));
        if (e.response) {
          setErro(e.response.data.detail);
        }
      }
    }
  };

  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Cadastre um novo produto</Text>
          <Text style={{...styles.subtitle, marginBottom: height * 0.01}}>
            Ele poderá ser cadastrado em promoções futuras.
          </Text>
          {erro && (
            <View style={{ marginTop: height * 0.01}}>
              <ErrorMessage mensagem={erro} maxWidth={"100%"} />
            </View>
          )}
        </View>

        <View style={styles.formContainer}>
          <View style={styles.formField}>
            <Text style={styles.label}>Insira o nome do produto:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                value={nome}
                onChangeText={(text) => setNome(text)}
              />
            </View>
          </View>
          <View style={styles.formField}>
            <Text style={styles.label}>Insira a marca do produto:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                value={marca}
                onChangeText={(text) => setMarca(text)}
              />
            </View>
          </View>
          <View style={styles.formField}>
            <Text style={styles.label}>Insira a descrição do produto:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                value={descricao}
                onChangeText={(text) => setDescricao(text)}
              />
            </View>
          </View>
          <View style={styles.formField}>
            <Text style={styles.label}>Insira o preço do produto:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                value={preco}
                onChangeText={(text) => setPreco(text)}
              />
            </View>
            {erroPreco && (
              <View>
                <Text
                  style={{
                    color: "#d83933",
                    fontWeight: 500,
                  }}
                >
                  {erroPreco}
                </Text>
              </View>
            )}
          </View>
          <View style={{marginTop: 10}}>
            <ImageInput ButtonText={"Insira uma imagem"} width="100%" borderRadius={12} imageToParent={imageToParent}/>
          </View>
          <View style={styles.buttonField}>
            <TouchableNativeFeedback onPress={handleRegister}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputText: {
    height: 50,
  },
  formContainer: {
    width: "90%",
    alignSelf: "center",
    gap: 10
  },
  formField: {
    gap: 8,
  },
  buttonField: {
    alignSelf: "flex-end",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: "8%",
    justifyContent: "center",
    padding: 20,
  },
  mainContainer: {
  },
  headerContainer: {
    marginTop: height * 0.05,
    paddingHorizontal: "5%",
  },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: {
    fontSize: 17,
    marginTop: 5,
    fontWeight: "bold",
    color: "#303030",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  helpText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#474747",
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#659BFF",
    paddingHorizontal: 25,
    borderRadius: 12,
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
