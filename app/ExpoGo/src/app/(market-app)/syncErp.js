import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ButtonCard from "../../components/ButtonCard";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { ApiClient } from "../../api/ApiClient";
import { useRouter } from "expo-router";

export default function SyncERP() {
  const router = useRouter();

  const api = new ApiClient();

  const [conexao, setConexao] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);
  const [sincronizando, setSincronizando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    const fetchConexao = async () => {
      try {
        let conexaoData = await api.getConexaoERP();
        setConexao(conexaoData);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setErro("Erro ao obter dados de conexão.");
        setLoading(false);
      }
    };

    fetchConexao();
  }, []);

  const handleSync = async () => {
    setSincronizando(true);

    try {
      console.log("iniciando");
      response = await api.sincronizarERP();
      if (response) {
        console.log(response);
        setSucesso(true);
      }
    } catch (e) {
      console.log(e);
      setSincronizando(false);
      setErro(
        "Ocorreu um erro durante a sincronização. Tente novamente mais tarde.",
      );
    }
  };

  const handleRedirect = () => {
    router.push("/updateErp");
  };

  const handleReturn = () => {
    router.replace("/erp");
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Sincronize suas promoções</Text>
        <Text style={styles.subtitle}>
          O Achei Barato se conecta diretamente com o seu sistema de ERP e
          compartilha as promoções cadastradas com a comunidade.
        </Text>

        <View style={styles.infoContainer}>
          {!sincronizando && !erro && (
            <View>
              <Text style={styles.subtitle}>
                Os dados utilizados para conexão serão os seguintes:{" "}
              </Text>
              {conexao && (
                <View>
                  <View style={{ marginTop: 7 }}>
                    <Text style={{ fontSize: 16 }}>
                      <Text style={{ fontWeight: "bold" }}>URL:</Text>{" "}
                      {conexao.url_base}:{conexao.porta}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                      <Text style={{ fontWeight: "bold" }}>Terminal:</Text>{" "}
                      {conexao.terminal}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                      <Text style={{ fontWeight: "bold" }}>ID da Empresa:</Text>{" "}
                      {conexao.emp_id}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.button} onPress={handleSync}>
                    <Text style={styles.loginText}>Sincronizar com ERP</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.redirectButton}
                    onPress={handleRedirect}
                  >
                    <Text style={styles.redirectText}>
                      Atualizar dados de conexão
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
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
          )}
          {sincronizando && !loading && !sucesso && (
            <View style={{ alignSelf: "center", marginVertical: "10%" }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: "500",
                  color: "#303030",
                }}
              >
                Sincronizando...{"\n"}Isto pode demorar alguns minutos.
              </Text>
            </View>
          )}
          {sucesso && (
            <View style={styles.messageSuccessContainer}>
              <FontAwesome name="rocket" size={32} />
              <Text style={styles.message}>Sucesso!</Text>
              <Text style={styles.messageDescription}>
                Seu sistema de ERP está sincronizado com o Achei Barato.
              </Text>
              <TouchableOpacity
                style={styles.returnButton}
                onPress={handleReturn}
              >
                <Text style={styles.loginText}>Voltar</Text>
              </TouchableOpacity>
            </View>
          )}

          {!sucesso && erro && (
            <View style={styles.messageErrorContainer}>
              <MaterialIcons name="error" size={32} />
              <Text style={styles.message}>Erro Interno no Servidor</Text>
              <Text style={styles.messageDescription}>{erro}</Text>
              <TouchableOpacity
                style={styles.errorButton}
                onPress={handleReturn}
              >
                <Text style={styles.loginText}>Voltar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    width: "100%",
    marginTop: 40,
    backgroundColor: "white",
    borderRadius: 24,
    elevation: 1,
    padding: 20,
  },
  mainContainer: {
    paddingTop: "5%",
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: "5%",
    elevation: 2,
  },
  returnButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#138a31",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: "5%",
    elevation: 2,
  },
  errorButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#d83933",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: "6%",
    elevation: 2,
  },
  loginText: {
    fontSize: 16,
    color: "white",
    marginHorizontal: "3%",
    fontWeight: "bold",
  },
  redirectButton: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: "5%",
    elevation: 3,
  },
  redirectText: {
    fontSize: 16,
    color: "#303030",
    marginHorizontal: "3%",
    fontWeight: "bold",
  },
  headerContainer: {
    paddingHorizontal: "5%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  messageContainer: {
    marginHorizontal: "5%",
    padding: 15,
    backgroundColor: "#ffedba",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  messageSuccessContainer: {
    padding: 15,
    backgroundColor: "#b0ffc4",
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  messageErrorContainer: {
    padding: 15,
    backgroundColor: "#F8E1DE",
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  message: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: "bold",
    color: "#303030",
    textAlign: "center",
  },
  messageDescription: {
    fontSize: 16,
    color: "#303030",
    textAlign: "center",
  },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: "500",
    color: "#303030",
  },
});
