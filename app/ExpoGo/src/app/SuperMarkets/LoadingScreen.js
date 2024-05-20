import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // Navegar para a tela inicial se o usuário estiver autenticado, caso contrário, navegar para a tela de login
    navigation.replace(userToken ? 'Home' : 'Login');
  };

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}