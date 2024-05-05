import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native";
import { Link } from "expo-router";
import GradientBackground from "../../components/gradient";

const { width, height } = Dimensions.get("window");

export default function Dashboard() {
  return (
    
    <View style={styles.container}>
      <GradientBackground><View style={styles.statusBar}></View></GradientBackground>
      <View style={styles.main}>
        <Text style={styles.title}>Favoritos</Text>
        <Link href={"/store-profile"}>perfil do mercado</Link>
        <Link href={"/promotion"}>Promoção</Link>
        <Link href={"/register-client/register-user-1"}>Trem</Link>
        <Link href={"/login"}>Login</Link>
        <Link href={"SuperMarkets/RegisterScreen"}>Cadastrar Mercado</Link>
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
  statusBar: {
    height: StatusBar.currentHeight,
    width: width,
  }
});
