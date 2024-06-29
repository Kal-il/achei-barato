import { Link, useRouter } from "expo-router";
import {
    Dimensions,
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

const { height, width } = Dimensions.get("window");

export default function RegisterSale() {
  const [produtos, setProdutos] = useState([]);

  const [descricao, setDescricao] = useState("");
  const [percentual, setPercentual] = useState(0);
  const [dataFinal, setDataFinal] = useState(new Date());
  const [dataInicial, setDataInicial] = useState(new Date());
  const [listaIds, setListaIds] = useState([]);

  const [erro, setErro] = useState("");
  const [erroDescricao, setErroDescricao] = useState("");
  const [erroPercentual, setErroPercentual] = useState("");
  const [erroDataFinal, setErroDataFinal] = useState("");
  const [erroDataInicial, setErroDataInicial] = useState("");
  const [erroProdutos, setErroProdutos] = useState("");
  const [valido, setValido] = useState(true);

  const router = useRouter();
  const api = new ApiClient();
  const idProdutos = [];

  const validarFormulario = () => {
    let houveErro = false;
    if (!descricao || !percentual || !dataFinal || !dataInicial) {
      setErro("Todos os campos devem ser preechidos");
      setErroPercentual("");
      setErroProdutos("");
      setValido(false);
      return !houveErro;
    }

    if (!listaIds) {
      setErro("");
      setErroProdutos("Selecione pelo menos um produto");
      setValido(false);
      houveErro = true;
    } else {
      setErroProdutos("");
    }

    if (isNaN(percentual)) {
      setErroPercentual("O percentual deve ser um número de 0 a 100");
      setValido(false);
      houveErro = true;
    } else {
      setErroPercentual("");
    }

    if (percentual > 100 || percentual <= 0) {
      setErroPercentual("Insira um percentual de desconto válido");
      setValido(false);
      houveErro = true;
    } else {
      setErroPercentual("");
    }

    return houveErro;
  };


  const handleRegister = async () => {
    if(!validarFormulario()) {
      console.log(percentual)
      console.log("rtrtrt" + percentual/100)
      data = {
        descricao: descricao, 
        percentual_desconto: percentual/100,
        data_inicial: dataInicial,
        data_final: dataFinal,
        produtos: listaIds
      }

      console.log(JSON.stringify(data));

      try {
        await api.createPromocao(data);
      } catch (e) {
        console.log(e)
      }
    }

  };

  const getDataFinal = (date) => {
    setDataFinal(date);
  };

  const getDataInicial = (date) => {
    setDataInicial(date);
  };

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        let produtosData = await api.getProdutosMercado();
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
    const idProdutos = Array.from(listaIds);
    idProdutos.push(idProduto)
    console.log("lista de ids: " + idProdutos)
    setListaIds(idProdutos)
  };

  const removeProduct = (idProduto) => {
    const idProdutos = Array.from(listaIds)
    let index = idProdutos.indexOf(idProduto);
    idProdutos.splice(index, 1);
    console.log("lista de ids: " + idProdutos)
    setListaIds(idProdutos);
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
          {erro && (
            <View style={{ marginTop: height * 0.01}}>
              <ErrorMessage mensagem={erro} maxWidth={"100%"} />
            </View>
          )}

          {valido && 
            <Text style={{...styles.subtitle, marginBottom: height * 0.01}}>
              Sua oferta será imediatamente compartilhada com o público
            </Text>
          }
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
                    color: "#d83933",
                    fontWeight: 500,
                  }}
                >
                  {erroDescricao}
                </Text>
              </View>
            )}

          </View>
          <View style={styles.formField}>
            <View>
              <Text style={styles.label}>Insira o percentual de desconto:</Text>
              <Text style={styles.helpText}>
                Um valor de 0 a 100%. Será aplicado sobre o preço dos produtos selecionados.
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                keyboardType="numeric"
                value={percentual}
                onChangeText={(text) => setPercentual(text)}
              />
            </View>
            {erroPercentual && (
              <View>
                <Text
                  style={{
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
            {erroProdutos && (
              <View>
                <Text
                  style={{
                    color: "#d83933",
                    fontWeight: 500,
                  }}
                >
                  {erroProdutos}
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
  },
  headerContainer: {
    marginTop: height * 0.12,
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
