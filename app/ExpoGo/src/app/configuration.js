import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";


export default function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>configurações</Text>
        <Link href = {"/user-configs/about-us"}>Sobre o achei barato</Link>
        <Link href = {"/user-configs/acount"}>Conta</Link>
        <Link href = {"/user-configs/notifications"}>Notificações</Link>
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
