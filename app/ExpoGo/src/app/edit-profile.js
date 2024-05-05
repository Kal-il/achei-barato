import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import ImagesPicker from "../components/ImagesPicker.js";
import ImputContent from "../components/ImputComponent.js";
import BlueButton from "../components/BlueButton.js";

const { width, height } = Dimensions.get('window'); //essa função retorna o tamanho da tela do dispositivo

export default function EditarPerfil() {
  return (
    <View style={styles.container}>
     <View style={styles.header}>
     <View style={styles.ProfileImage}>
          <ImagesPicker 
          imageSize={0.16}
          ImageHolder={require('../assets/profile.png')}
          ImageBorderRadius={100}
          Condition={true}/* Essa condição diz se o usuário vai ou não poder mudar a imagem*/>
          </ImagesPicker>
          <Text style={styles.title}>Editar Perfil</Text>
      </View>
     </View>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.field}>
            <Text style={styles.subtitle}>Nome</Text>
            <ImputContent placeHolder={"Nome Atual"}></ImputContent>
          </View>
          <View style={styles.field}>
            <Text style={styles.subtitle}>Email</Text>
            <ImputContent placeHolder={"Eḿail-atual@gmail.com"}></ImputContent>
          </View>
          <View style={styles.field}>
            <Text style={styles.subtitle}>Telefone</Text>
            <ImputContent placeHolder={"Telefone Atual"}></ImputContent>
          </View>
          <View style={styles.field}>
            <Text style={styles.subtitle}>Senha</Text>
            <ImputContent placeHolder={"Senha Atual"} secureTextEntry={true}></ImputContent>
          </View>
          <View style={styles.field}>
            <Text style={styles.subtitle}>Nova Senha</Text>
            <ImputContent placeHolder={"Nova Senha"} secureTextEntry={true}></ImputContent>
          </View>

          <TouchableOpacity style = {{alignItems: 'center'}} onPress={{/*ação do botão de salvar vem aqui vem aqui*/}}><BlueButton title={"Salvar"} /></TouchableOpacity>

        </View>
      </ScrollView >
    
      
        {/**<Text>Perfil de</Text>
        
        <Link href = {"/user-configs/configuration"}>Configurações</Link>
        <Link href={"/edit-location"}>Editar localização</Link>
        <Link href={"/logout"}>logout</Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   // alignItems: 'center',
    
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
    marginTop: '4%',
    fontSize: 24,
    fontWeight: "bold",
    color: "#F67235",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#38434D",
  },
  body: {
    margin: '5%',
  },
  field: {
    marginBottom: '2%',
    alignContent: 'center',
  },
});
