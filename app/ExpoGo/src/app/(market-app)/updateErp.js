import { Link, useRouter } from "expo-router";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import { useEffect, useState } from "react";
import { ApiClient } from "../../api/ApiClient";
import * as SecureStore from "expo-secure-store";

export default function RegisterERP() {
  const [url, setUrl] = useState("");
  const [porta, setPorta] = useState(0);
  const [empId, setEmpId] = useState(0);
  const [terminal, setTerminal] = useState("");

  const [erro, setErro] = useState("");
  const [erroUrl, setErroUrl] = useState("");
  const [erroPorta, setErroPorta] = useState("");
  const [erroEmpId, setErroEmpId] = useState("");
  const [erroTerminal, setErroTerminal] = useState("");

  const [loading, setLoading] = useState(true);
  const [conexao, setConexao] = useState(null);

  const router = useRouter();
  const api = new ApiClient();

  const validarFormulario = () => {
    if (porta) {
      if (isNaN(porta)) {
        setErroPorta("A porta deve ser um número");
      }
      if (porta.length > 6) {
        setErroPorta("Esta porta é muito longa");
      }
    }

    if (empId) {
      if (isNaN(empId)) {
        setErroEmpId("O ID da empresa deve ser um número");
      }
    }

    if (url) {
      if (!isNaN(url)) {
        setErroUrl("Esta URL é inválida");
      }
    }
    return;
  };

  const handleErroAPI = (erros) => {
    if (erros.porta) {
      setErroPorta(erros.porta);
    } else {
      setErroPorta("");
    }

    if (erros.url_base) {
      setErroUrl(erros.url_base);
    } else {
      setErroUrl("");
    }

    if (erros.emp_id) {
      setErroEmpId(erros.emp_id);
    } else {
      setErroEmpId("");
    }

    if (erros.terminal) {
      setErroTerminal(erros.terminal);
    } else {
      setErroTerminal("");
    }
  };

  const handleRegister = async () => {
    validarFormulario();

    values = {
      url_base: url,
      porta: porta,
      emp_id: empId,
      terminal: terminal,
      empresa_erp: 1,
    };

    data = {};

    for (const [key, value] of Object.entries(values)) {
      if (value) {
        data[key] = value;
      }
    }

    let erros;

    try {
      await api.updateConexaoERP(data);

      SecureStore.setItem("mensagem", "Dados de conexão atualizados.");

      router.replace("/erp");
    } catch (e) {
      erros = e.response.data.detail;
      handleErroAPI(erros);
    }
  };

  useEffect(() => {
    const fetchConexaoData = async () => {
      let conexaoData;
      try {
        conexaoData = await api.getConexaoERP();
        setConexao(conexaoData);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchConexaoData();
  }, []);
  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Atualizar dados da API</Text>
          <Text style={styles.subtitle}>
            Conecte seu sistema de ERP com o Achei Barato.
          </Text>
        </View>

        {erro && (
          <View style={{ alignSelf: "center" }}>
            <ErrorMessage mensagem={erro} />
          </View>
        )}

        {conexao && (
          <View style={styles.formContainer}>
            <View style={styles.formField}>
              <Text style={styles.subtitle}>Insira a URL da API:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  value={url}
                  placeholder={conexao.url_base}
                  onChangeText={(text) => setUrl(text)}
                />
              </View>
              {erroUrl && (
                <View>
                  <Text
                    style={{
                      marginLeft: 15,
                      color: "#d83933",
                      fontWeight: 500,
                    }}
                  >
                    {erroUrl}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.formField}>
              <Text style={styles.subtitle}>
                Insira a porta de conexão com a API:
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  keyboardType="numeric"
                  placeholder={String(conexao.porta)}
                  value={porta ? String(porta) : ""}
                  onChangeText={(text) => setPorta(parseInt(text))}
                />
              </View>

              {erroPorta && (
                <View>
                  <Text
                    style={{
                      marginLeft: 15,
                      color: "#d83933",
                      fontWeight: 500,
                    }}
                  >
                    {erroPorta}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.formField}>
              <Text style={styles.subtitle}>
                Insira o ID da empresa no sistema:
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  keyboardType="numeric"
                  placeholder={String(conexao.emp_id)}
                  value={empId ? String(empId) : ""}
                  onChangeText={(text) => setEmpId(parseInt(text))}
                />
              </View>

              {erroEmpId && (
                <View>
                  <Text
                    style={{
                      marginLeft: 15,
                      color: "#d83933",
                      fontWeight: 500,
                    }}
                  >
                    {erroEmpId}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.formField}>
              <Text style={styles.subtitle}>Insira o número de terminal:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputText}
                  value={terminal}
                  placeholder={conexao.terminal}
                  onChangeText={(text) => setTerminal(text)}
                />
              </View>

              {erroTerminal && (
                <View>
                  <Text
                    style={{
                      marginLeft: 15,
                      color: "#d83933",
                      fontWeight: 500,
                    }}
                  >
                    {erroTerminal}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.buttonField}>
              <TouchableNativeFeedback onPress={handleRegister}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Cadastrar</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        )}
      </View>
      {loading && (
        <View
          style={{
            height: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
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
    marginBottom: 20,
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
    paddingTop: "5%",
  },
  headerContainer: {
    paddingHorizontal: "5%",
    marginBottom: 20,
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
