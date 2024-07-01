import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import GradientBackground from "../../../components/gradient.js";
import ProductCategory from "../../../components/ProductCategory.js";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ApiClient } from "../../../api/ApiClient.js";
import PromotionCard from "../../../components/PromotionCard.js";
import MercadoCard from "../../../components/MercadoCard.js";
import { Authenticator } from "../../../api/Authenticator.js";

const { width, height } = Dimensions.get("window"); //essa função retorna o tamanho da tela do dispositivo

export default function Dashboard() {
  const [data] = useState([
    { Name: "Alimentos", Image: require("../../../assets/food.png"), id: "1" },
    {
      Name: "Higiene",
      Image: require("../../../assets/personClean.png"),
      id: "2",
    },
    { Name: "Limpeza", Image: require("../../../assets/clean.png"), id: "3" },
    { Name: "Pet", Image: require("../../../assets/pet.png"), id: "4" },
  ]);

  const [query, setQuery] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const api = new ApiClient();

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.category}>
      <ProductCategory CategoryName={item.Name} CategoryImage={item.Image} />
    </TouchableOpacity>
  );

  const renderProduto = ({ item }) => {
    return (
      <PromotionCard
        MarketImageProfile={require("../../../assets/supermercado.png")}
        imageSource={require("../../../assets/apple.png")}
        imagem={item.foto}
        marketImagem={item.foto_mercado}
        MarketName={item.nome_mercado}
        OldPrice={item.preco}
        Price={item.preco_promocional}
        promotionId={item.id}
        PromotionName={item.nome}
        tag="Promoção"
        CommentsNumber={15}
        LikesNumber={15}
        marketId={item.mercado_id}
      />
    );
  };

  const renderMercado = ({ item }) => {
    return <MercadoCard
      mercadoId={item.id}
      nomeFantasia={item.nome_fantasia}
      endereco={item.endereco}
      bairro={item.bairro}
      cidade={item.cidade}
      estado={item.estado}
      logo={item.logo}
    />
  }

  const handleSearch = async () => {
    try {
      if (!query) {
        return;
      }

      setLoading(true);
      params = { nome: query };
      let resultadoData;
      resultadoData = await api.getProdutosMercadosQuery(params);
      if (resultadoData) {
        console.log(resultadoData);
      }
      setResultado(resultadoData);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleVoltar = () => {
    setLoading(false);
    setResultado(null);
    setQuery("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <StatusBar barStyle="light-content" />
        <GradientBackground>
          <View style={{ flex:1, marginTop: "7%", flexDirection: "row", alignItems: "center" }}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Pesquise no achei barato"
                placeholderTextColor="grey"
                value={query}
                onChangeText={(text) => setQuery(text)}
              />
            </View>
            <View style={styles.notification}>
              <TouchableOpacity onPress={handleSearch}>
                <Feather
                  name="search"
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
          </View>
        </GradientBackground>
      </View>

      <View>
        {!resultado && !loading && (
          <View>
            <View style={styles.titleCover}>
              <Text style={styles.title}>Pesquise por categorias</Text>
            </View>

            <View style={styles.line}>
              <GradientBackground />
            </View>
            <View style={{ alignSelf: "center" }}>
              <FlatList
                data={data}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                  flexGrow: 1,
                  alignSelf: "center",
                  marginLeft: "5%",
                  marginRight: "2%",
                }}
                numColumns={2}
              />
            </View>
          </View>
        )}
        {loading && (
          <View
            style={{
              marginTop: "40%",
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        {resultado && !loading && (
          <View>
            <TouchableOpacity
              style={{
                marginHorizontal: "5%",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
                gap: 6
              }}
              onPress={handleVoltar}
            >
              <MaterialIcons name="arrow-back" size={18}></MaterialIcons>
              <Text style={{ fontSize: 18 }}>Voltar</Text>
            </TouchableOpacity>
              {resultado.produtos && (
              <View>
                <FlatList
                  data={resultado.produtos}
                  renderItem={renderProduto}
                  keyExtractor={(item) => item.id}
                />
              </View>
              )}
              {resultado.mercados && <FlatList
                data={resultado.mercados}
                renderItem={renderMercado}
                keyExtractor={(item) => item.id}
              />}
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 20,
	height: height * 0.11
  },
  notification: {
    height: height * 0.05,
    aspectRatio: 1, // Mantém a proporção
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100, //é um circulo
  },
  inputView: {
	width:"80%",
    marginHorizontal: "2%",
  },
  inputText: {
    height: height * 0.05,
    color: "grey",
    paddingLeft: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  titleCover: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#D05A7A",
  },
  line: {
    height: "0.4%",
    backgroundColor: "grey",
    marginBottom: "5%",
  },
  categories: {
    justifyContent: "space-between",
  },
  category: {
    aspectRatio: 1, // Mantém a proporção da imagem
  },
});
