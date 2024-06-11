import { ScrollView, ImageBackground, StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, TextInput } from "react-native";
import ImagesPicker from "../../components/ImagesPicker.js";
import Button from "../../components/Button.js";
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import Product from "../../components/Product.js";

const { width, height } = Dimensions.get('window');

export default function Dashboard({ MarketName, MarketProfileImage, MarketBackgroundImage }) {

  // imagens e nomes para fins de teste do design, podem ser apagados se preciso
  MarketBackgroundImage = require('../../assets/apple.png');
  MarketProfileImage = require('../../assets/supermercado.png');
  MarketName = "Supermercado Central";

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        barStyle="light-content"
      />
      <View style={styles.header}>
        <ImageBackground style={styles.backgroundImage} source={require('../../assets/apple.png')}>

        </ImageBackground>
        <View style={styles.ProfileImage}>
          <ImagesPicker
            imageSize={0.16}
            ImageHolder={MarketProfileImage}
            ImageBorderRadius={100} />
        </View>
      </View>

      <View style={styles.main}>
        <Text style={styles.title}>{MarketName}</Text>
        <Text style={styles.sectionTitle}>Produtos</Text>
        <View style={styles.line} />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#000AFF' }]}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <Text style={styles.smallBoldText}>Cadastrar novos produtos</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#FF0000' }]}>
              <Text style={styles.buttonText}>Promoção</Text>
            </TouchableOpacity>
            <Text style={styles.smallBoldText}>Cadastrar novas promoções</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.inputContainer}>
          <Ionicons name="search-outline" size={28} color={'grey'} />
          <TextInput
            style={styles.inputText}
            placeholder="Pesquisar"
            placeholderTextColor="grey"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.productsContainer}>
        <Product
          ProductInfo={require('../../assets/food.png')}
        />
        <Product
          ProductInfo={require('../../assets/food.png')}
        />
        <Product
          ProductInfo={require('../../assets/food.png')}
        />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  main: {
    maxWidth: 960,
    marginHorizontal: "auto",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  header: {
    width: width,
    height: height / 3.5,
    alignItems: "center",
    overflow: 'hidden',
  },
  backgroundImage: {
    width: width,
    height: height / 4.5,
    position: 'absolute',
  },
  ProfileImage: {
    position: 'absolute',
    top: height / 9,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5A6BA9",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#CF5A7C",
    marginTop: '4%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginTop: '2%',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  smallBoldText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '1%',
    marginBottom: '2%',
    height: '13%',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: '4%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputText: {
    marginLeft: '10%',
    color: 'grey',
    flex: 1,

  },
  line: {
    width: width,
    height: 2,
    backgroundColor: "#C6C6C6",
    marginVertical: "2%",
  },
  productsContainer: {
    alignItems: 'center',
    paddingBottom: 20, // adicionado para espaço extra no final
  },
});
