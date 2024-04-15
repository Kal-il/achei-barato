import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { CLIENT_ID } from './Config';
const GoogleSignInScreen = () => {
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile', 'openid'], 
      webClientId: CLIENT_ID, 
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Usuário logado:', userInfo);
    } catch (error) {
        // ISSO AQUI E PARA TESTAR E VER OQ UE TA ACOMTECENDO 
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
