import { Link } from 'expo-router';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Image, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import FavoriteButton from '../components/favoriteButton';
import BottomSheet from 'reanimated-bottom-sheet';

const { height, width } = Dimensions.get('window');

export default function PromotionPage({
  imageSource,
  MarketImageProfile,
  MarketName,
  MarketProfileLink,
  PromotionName,
  OldPrice,
  Price,
  tag,
  PromotionLink,
  CommentsNumber,
  LikesNumber }) {

    const renderContent = () => (
      <View style={styles.bottomSheetContent}>
        {/* Aqui você pode colocar as informações do produto, como nome, mercado que postou, preço anterior, preço, e a aba de comentários */}
      </View>
    );
  
    const sheetRef = React.useRef(null);
  
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {/* Aqui você pode colocar o ScrollView horizontal de imagens do produto */}
        </View>
        <BottomSheet
          ref={sheetRef}
          snapPoints={['50%', '100%']}
          borderRadius={10}
          renderContent={renderContent}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageContainer: {
      height: Dimensions.get('window').height * 0.5,
    },
    bottomSheetContent: {
      backgroundColor: 'white',
      padding: 16,
      height: Dimensions.get('window').height * 0.5,
    },
  });