import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { TouchableOpacity, Text} from 'react-native';

export const signOut = async () => {
  console.log('Deslogando usuário');
  try {
    await GoogleSignin.signOut();
    console.log('Usuário deslogado');

  } catch (error) {
    console.error(error);
  }

};

  export const getCurrentUser = async () => {
    const currentUser = GoogleSignin.getCurrentUser();
    setState({ currentUser });
  };


export const signIn = async () => {
  try {
    console.log(process.env.EXPO_PUBLIC_CLIENT_ID);
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    console.log('Usuário logado:', userInfo);
  } catch (error) {
      // ISSO AQUI E PARA TESTAR E VER OQ UE TA ACOMTECENDO tratamento de erro
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('Login cancelado');
    } else if (error.code === statusCodes.IN_PROGRESS) {

      console.log('Login em progresso');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Google Play Services não disponível');
    } else {
      console.log('Erro ao fazer login:', error);

    }
  }
};

export const GoogleSignInScreen = () => {
  useEffect(() => {
    console.log(process.env.EXPO_PUBLIC_CLIENT_ID);
    GoogleSignin.configure({
      scopes: ['email', 'profile', 'openid'], 
      webClientId: process.env.EXPO_PUBLIC_CLIENT_ID, 
    });
  }, []);


  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />


    </View>
  );
};

export default GoogleSignInScreen;
