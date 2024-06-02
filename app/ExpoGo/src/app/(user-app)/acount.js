import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { Link } from "expo-router";
import GradientBackground from "../../components/gradient";

const {width, height} = Dimensions.get('window');

export default function Conta() {
  return (
    <GradientBackground style={styles.container}>
      <View style={styles.main}>
        <View style={styles.line} />
        <TouchableOpacity>
          <Text style={styles.text}>Mudar endereço de E-mail</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity>
          <Text style={styles.text}>Mudar senha</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity>
          <Text style={styles.RedText}>Deletar conta</Text>
        </TouchableOpacity>
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
  RedText: {
    color: '#FF0000',
    marginBottom: '2%',
    marginTop: '2%',
    fontSize: 20,
    fontWeight: "bold",
    borderBottomColor: '#FF0000',
    borderBottomWidth: 1,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#fffa',
    width: width * 0.9, // Controla a largura da linha (nesse caso está com 90% da largura da tela)
    alignSelf: 'center',
    marginVertical: '1%', 
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
