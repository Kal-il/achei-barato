import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView} from "react-native";
import ImagesPicker from "../../components/ImagesPicker.js";
import ImputContent from "../../components/ImputComponent.js";
import BlueButton from "../../components/Button.js";
import { useEffect, useState } from "react";
import { ApiClient } from "../../api/ApiClient.js";

const { width, height } = Dimensions.get('window'); //essa função retorna o tamanho da tela do dispositivo

export default function EditarPerfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const updateConsumidorData = async () => {
	params = {}
	
	const variables = {nome: nome, email: email, telefone: telefone}

	for (const [key, value] of Object.entries(variables)){
		if (value) {
			params[key] = value;
		}
	}
    const api = new ApiClient();

    let erros;
    try{
      await api.updateConsumidorData(null, params, false);
    } catch (e) {
      console.error(e.response.data.detail);
    }
  }

  const[consumidor, setConsumidor] = useState(null);
  const[loading, setLoading] = useState(true);
  const[fotoPerfil, setFotoPerfil] = useState('');

  const fetchConsumidorData = async () => {
    const api = new ApiClient();
    
    let erros, consumidorData;
    try {
      consumidorData = await api.getConsumidorData();
    } catch (e) {
      erros = e
    }
	let foto;
    foto = `data:image/jpg;base64,${consumidorData.foto}`
	setFotoPerfil(foto);
    setConsumidor(consumidorData);
    setLoading(false);
  }

  useEffect(() => {
    fetchConsumidorData();
  }, [])

  return (
    <View style={styles.container}>
     <View style={styles.header}>
     <View style={styles.ProfileImage}>
		  {loading && <ImagesPicker 
          imageSize={0.16}
          ImageHolder={require('../assets/profile.png')}
          ImageBorderRadius={100}
          Condition={true}/* Essa condição diz se o usuário vai ou não poder mudar a imagem*/>
          </ImagesPicker>}
	      {fotoPerfil && <ImagesPicker 
          imageSize={0.16}
		  ImageHolder={{uri: fotoPerfil}}
          ImageBorderRadius={100}
          Condition={true}/* Essa condição diz se o usuário vai ou não poder mudar a imagem*/>
          </ImagesPicker>}
          <Text style={styles.title}>Editar Perfil</Text>
      </View>
     </View>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.field}>
            <Text style={styles.subtitle}>Nome</Text>
            {loading && <ImputContent placeHolder={"..."} onChangeText={(text) => setNome(text)}></ImputContent>}
            {consumidor && <ImputContent placeHolder={consumidor.nome} onChangeText={(text) => setNome(text)}></ImputContent>}
          </View>
          <View style={styles.field}>
            <Text style={styles.subtitle}>Email</Text>
            {loading && <ImputContent placeHolder={"..."} onChangeText={(text) => setEmail(text)}></ImputContent>}
            {consumidor && <ImputContent placeHolder={consumidor.email} onChangeText={(text) => setEmail(text)}></ImputContent>}
          </View>
          <View style={styles.field}>
            <Text style={styles.subtitle}>Telefone</Text>
            {loading && <ImputContent placeHolder={"..."} onChangeText={(text) => setTelefone(text)}></ImputContent>}
            {consumidor && <ImputContent placeHolder={`${consumidor.telefone}`} onChangeText={(text) => setTelefone(text)}></ImputContent>}
          </View>
          {/* <View style={styles.field}>
            <Text style={styles.subtitle}>Senha</Text>
            <ImputContent placeHolder={"Senha Atual"} secureTextEntry={true}></ImputContent>
          </View>
          <View style={styles.field}>
            <Text style={styles.subtitle}>Nova Senha</Text>
            <ImputContent placeHolder={"Nova Senha"} secureTextEntry={true}></ImputContent>
          </View> */}

          <TouchableOpacity 
            style = {{alignItems: 'center'}} 
            onPress={() => updateConsumidorData()}>
            <BlueButton title={"Salvar"} />
          </TouchableOpacity>

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
