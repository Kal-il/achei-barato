import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { Authenticator } from './api/Authenticator';

export const GoogleManager = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile', 'openid'],
      webClientId: process.env.EXPO_PUBLIC_CLIENT_ID,
    });
  }, []);

  const signOut = async () => {
    const signOutWithGoogle = new Authenticator();
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await signOutWithGoogle.cleanUserState();
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfoGoogle = await GoogleSignin.signIn();
      setUserInfo(userInfoGoogle);
      
      const signInWithGoogle = new Authenticator();
      await signInWithGoogle.googleAuthenticateUser(userInfoGoogle);

    } catch (error) {
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

  return { userInfo, signIn, signOut };
};

export const GoogleSignInScreen = () => {
  const { signIn, signOut } = GoogleManager();


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ alignItems:'center' }}>
      <GoogleSigninButton
        style={{ width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn} 
      />

      </View>
      <View>
      <Button
      onPress={signOut}
      title="LogOut"
      color="red">


  </Button>
  </View>
    </View>
    
  );
};

export default GoogleSignInScreen;
