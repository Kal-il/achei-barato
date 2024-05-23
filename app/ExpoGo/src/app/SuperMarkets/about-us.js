import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import GradientBackground from "../../components/gradient";


export default function SobreNos() {
  return (
    <GradientBackground style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.text}>O Achei Barato é o seu companheiro ideal para economizar nas suas compras diárias! Com nosso aplicativo, você pode facilmente encontrar as melhores promoções nos mercados próximos à sua localização. Saiba onde os produtos estão mais baratos e mais próximos de você, tudo em um só lugar. Simplifique sua vida e economize tempo e dinheiro com o Achei Barato!</Text>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: '5%',
    marginTop: '25%',
    alignItems: "center",
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: "500",
    textAlign: 'justify', // Justifica o texto
    lineHeight: 30, // Adiciona espaçamento de linha

  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
