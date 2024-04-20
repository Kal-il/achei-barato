import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Home</Text>

        <Link href="/promotion">Promoção</Link>
        <Link href={"/notification"}>Notificações</Link>
        <Link href={"/store-profile"}>Perfil do mercado</Link>
        <Link href={"/login"}>login</Link>
        <Link href={"/RegisterScreen"}>login</Link>
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
    fontSize: 32,
    fontWeight: "bold",
    padding: '5%',
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
