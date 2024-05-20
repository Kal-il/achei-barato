import { StyleSheet, Text, View, Dimensions} from "react-native";
import { Link } from "expo-router";
import GradientBackground from "../../components/gradient";

const {width, height} = Dimensions.get('window');

export default function Dashboard() {
  return (
    <GradientBackground style={styles.container}>
      <View style={styles.main}>
      <View style={styles.line} />
        <Link href = {"/about-us"} style={styles.text}>Sobre o achei barato</Link>
        <View style={styles.line} />
        <Link href = {"/acount"} style={styles.text}>Conta</Link>
        <View style={styles.line} />
        <Link href = {"/notificationsConfig"} style={styles.text}>Notificações</Link>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    paddingTop: '30%',
    paddingHorizontal: '5%',
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  text: {
    color: '#fff',
    marginBottom: '2%',
    marginTop: '2%',
    fontSize: 20,
    fontWeight: "500",
    
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#fffa',
    width: width * 0.9, // Controla a largura da linha (nesse caso está com 90% da largura da tela)
    alignSelf: 'center', // Centraliza a linha
    marginVertical: '1%', // Adiciona uma margem vertical para separar a linha dos links
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
