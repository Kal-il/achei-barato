import { View, Text, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import React from 'react';
import { Link } from "expo-router";
import TransparentGradientBackground from './TransparentGradient';

const { width, height } = Dimensions.get('window'); //essa função retorna o tamanho da tela do dispositivo


const ProductCategory = ({CategoryName, CategoryImage}) => {
    
    return (
        <View style={{justifyContent: 'space-between', marginVertical: '5%', marginHorizontal: '5%', marginLeft: '8.5%'}}>
            <ImageBackground source={CategoryImage} style={styles.imageBG}>
            <View style={styles.Card}>
                <TransparentGradientBackground style={styles.innerCard}>
                    <Text style={styles.categoryName}>{CategoryName}</Text>
                </TransparentGradientBackground>
            </View>
        </ImageBackground>
        </View>
        

    )
}

const styles = StyleSheet.create({

    imageBG: {
        width: width * 0.32,//calcula a largura da imagem de acordo com a largura da tela
        height: height * 0.15,//calcula a altura da imagem de acordo com a altura da tela
        borderRadius: 16,
        //borderWidth: 1,
        borderColor: '#F67235',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        aspectRatio: 1,
    },
    Card: {
        height: '30%',
        overflow: 'hidden',
        justifyContent: 'center',

    },
    innerCard: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryName: {
        padding: 7,
        alignSelf: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    }
})

export default ProductCategory;