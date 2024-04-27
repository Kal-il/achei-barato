import { StyleSheet, Text, View, TextInput, ScrollView, StatusBar, FlatList } from "react-native";
import { Link } from "expo-router";
import GradientBackground from "../../components/gradient.js";
import ProductCategory from "../../components/ProductCategory.js";
import { useState } from 'react';
import styled from 'styled-components/native';




export default function Dashboard() {

  const [Name, Image, key] = useState([

    { Name: 'Alimentos', Image: require('../../assets/food.png'), id: '1' },
    { Name: 'Higiene', Image: require('../../assets/personClean.png'), id: '2' },
    { Name: 'Limpeza', Image: require('../../assets/clean.png'), id: '3' },
    { Name: 'Pet', Image: require('../../assets/pet.png'), id: '4' },
  ]);

  const Scroll = styled.ScrollView.attrs({
    contentContainerStyle: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

  return (

    <>

      <View style={styles.Header}>
        <GradientBackground style={styles.innerHeader}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Pesquise no achei barato"
              placeholderTextColor="grey" />
          </View>
        </GradientBackground>
      </View>


      <View style={styles.sugestions}>
        <Text style={styles.title}>Sugestões</Text>
      </View>

      <View style={styles.line}><GradientBackground></GradientBackground></View>

      <Text style={styles.title}>Categorias</Text>

      <FlatList
        data={Name}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCategory
            style={styles.category}
            CategoryName={item.Name}
            CategoryImage={item.Image}
          />
        )}
      />

    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight, // Adiciona um preenchimento na parte superior igual à altura da barra de status
  },
  Header: {
    height: '11%',

  },
  innerHeader: {
    flex: 1,
  },
  inputView: {
    paddingTop: StatusBar.currentHeight + 5, // milagre do frontend
    flex: 0.98,
    marginHorizontal: '3%',
    marginBottom: '3%',
  },
  inputText: {
    flex: 0.95,
    color: 'grey',
    paddingLeft: 20,
    backgroundColor: '#fff',
    borderRadius: 24,
  },
  sugestions: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 10,

  },
  line: {
    height: '0.3%',
  },
  category: {
    margin: 100,
  },
});
