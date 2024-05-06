import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Button} from "react-native";
import { Link } from "expo-router";
import ImagesPicker from "../../components/ImagesPicker.js";
import ProfileScreenButton  from "../../components/ProfileSreenButton.js";
import { ApiClient } from "../../api/ApiClient.js";
import { useEffect, useState } from "react";

const { width, height } = Dimensions.get('window');

export default function Perfil() {
  const[consumidor, setConsumidor] = useState(null);

  const fetchConsumidorData = async () => {
    const api = new ApiClient();
    
    let erros, consumidorData;
    try {
      consumidorData = await api.getConsumidorData()
    } catch (e) {
      erros = e
    }

    setConsumidor(consumidorData);
  }

  useEffect(() => {
    fetchConsumidorData();
  }, [])


  return (

    <View style={styles.container}>
      <View style={styles.header}>
     <View style={styles.ProfileImage}>
          <ImagesPicker 
          imageSize={0.16}
          ImageHolder={require('../../assets/profile.png')}
          ImageBorderRadius={100}>
          </ImagesPicker>
          {consumidor && <Text style={styles.title}>{consumidor.nome}</Text>}
      </View>
     </View>
    <View style={{alignItems: 'center'}}>
    <ProfileScreenButton
       ButtonLink={"/edit-profile"}
       ButtonText={"Editar Perfil"}
       ButtonIcon={"edit"}
       ButtonIconColor={"#8D8D8D"}
     />
     <ProfileScreenButton
       ButtonLink={"/configuration"}
       ButtonText={"Configurações"}
       ButtonIcon={"settings"}
        ButtonIconColor={"#8D8D8D"}

     />
     <ProfileScreenButton
       ButtonLink={"/edit-location"}
       ButtonText={"Editar Localização"}
       ButtonIcon={"map"}
       ButtonIconColor={"#8D8D8D"}

     />
     <ProfileScreenButton
       ButtonLink={"/logout"}
       ButtonText={"Sair"}
       ButtonIcon={"logout"}
       ButtonIconColor={"#FF6565"}
     />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  }, 
  header: {
    height: height/4.5,
  },
  ProfileImage: {
    ignoraSafeArea: true,
    alignItems: 'center',
    marginBottom: '3%',
    backgroundColor: '#ABC6FD',
    height: height/9,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F67235",
  },
});
