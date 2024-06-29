;
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ButtonCard from "../../components/ButtonCard";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { ApiClient } from "../../api/ApiClient";

export default function SyncERP() {

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
        setLoading(false)
      } catch (e) {
        console.error(e);
        setErro("Erro ao obter dados de conexão.");
        setLoading(false)
      }
    } 

    fetchConexao();
  }, [])

  const handleSync = async () => {
    setSincronizando(true);

    try {
      console.log('iniciando')
      response = await api.sincronizarERP();
      if (response) {
        console.log(response);
        setSucesso(true);
      }
    } catch (e) {
      console.log(e);
      setSincronizando(false);
      setErroSync("Ocorreu um erro durante a sincronização.")
    }

  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Sincronize suas promoções</Text>
        <Text style={styles.subtitle}>
          O Achei Barato se conecta diretamente com o seu sistema de ERP e compartilha as promoções cadastradas com a comunidade.
        </Text>

        <View style={{ marginTop: 15}}>
          <Text style={styles.subtitle}>Os dados utilizados para conexão serão os seguintes: </Text>
          {conexao && (
            <View>
              <View style={{ marginTop: 7 }}>
                <Text style={{fontSize: 16}}><Text style={{ fontWeight: "bold"}}>URL:</Text> {conexao.url_base}:{conexao.porta}</Text>
                <Text style={{fontSize: 16}}><Text style={{ fontWeight: "bold"}}>Terminal:</Text> {conexao.terminal}</Text>
                <Text style={{fontSize: 16}}><Text style={{ fontWeight: "bold"}}>ID da Empresa:</Text> {conexao.emp_id}</Text>
              </View>
              {!sincronizando && <TouchableOpacity style={styles.button} onPress={handleSync}>
                <Text style={styles.loginText}>Sincronizar com ERP</Text>
              </TouchableOpacity>}
              {sincronizando && !sucesso && (
                <View style={{ alignSelf: "center", marginTop: "40%" }}>
                  <Text style={{ fontSize: 18, textAlign: "center", fontWeight: "500", color: "#303030"}}>Sincronizando...{"\n"}Isto pode demorar alguns minutos.</Text>
                </View>
              )}
              {sucesso && (
                <View style={{ alignSelf: "center", marginTop: "40%" }}>
                  <Text style={{ fontSize: 18, textAlign: "center", fontWeight: "500", color: "#303030"}}>Sucesso!</Text>
                </View>
              )}
            </View>
          )}
          {loading && (
              <View
                style={{
                  marginTop: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          {erro && (
            <View>
              <Text>{erro}</Text>
            </View>
          )}
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  loginText: {
    fontSize: 16,
    color: "white",
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
    marginHorizontal: "5%",
    padding: 15,
    backgroundColor: "#b0ffc4",
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: "bold",
    color: "#303030",
    textAlign: "center",
  },
  messageDescription: { marginTop: 15, fontSize: 16, color: "#303030" },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: "500",
    color: "#303030",
  },
});
