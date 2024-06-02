// Página de notificações
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import ListCard from "../../components/ListCard";


export default function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <ListCard 
        NotificationImage = {require('../assets/food.png')}
        Description = {"O produto X está em promoção no supermercado Y !!"}
        NotificationLink={"/promotion"}
        />
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
    //maxWidth: 960,
    },
  header: {
    marginBottom: 24,
    alignContent: "center",
    justifyContent  : "center",
  
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
