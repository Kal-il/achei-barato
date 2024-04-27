import { Link } from 'expo-router';
import React from 'react';
import { View, Image, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import FavoriteButton from './favoriteButton';


const CardPromotion = ({ imageSource, storeProfile, promotionName, promotionPrice, tag }) => {
  return (
    <Link href={"../app/promotion.js"} asChild>
      <View style={styles.cardPromotion}>

        <ImageBackground source={imageSource} style={styles.imagePromotion}>

          <View style={{
            alignItems: 'center',
            justifyContent: 'space-between', flexDirection: 'row', marginEnd: 10
          }}>
            <Link href={"/store-profile"} asChild>
              <TouchableOpacity>
                <Image source={storeProfile} style={styles.storeProfile} />
              </TouchableOpacity>
            </Link>

            <View style={styles.orange_tag}>
              <Text style={styles.bold_text}>{tag}</Text>
            </View>
          </View>

          <View style={styles.innerCardPromotion}>
            
            <View style={styles.Nametag}>
              <Text style={styles.productName} numberOfLines={1}>{promotionName}</Text>
            </View>
            <View style={styles.Pricetag}>
              <Text style={styles.productPrice} numberOfLines={1}>{promotionPrice}</Text>
            </View>
            <FavoriteButton></FavoriteButton>
          </View>

        </ImageBackground>
      </View>
    </Link>
  
  );
};

const styles = StyleSheet.create({
  cardPromotion: {
    height: 200,
    margin: 10,
    borderRadius: 16,
    overflow: 'hidden',
  },
  imagePromotion: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
  },
  storeProfile: {
    margin: 10,
    aspectRatio: 1,
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
  },
  innerCardPromotion: {
    padding: '3%',
    height: '30%',
    backgroundColor: '#000000a0',
    flexDirection: 'row',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Nametag: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '55%',
  },
  productName: {
    color: 'black',
    fontWeight: 'normal',
    fontSize: 20,
  },
  Pricetag: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
  },
  productPrice: {
    color: 'red',
    fontWeight: '900',
    fontSize: 20,
  },
  orange_tag: {
    backgroundColor: '#FF081C',
    padding: 5,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bold_text: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 20,
    padding: 1,
  },
});

export default CardPromotion;