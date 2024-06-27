import { Link, useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import Button from "../../../components/Button";
import ImageInput from "../../../components/ImageInput";
import ErrorMessage from "../../../components/ErrorMessage";
import { useState } from "react";
import { ApiClient } from "../../../api/ApiClient";
import * as SecureStore from "expo-secure-store";

export default function EditStoreLocation() {
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");

  const [erroNomeFantasia, setErroNomeFantasia] = useState("");
  const [erroRazaoSocial, setErroRazaoSocial] = useState("");
  const [erroTelefone, setErroTelefone] = useState("");
  const [erroDescricao, setErroDescricao] = useState("");
  const [erro, setErro] = useState("");

  const [imagem, setImagem] = useState(undefined);

  const router = useRouter();

  const imageToParent = (childData) => {
    setImagem(childData);
  };

  const handleUpdate = async () => {
    params = {
      nome_fantasia: nomeFantasia,
      razao_social: razaoSocial,
      telefone: telefone,
      descricao: descricao,
    };

    data = {};

    for (const [key, value] of Object.entries(params)) {
      if (value) {
        data[key] = value;
      }
    }

    const api = new ApiClient();
    const parametros = await api.getParametrosRequisicao({imagem: imagem, formulario: data})

    let erros;

    try {
      await api.updateMercado(parametros);
      router.replace("/market-profile");
    } catch (e) {
      // erros = e.response.data.detail;
      // handleErroAPI(erros);
    }
  };
  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}></View>

        {erro && (
          <View style={{ alignSelf: "center" }}>
            <ErrorMessage mensagem={erro} />
          </View>
        )}

        <View style={styles.formContainer}>
          <View style={styles.formField}>
            <Text style={styles.subtitle}>Nome fantasia:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Nome fantasia"
                onChangeText={(text) => setNomeFantasia(text)}
              />
            </View>
            {erroNomeFantasia && (
              <View>
                <Text
                  style={{ marginLeft: 15, color: "#d83933", fontWeight: 500 }}
                >
                  {erroNomeFantasia}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.formField}>
            <Text style={styles.subtitle}>Razão social:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Razão social"
                onChangeText={(text) => setRazaoSocial(text)}
              />
            </View>

            {erroRazaoSocial && (
              <View>
                <Text
                  style={{ marginLeft: 15, color: "#d83933", fontWeight: 500 }}
                >
                  {erroRazaoSocial}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.formField}>
            <Text style={styles.subtitle}>Telefone:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Telefone"
                keyboardType="numeric"
                onChangeText={(text) => setTelefone(parseInt(text))}
              />
            </View>

            {erroTelefone && (
              <View>
                <Text
                  style={{ marginLeft: 15, color: "#d83933", fontWeight: 500 }}
                >
                  {erroTelefone}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.formField}>
            <Text style={styles.subtitle}>Descrição:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Descrição"
                onChangeText={(text) => setDescricao(text)}
              />
            </View>

            {erroDescricao && (
              <View>
                <Text
                  style={{ marginLeft: 15, color: "#d83933", fontWeight: 500 }}
                >
                  {erroDescricao}
                </Text>
              </View>
            )}
          </View>
          <View styles={{ paddingTop: 40 }}>
            <ImageInput
              ButtonText={"Selecione a foto"}
              ButtonIcon={"camera-alt"}
              ButtonIconColor={"#303030"}
              imageToParent={imageToParent}
              width="100%"
              borderRadius={12}
            />
          </View>
          <View style={styles.buttonField}>
            <TouchableNativeFeedback onPress={handleUpdate}>
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
  },
  formField: {
    gap: 8,
    marginBottom: 10,
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
    elevation: 2,
  },
  mainContainer: {
    paddingTop: "5%",
  },
  headerContainer: {
    paddingHorizontal: "5%",
    marginBottom: 50,
  },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: "bold",
    color: "#303030",
  },
  inputTitle: {
    fontSize: 18,
    marginTop: 5,
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
