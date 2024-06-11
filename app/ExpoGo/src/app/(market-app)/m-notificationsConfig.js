import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Link } from "expo-router";
import GradientBackground from "../../components/gradient";
import Switchable from "../../components/SwitchButton";

const { width, height } = Dimensions.get('window');

export default function NotificacoesConfig() {
  return (
    <GradientBackground style={styles.container}>
      <View style={styles.main}>
      <View style={styles.line} />
        <View style={styles.field}>
          <Text style={styles.text}>Silenciar notificações</Text>
          <Switchable />
        </View>
        <View style={styles.line} />
        <View style={styles.field}>
          <Text style={styles.text}>Notificar quando produtos curtidos
            entrarem em promoção</Text>
          <Switchable />
        </View>
        <View style={styles.line} />
        <View style={styles.field}>
          <Text style={styles.text}>Notificar quando produtos de mercados
            favoritados estiverem de promoção</Text>
          <Switchable />
        </View>
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
    justifyContent: "center",
  },
  field: {
    marginBottom: '5%',
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    width: width * 0.8,
    paddingRight: '5%',
    color: '#fff',
    marginBottom: '2%',
    marginTop: '2%',
    fontSize: 20,
    fontWeight: "500",
    textAlign: 'justify', // Justifica o texto
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#fffa',
    width: width * 0.9, // Controla a largura da linha (nesse caso está com 90% da largura da tela)
    alignSelf: 'center', // Centraliza a linha
    marginVertical: '1%', // Adiciona uma margem vertical para separar a linha dos links
  },
});