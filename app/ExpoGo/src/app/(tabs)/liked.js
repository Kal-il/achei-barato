import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";


export default function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Favoritos</Text>
        <Link href={"/store-profile"}>perfil do mercado</Link>
        <Link href={"/promotion"}>Promoção</Link>
        <Link href={"/SuperMarkets/ProductsAndPromotions"}>aaaaaaaa</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
