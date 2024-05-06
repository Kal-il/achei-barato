import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import GradientBackground from "../../components/gradient";

const { width, height } = Dimensions.get("window");

export default function Dashboard() {
  return (
    
    <View style={styles.container}>
      <View style={{ position: 'absolute', left: 0, right: 0, top: 0, height: StatusBar.currentHeight+5 }}>
          <GradientBackground/>
      </View>
      <StatusBar
        translucent={true}
        backgroundColor='transparent'
        barStyle='light-content'
      />
      <View style={styles.main}>
        <Text style={styles.title}>Itens Curtidos</Text>
        <View style={styles.line}><GradientBackground /></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    marginTop: '15%',
  },
  line: {
    width: width * 0.95,
    height: height * 0.004,
    marginVertical: '5%',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#CF5A7C",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
