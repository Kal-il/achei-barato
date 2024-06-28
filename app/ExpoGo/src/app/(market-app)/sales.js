import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { ApiClient } from "../../api/ApiClient";
import Button from "../../components/Button";
import PromotionCard from "../../components/PromotionCard";

export default function SalesPage() {
  const [loading, setLoading] = useState(true);
  const [promocoes, setPromocoes] = useState([]);
  const api = new ApiClient();

  const renderPromocao = ({ item }) => {
    return (
      <PromotionCard
        MarketImageProfile={require("../../assets/supermercado.png")}
        imageSource={require("../../assets/apple.png")}
        MarketName={item.nome_mercado}
        OldPrice={item.preco}
        Price={item.preco_promocional}
        promotionId={item.id}
        PromotionName={item.nome}
        tag="Promoção"
        CommentsNumber={15}
        LikesNumber={15}
        pathname={"sale"}
      />
    );
  };

  useEffect(() => {
    const fetchMarketSales = async () => {
      let promocoesData;
      try {
        promocoesData = await api.getPromocoesUsuario();
        setPromocoes(promocoesData);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchMarketSales();
  }, []);

  return (
    <View>
      {promocoes && (
        <FlatList
          data={promocoes}
          renderItem={renderPromocao}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={styles.mainContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.title}>Suas Promoções</Text>
                <Link href="/sales" asChild>
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
            height: "60%",
            justifyContent: "center",
            alignItems: "center"
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
