import { Link } from "expo-router";
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

export default function ErpManager() {

  const [mensagem, setMensagem] = useState("");
  const [delayComplete, setDelayComplete] = useState(false);
  const [naoCadastrado, setNaoCadastrado] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async (mensagemData) => {
      setDelayComplete(false);
      setMensagem(mensagemData);
      await SecureStore.deleteItemAsync("mensagem");

      setTimeout(() => {
        setDelayComplete(true);
      }, 15000);
    };

    let mensagemData;
    mensagemData = SecureStore.getItem("mensagem");

    if (mensagemData) {
      fetchMessage(mensagemData);
    }
  }, []);

  useEffect(() => {
    const fetchConexaoData = async () => {
      let conexaoData;

      const api = new ApiClient();
      try {
        conexaoData = await api.getConexaoERP();
      } catch (e) {
        if (e.response) {
          if (e.response.status != 404) {
            erro = e.response.data.detail;
          } else {
            setNaoCadastrado(true);
          }
        }
      }
      setLoading(false);
    };

    fetchConexaoData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Sistema ERP</Text>
        <Text style={styles.subtitle}>
          Todas as promoções do seu mercado sincronizadas com o Achei Barato.
        </Text>
      </View>

      {naoCadastrado && (
        <View style={styles.messageContainer}>
          <FontAwesome name="warning" size={32} />
          <Text style={styles.message}>
            Seu sistema de ERP ainda não está sincronizado!
          </Text>
          <Text style={styles.messageDescription}>
            Sincronizar significa mais facilidade na hora de divulgar suas
            promoções para os seus clientes. Para inserir os dados de conexão,
            basta clicar no botão "Cadastrar Dados da API".
          </Text>
        </View>
      )}

      {mensagem && !delayComplete && (
        <View style={styles.messageSuccessContainer}>
          <FontAwesome name="rocket" size={32} />
          <Text style={styles.message}>
            Seu sistema de ERP está cadastrado!
          </Text>
          <Text style={styles.messageDescription}>{mensagem}</Text>
        </View>
      )}

      {!naoCadastrado && <ButtonCard
        text="Sincronizar promoções"
        link="/syncErp"
        IconComponent={MaterialCommunityIcons}
        iconSize={32}
        iconName={"database-sync"}
      />}
      {loading && (
        <View
          style={{
            height: "23%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {!loading && naoCadastrado && (
        <ButtonCard
          text="Cadastar dados da API"
          link="/registerErp"
          IconComponent={MaterialCommunityIcons}
          iconSize={32}
          iconName={"api"}
        />
      )}
      {!loading && !naoCadastrado && (
        <ButtonCard
          text="Atualizar dados da API"
          link="/updateErp"
          IconComponent={MaterialCommunityIcons}
          iconSize={32}
          iconName={"api"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: "5%",
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
    fontWeight: "bold",
    color: "#303030",
  },
});
