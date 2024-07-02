import { Link, useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
} from "react-native";
import { View } from "react-native";
import ErrorMessage from "../../../components/ErrorMessage";
import { useState } from "react";
import { ApiClient } from "../../../api/ApiClient";

export default function EditStoreProfile() {
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");

  const [erroEndereco, setErroEndereco] = useState("");
  const [erroBairro, setErroBairro] = useState("");
  const [erroEstado, setErroEstado] = useState("");
  const [erroCidade, setErroCidade] = useState("");
  const [erroCep, setErroCep] = useState("");
  const [erroComplemento, setErroComplemento] = useState("");
  const [erro, setErro] = useState("");

  const router = useRouter();

  const handleUpdate = async () => {
    params = {
      endereco: endereco,
      bairro: bairro,
      estado: estado,
      cidade: cidade,
      cep: cep,
      complemento: complemento,
    };

    data = {};

    for (const [key, value] of Object.entries(params)) {
      if (value) {
        data[key] = value;
      }
    }

    const api = new ApiClient();
    const parametros = await api.getParametrosRequisicao({ formulario: data });

    let erros;

    try {
      await api.updateMercado(parametros);
      router.replace("/market-profile");
    } catch (e) {
      console.log(e);
      erros = e.response.data.detail;
      console.log(erros);
      handleErroAPI(erros);
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
            <Text style={styles.subtitle}>Endereço:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Endereço"
                onChangeText={(text) => setEndereco(text)}
              />
            </View>
            {erroEndereco && (
              <View>
                <Text
                  style={{ marginLeft: 15, color: "#d83933", fontWeight: 500 }}
                >
                  {erroEndereco}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.formField}>
            <Text style={styles.subtitle}>Bairro:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Bairro"
                onChangeText={(text) => setBairro(text)}
              />
            </View>
            {erroBairro && (
              <View>
                <Text
                  style={{ marginLeft: 15, color: "#d83933", fontWeight: 500 }}
                >
                  {erroBairro}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.formField}>
            <Text style={styles.subtitle}>Cidade:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Cidade"
                onChangeText={(text) => setCidade(text)}
              />
            </View>
            {erroCidade && (
              <View>
                <Text
                  style={{ marginLeft: 15, color: "#d83933", fontWeight: 500 }}
                >
                  {erroCidade}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.formField}>
            <Text style={styles.subtitle}>Estado:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Estado"
                onChangeText={(text) => setEstado(text)}
              />
            </View>
            {erroEstado && (
              <View>
                <Text
                  style={{ marginLeft: 15, color: "#d83933", fontWeight: 500 }}
                >
                  {erroEstado}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.formField}>
            <Text style={styles.subtitle}>CEP:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Cep"
                onChangeText={(text) => setCep(text)}
              />
            </View>
            {erroCep && (
              <View>
                <Text
                  style={{ marginLeft: 15, color: "#d83933", fontWeight: 500 }}
                >
                  {erroCep}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.formField}>
            <Text style={styles.subtitle}>Complemento:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Complemento"
                onChangeText={(text) => setComplemento(text)}
              />
            </View>
            {erroComplemento && (
              <View>
                <Text
                  style={{ marginLeft: 15, color: "#d83933", fontWeight: 500 }}
                >
                  {erroComplemento}
                </Text>
              </View>
            )}
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
    marginBottom: 5,
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
    marginTop: "10%",
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
