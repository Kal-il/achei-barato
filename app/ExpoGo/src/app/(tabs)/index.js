import React from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Image, Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';
import FavoriteButton from "../../components/favoriteButton";
import CardPromotion from "../../components/CardComponent";

import { LinearGradient } from "expo-linear-gradient";

const windowDimensions = Dimensions.get('window');
const windowWidth = windowDimensions.width;
const Height = '100%';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#A9C6FC', '#F67235']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.innerHeader}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Pesquise no achei barato"
              placeholderTextColor="grey"
            />
          </View>

          <View style={styles.notification}>
            <Link href={"/notification"}>
              <Feather style={styles.bell} name="bell" size={24} color="grey" />
            </Link>
          </View>

        </View>
      </LinearGradient>

      <ScrollView>
        <ScrollView style={[styles.Scrolpromocoes, { height: 180 }]} horizontal={true}>
          <Image source={require('../../assets/promodebatata.jpeg')} style={{ width: windowWidth, height: Height, flex: 1 }} />
          <Image source={require('../../assets/promodebatata.jpeg')} style={{ width: windowWidth, height: Height }} />
          <Image source={require('../../assets/logo.png')} style={{ width: windowWidth, height: Height }} />
        </ScrollView>



        <ScrollView>
          <View style={styles.viewLocalizacao}>
            <Text style={styles.textLocalization}>Localização</Text>
          </View>
          <CardPromotion 
          promotionName={"Batata"} 
          promotionPrice={"R$ 05,00"} 
          tag = {"Mais Barato"} 
          imageSource={require('../../assets/banana.png')}
          storeProfile={require('../../assets/supermercado.png')}
          />

          {/* <Link href="/promotion">Promoção</Link>
        
        <Link href={"/login"}>login</Link>
        <Link href={"/StoreRegister/RegisterScreen"}>tela de registro de mercado</Link>
        */}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
  },
  innerHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: "row",
    padding: '4%',
    marginTop: '6%',
    flex: 1,
  },
  inputView: {
    flex: 1,
    marginRight: '5%',
  },
  inputText: {
    flex: 1,
    color: 'grey',
    paddingLeft: 20,
    backgroundColor: '#fff',
    borderRadius: 24,
  },
  notification: {
    aspectRatio: 1, // Mantém a proporção
    backgroundColor: '#fff',
    padding: '3%',
    borderRadius: 100,//é um circulo
  },
  Scrolpromocoes: {
    flex: 1,
  },
  viewLocalizacao: {
    backgroundColor: '#F67439',
    paddingVertical: 5,
    alignItems: 'center',
  },
  textLocalization: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
