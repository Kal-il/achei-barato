// Página de detalhes da promoção RF05
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";


export default function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Detalhe das promoções</Text>
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
