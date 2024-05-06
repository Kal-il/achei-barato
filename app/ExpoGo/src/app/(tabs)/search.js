import React, { useState } from 'react';
import { StyleSheet,
  Text,
  View, 
  TextInput,
  StatusBar,
  TouchableOpacity,
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  Dimensions } from 'react-native';
import { Link } from 'expo-router';
import GradientBackground from '../../components/gradient.js';
import ProductCategory from '../../components/ProductCategory.js';

const { width, height } = Dimensions.get('window'); //essa função retorna o tamanho da tela do dispositivo

export default function Dashboard() {
  const [data] = useState([
    { Name: 'Alimentos', Image: require('../../assets/food.png'), id: '1' },
    { Name: 'Higiene', Image: require('../../assets/personClean.png'), id: '2' },
    { Name: 'Limpeza', Image: require('../../assets/clean.png'), id: '3' },
    { Name: 'Pet', Image: require('../../assets/pet.png'), id: '4' },
  ]);

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.category}>
      <ProductCategory
        CategoryName={item.Name}
        CategoryImage={item.Image}
      />
    </TouchableOpacity>
  );


  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <StatusBar barStyle="light-content" />
        <GradientBackground style={{alignItems: 'baseline'}}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Pesquise no achei barato"
              placeholderTextColor="grey"
            />
          </View>
        </GradientBackground>
      </View>

      <View style={styles.titleCover}>
      <Text style={styles.title}>Pesquise por categorias</Text>
      </View>


      <View style={styles.line}><GradientBackground /></View>

     <View style={{alignSelf: 'center'}}>
     <FlatList
        data={data}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{flexGrow: 1, alignSelf: 'center', marginLeft: '5%', marginRight: '2%'}}
        numColumns={2}
      />
     </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
  header: {
    height: height * 0.11, // Altura do cabeçalho
    marginBottom: 20,
  },
  inputView: {
    flex: 0.95,
    marginHorizontal: '2%',
    marginBottom: 20,
    paddingTop: StatusBar.currentHeight + 5, // Garante que o conteúdo não seja coberto pelo StatusBar
  },
  inputText: {
    height: height * 0.05,
    color: 'grey',
    paddingLeft: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  titleCover: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D05A7A',
  },
  line: {
    height: '0.4%',
    backgroundColor: 'grey',
    marginBottom: '5%',
  },
  categories: {
    justifyContent: 'space-between',
  },
  category: {
    aspectRatio: 1, // Mantém a proporção da imagem
  },
});
