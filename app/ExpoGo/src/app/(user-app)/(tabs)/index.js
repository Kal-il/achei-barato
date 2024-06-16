import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { Link } from "expo-router";
import { Feather, FontAwesome } from '@expo/vector-icons';
import PromotionCard from "../../../components/PromotionCard.js";
import GradientBackground from "../../../components/gradient.js";
import { Authenticator } from "../../../api/Authenticator.js";

const windowDimensions = Dimensions.get('window');
const windowWidth = windowDimensions.width;
const { height, width } = Dimensions.get('window');
const Height = '100%';

export default function Dashboard() {


  const [data, setData] = useState([
    {
      imageSource: require('../../../assets/apple.png'),
      MarketImageProfile: require('../../../assets/supermercado.png'),
      MarketName: "Supermercado Central",
      OldPrice: "R$ 15,99",
      Price: "R$ 10,49",
      PromotionLink: '/promotion',
      PromotionName: "Maçã",
      tag: "Promoção",
      CommentsNumber: "20",
      LikesNumber: 15,
      MarketProfileLink: '/store-profile',
      id: '1'
    },
  ]);

  const renderCategory = ({ item }) => (
    <PromotionCard
      MarketImageProfile={item.MarketImageProfile}
      imageSource={item.imageSource}
      MarketName={item.MarketName}
      OldPrice={item.OldPrice}
      Price={item.Price}
      PromotionLink={item.PromotionLink}
      PromotionName={item.PromotionName}
      tag={item.tag}
      CommentsNumber={item.CommentsNumber}
      LikesNumber={item.LikesNumber}
      MarketProfileLink={item.MarketProfileLink} />
  );


  return (

    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <GradientBackground>
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
        </GradientBackground>
      </View>


      <FlatList
        data={data}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <ScrollView style={{ zIndex: 0 }}>

            <ScrollView style={[styles.Scrolpromocoes, { height: 180 }]} horizontal={true}>
              <Image source={require('../../../assets/promodebatata.jpeg')} style={{ width: windowWidth, height: Height, flex: 1 }} />
              <Image source={require('../../../assets/promodebatata.jpeg')} style={{ width: windowWidth, height: Height }} />
              <Image source={require('../../../assets/logo.png')} style={{ width: windowWidth, height: Height }} />
            </ScrollView>

            <View style={styles.viewLocalizacao}>
              <Text style={styles.textLocalization}>Localização</Text>
            </View>

            <View style={{ alignContent: 'center', alignItems: 'center' }}>



            </View>



          </ScrollView>
        } />
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '11%',
  },
  innerHeader: {
    paddingTop: StatusBar.currentHeight + 5, // milagre do frontend
    alignItems: 'flex-end',
    alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection: "row",
    padding: '2%',
  },
  inputView: {
    flex: 0.95, //isso faz com que a barra de pesquisa se expanda verticalmente por 95% da header
  },
  inputText: {
    height: height * 0.05,
    color: 'grey',
    paddingLeft: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  notification: {
    height: height * 0.05,
    aspectRatio: 1, // Mantém a proporção
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
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
