import { Link, useRouter } from "expo-router";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import ErrorMessage from "../../../components/ErrorMessage";
import { useEffect, useState } from "react";
import { ApiClient } from "../../../api/ApiClient";
import * as SecureStore from "expo-secure-store";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateInput from "../../../components/DateInput";
import ProductOption from "../../../components/ProdutOption";

export default function RegisterSale() {
  const [produtos, setProdutos] = useState([]);

  const [descricao, setDescricao] = useState("");
  const [percentual, setPercentual] = useState(0);
  const [dataFinal, setDataFinal] = useState(new Date());
  const [dataInicial, setDataInicial] = useState(new Date());

  const [erro, setErro] = useState("");
  const [erroDescricao, setErroDescricao] = useState("");
  const [erroPercentual, setErroPercentual] = useState("");
  const [erroDataFinal, setErroDataFinal] = useState("");
  const [erroDataInicial, setErroDataInicial] = useState("");

  const router = useRouter();
  const api = new ApiClient();
  const idProdutos = [];

  const validarFormulario = () => {
    if (!descricao || !percentual || !dataFinal || !dataInicial) {
      setErro("Todos os campos devem ser preechidos");
      return;
    }

    if (percentual > 100 || percentual <= 0) {
      setErro("Insira um percentual de desconto válido");
    }

    return;
  };

  const handleErroAPI = (erros) => {};

  const handleRegister = async () => {
    validarFormulario();
  };

  const getDataFinal = (date) => {
    setDataFinal(date);
  };

  const getDataInicial = (date) => {
    setDataInicial(date);
  };

  useEffect(() => {
    console.log(idProdutos);
  }, [idProdutos]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        let produtosData = await api.getProdutosMercado();
        console.log("data: " + produtosData);
        setProdutos(produtosData);
      } catch (e) {
        console.error(e);
        if (e.response) {
          setErro(e.response.data.detail);
        }
      }
    };

    fetchProdutos();
  }, []);

  const appendProduct = (idProduto) => {
    idProdutos.push(idProduto);
    console.log(idProdutos);
    console.log("append");
  };

  const removeProduct = (idProduto) => {
    let index = idProdutos.indexOf(idProduto);
    idProdutos.splice(index, 1);
    console.log(idProdutos);
    console.log("remove");
  };

  const renderOpcao = ({ item }) => {
    return (
      <ProductOption
        id={item.id}
        nome={item.nome}
        marca={item.marca}
        preco={item.preco}
        appendProduct={appendProduct}
        removeProduct={removeProduct}
      />
    );
  };

  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Cadastre uma nova promoção</Text>
          {erro ? (
            <View style={{ alignSelf: "center" }}>
              <ErrorMessage mensagem={erro} maxWidth={"100%"} />
            </View>
          ) : (
            <Text style={styles.subtitle}>
              Sua oferta será imediatamente compartilhada com o público
            </Text>
          )}
        </View>

        <View style={styles.formContainer}>
          <View style={styles.formField}>
            <Text style={styles.label}>Descreva esta promoção:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                value={descricao}
                onChangeText={(text) => setDescricao(text)}
              />
            </View>
            {erroDescricao && (
              <View>
                <Text
                  style={{
                    marginLeft: 15,
                    color: "#d83933",
                    fontWeight: 500,
                  }}
                >
                  {erroDescricao}
                </Text>
              </View>
            )}

            <View style={styles.formField}>
              {erroPercentual && (
                <View>
                  <Text
                    style={{
                      marginLeft: 15,
                      color: "#d83933",
                      fontWeight: 500,
                    }}
                  >
                    {erroPercentual}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.formField}>
            <View>
              <Text style={styles.label}>Insira o percentual de desconto:</Text>
              <Text style={styles.helpText}>
                Será aplicado sobre o preço dos produtos selecionados.
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                keyboardType="numeric"
                value={percentual}
                onChangeText={(text) => setDescricao(text)}
              />
            </View>
            {erroPercentual && (
              <View>
                <Text
                  style={{
                    marginLeft: 15,
                    color: "#d83933",
                    fontWeight: 500,
                  }}
                >
                  {erroPercentual}
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <View style={{ gap: 8, width: "45%" }}>
              <Text style={styles.label}>Data de início:</Text>
              <DateInput getDate={getDataInicial} />
            </View>
            <View style={{ gap: 8, width: "45%" }}>
              <Text style={styles.label}>Data final:</Text>
              <DateInput getDate={getDataFinal} />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.label}>Selecione os Produtos:</Text>
            <FlatList
              style={{
                marginTop: 10,
                height: 200,
                backgroundColor: "#d1d1d1",
                borderRadius: 24,
              }}
              data={produtos}
              renderItem={renderOpcao}
            />
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
  },
  formField: {
    gap: 8,
  },
  buttonField: {
    marginTop: 20,
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
    paddingTop: "2%",
  },
  headerContainer: {
    marginTop: "15%",
    paddingHorizontal: "5%",
    marginBottom: 20,
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
