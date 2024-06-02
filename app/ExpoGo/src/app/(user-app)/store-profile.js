import { ImageBackground, StyleSheet, Text, View, Dimensions, StatusBar, TouchableOpacity, TextInput } from "react-native";
import ImagesPicker from "../../components/ImagesPicker.js";
import Button from "../../components/Button.js";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function Dashboard({ MarketName, MarketProfileImage, MarketBackgroundImage }) {

  // imagens e nomes para fins de teste do design, podem ser apagados se preciso
  MarketBackgroundImage = require('../assets/apple.png');
  MarketProfileImage = require('../assets/supermercado.png');
  MarketName = "Supermercado Central";

  const [isFolowing, setIsFolowing] = useState(false);

  return (

    <View style={styles.container}>
      <StatusBar
        translucent={true}
        barStyle="light-content"
      />
      <View style={styles.header}>
        <ImageBackground style={styles.backgroundImage} source={require('../assets/apple.png')}>

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
        <TouchableOpacity onPress={() => setIsFolowing(!isFolowing)} style={{marginTop: '2%'}}>
           <Button title={isFolowing? "Seguindo": "Seguir"} ButtonColor={isFolowing? "#7D49CB": ""}/>
        </TouchableOpacity>
        <View style={styles.line} />
        <Text style={styles.subtitle}>Promoções</Text>
        <View style={styles.inputContainer}>
        <Ionicons name="search-outline" size={28} color={'grey'} />
      <TextInput
        style={styles.inputText}
        placeholder="pesquisar"
        placeholderTextColor="grey"
      />
    </View>
        <View style={styles.line} />
      </View>
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
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#CF5A7C",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
    height: height * 0.05,
    width: '50%',
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 5,
    paddingHorizontal: '4%',
  },
  inputText: {
    marginLeft: '10%', // para dar um espaço entre o ícone e o texto
    color: 'grey',
    flex: 1,
  },
  line: {
    width: width,
    height: 2,
    backgroundColor: "#C6C6C6",
    marginVertical: "4%",
  },
});
