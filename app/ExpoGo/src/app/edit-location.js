import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import ImagesPicker from "../components/ImagesPicker.js";
import ImputContent from "../components/ImputComponent.js";
import Button from "../components/Button.js";
import { useEffect, useState } from "react";
import { ApiClient } from "../api/ApiClient.js";


const { width, height } = Dimensions.get('window'); //essa função retorna o tamanho da tela do dispositivo

export default function EditarLocal() {
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");

  const[consumidor, setConsumidor] = useState(null);
  const[fotoPerfil, setFotoPerfil] = useState('');
  const[loading, setLoading] = useState(true);

  const fetchConsumidorData = async () => {
    const api = new ApiClient();
    
    let erros, consumidorData;
    try {
      consumidorData = await api.getConsumidorData()
    } catch (e) {
      erros = e
    }

    setConsumidor(consumidorData);
    setLoading(false);

    foto = `data:image/jpg;base64,${consumidorData.foto}`
	setFotoPerfil(foto);
  }

  useEffect(() => {
    fetchConsumidorData();
  }, [])

  const updateConsumidorData = async () => {
    data = {
      cep: cep,
      estado: estado,
      cidade: cidade,
      bairro: bairro,
      endereco: endereco,
      complemento: complemento,
    }

	params = {}

    for (const[key, value] of Object.entries(data)) {
		if (value) {
			params[key] = value;
		}
	}

    const api = new ApiClient();

    let erros;
    try{
      await api.updateConsumidorData(null, params);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.ProfileImage}>
			{loading && <ImagesPicker
            imageSize={0.16}
            ImageHolder={require('../assets/profile.png')}
            ImageBorderRadius={100}>
          </ImagesPicker>}
	      {fotoPerfil && <ImagesPicker 
          imageSize={0.16}
		  ImageHolder={{uri: fotoPerfil}}
          ImageBorderRadius={100}></ImagesPicker>}
          <Text style={styles.title}>Editar Localização</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.field}>
            <Text style={styles.subtitle}>Endereço</Text>
            {loading && <ImputContent 
              placeHolder={"..."}
              onChangeText={(text) => setEndereco(text)}
            ></ImputContent>}
            {consumidor && <ImputContent 
              placeHolder={consumidor.endereco}
              onChangeText={(text) => setEndereco(text)}
            ></ImputContent>}
          </View>

          <View style={styles.field}>
            <Text style={styles.subtitle}>CEP</Text>
            {loading && <ImputContent 
              placeHolder={"..."}
              onChangeText={(text) => setCep(text)}
            ></ImputContent>}
            {consumidor && <ImputContent 
              placeHolder={consumidor.cep}
              onChangeText={(text) => setCep(text)}
            ></ImputContent>}
          </View>

          <View style={styles.field}>
            <Text style={styles.subtitle}>Bairro</Text>
            {loading && <ImputContent 
              placeHolder={"..."}
              onChangeText={(text) => setBairro(text)}
            ></ImputContent>}
            {consumidor && <ImputContent 
              placeHolder={consumidor.bairro}
              onChangeText={(text) => setBairro(text)}
            ></ImputContent>}
          </View>

          <View style={styles.field}>
            <Text style={styles.subtitle}>Cidade</Text>
            {loading && <ImputContent 
              placeHolder={"..."}
              onChangeText={(text) => setCidade(text)}
            ></ImputContent>}
            {consumidor && <ImputContent 
              placeHolder={consumidor.cidade}
              onChangeText={(text) => setCidade(text)}
            ></ImputContent>}
          </View>

          <View style={styles.field}>
            <Text style={styles.subtitle}>Estado</Text>
            {loading && <ImputContent 
              placeHolder={"..."}
              onChangeText={(text) => setEstado(text)}
            ></ImputContent>}
            {consumidor && <ImputContent 
              placeHolder={consumidor.estado}
              onChangeText={(text) => setEstado(text)}
            ></ImputContent>}
          </View>

          <View style={styles.field}>
            <Text style={styles.subtitle}>Complemento</Text>
            {loading && <ImputContent 
              placeHolder={"..."}
              onChangeText={(text) => setComplemento(text)}
            ></ImputContent>}
            {consumidor && <ImputContent 
              placeHolder={consumidor.complemento}
              onChangeText={(text) => setComplemento(text)}
            ></ImputContent>}
          </View>
          {/* <Link href={"/location"} style={styles.location} asChild>
            <TouchableOpacity>
              <View>
                <MapView style={styles.map} />
              </View>
            </TouchableOpacity>
          </Link> */}


          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => updateConsumidorData()}><Button title={"Salvar"} /></TouchableOpacity>

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
    height: height / 4.5,
  },
  ProfileImage: {
    ignoraSafeArea: true,
    alignItems: 'center',
    marginBottom: '3%',
    backgroundColor: '#ABC6FD',
    height: height / 9,
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
  location: {
    marginBottom: '2%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  map: {
    width: width * 0.9,
    height: height / 5,
  },
});
