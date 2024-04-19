import axios from "axios";
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  FlatList, Center, NativeBaseProvider,
  Box,
} from "react-native";

const TesteScreen = ({navigation}) => {
  const jwtToken = fetchToken("jwt_token");
  const [username, setUsername] = useState("");

  const getUsername = async () => {
    console.log("chama api");
    await axios
    .get("http://192.168.105.20:8000/api/v1/usuario/usuario/eu", {
      headers: {'Authorization': 'Bearer ' + jwtToken, }
    })
    .then(function (response) {
      setUsername(response.data['nome']);
    }).catch(function (error) {
      console.log(error);
      console.log("não autenticado");
      setUsername("Você não está autenticado");
      // Trata erro (redireciona, exibe mensagem de erro, etc)
    });
  };

  getUsername();

  return(
    <LinearGradient colors={["#F67235", "#A9C6FC"]} style={styles.container}>
      {/* { username && (
        <FlatList
          data={username}
          renderItem={renderUsername}
        />
      )} */}
      <Text> {username} </Text>
      <Button title="teste" onPress={() => navigation.navigate('HomeScreen')}/>
  </LinearGradient>
  );
}