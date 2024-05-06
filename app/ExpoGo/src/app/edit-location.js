import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import ImagesPicker from "../components/ImagesPicker.js";
import ImputContent from "../components/ImputComponent.js";
import Button from "../components/Button.js";
import MapView from 'react-native-maps';
import { useState } from "react";
import { ApiClient } from "../api/ApiClient.js";


const { width, height } = Dimensions.get('window'); //essa função retorna o tamanho da tela do dispositivo

export default function EditarLocal() {
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");

  const updateConsumidorData = async () => {
    data = {
      cep: cep,
      estado: estado,
      cidade: cidade,
      bairro: bairro,
      endereco: endereco,
      complemento: complemento,
    }

    const api = new ApiClient();

    let erros;
    try{
      await api.updateConsumidorData(data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.ProfileImage}>
          <ImagesPicker
            imageSize={0.16}
            ImageHolder={require('../assets/profile.png')}
            ImageBorderRadius={100}>
          </ImagesPicker>
          <Text style={styles.title}>Editar Localização</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.field}>
            <Text style={styles.subtitle}>Endereço</Text>
            <ImputContent 
              placeHolder={"Endereço atual"}
              onChangeText={(text) => setEndereco(text)}
            ></ImputContent>
          </View>
          <View style={styles.field}>
            <Text style={styles.subtitle}>CEP</Text>
            <ImputContent 
              placeHolder={"CEP atual"}
              onChangeText={(text) => setCep(text)}
            >
            </ImputContent>
          </View>
          <View style={styles.field}>
            <Text style={styles.subtitle}
            >Bairro</Text>
            <ImputContent placeHolder={"Bairro atual"}onChangeText={(text) => setBairro(text)}></ImputContent>
          </View>
          <View style={styles.field}>
            <Text style={styles.subtitle}>Cidade</Text>
            <ImputContent placeHolder={"Cidade atual"}
            onChangeText={(text) => setCidade(text)}></ImputContent>
          </View>
          <View style={styles.field}>
            <Text style={styles.subtitle}>Estado</Text>
            <ImputContent placeHolder={"Estado atual"}onChangeText={(text) => setEstado(text)}></ImputContent>
          </View>
          <View style={styles.field}>
            <Text style={styles.subtitle}>Complemento</Text>
            <ImputContent placeHolder={"Complemento atual"}onChangeText={(text) => setComplemento(text)}></ImputContent>
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
