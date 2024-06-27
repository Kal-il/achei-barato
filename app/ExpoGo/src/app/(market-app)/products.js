import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import {
  Feather,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ApiClient } from "../../api/ApiClient";
import GradientBackground from "../../components/gradient";
import Button from "../../components/Button";
import PromotionCard from "../../components/PromotionCard";
import ProductCard from "../../components/ProductCard";

const windowDimensions = Dimensions.get("window");
const { height, width } = Dimensions.get("window");

export default function ProductsPage() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderProduto = ({ item }) => {
    return (<ProductCard 
      preco={item.preco}
      nome={item.nome}
      marca={item.marca}
      descricao={item.descricao}
    />)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const api = new ApiClient();
      let produtosData;

      try {
        produtosData = await api.getProdutosMercado();
        console.log(produtosData);
        setProdutos(produtosData);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    fetchProducts();
  }, [])
  return (
    <View>
      {produtos && (
        <FlatList
          data={produtos}
          renderItem={renderProduto}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={styles.mainContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.title}>Seus produtos</Text>
                <Link href="/products" asChild>
                  <TouchableOpacity>
                    <Button title="Cadastrar" ButtonColor={"#FF0F7B"} />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          }
        />
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
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: "5%",
  },
  headerContainer: {
    paddingHorizontal: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: "bold" },
});
