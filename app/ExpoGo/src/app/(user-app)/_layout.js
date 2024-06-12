import { Stack, Redirect, useRouter } from 'expo-router';
import React from 'react';
import { useSession } from '../../contexts/ctx';
import { Text } from 'react-native';
import SignIn from '../sign-in';

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // Se ainda estiver carregando a sessão, exiba uma tela de carregamento
  if (isLoading) {
    console.log("Carregando...");
  }

  // Se o usuário não estiver autenticado, redirecione-o para a página de login
  if (!session) {
    console.log("Usuário não autenticado, redirecionando pra tela de login...");
    return <Redirect href="/sign-in" />;
  }

  
  return (
    <Stack screenOptions={{
      headerTintColor: '#fff', // isso define a cor do botão de voltar e do título para branco
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="register-client" options={{ headerShown: false }} />
      <Stack.Screen name="SuperMarkets" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />

      <Stack.Screen name="promotion" options={{
        title: "promoção",
        headerBackground: () => (
          <GradientBackground ></GradientBackground>
        ),
      }} />
      <Stack.Screen name="notification" options={{
        title: "Notificações",
        headerBackground: () => (
          <GradientBackground ></GradientBackground>
        ),
      }} />
      <Stack.Screen name="store-profile" options={{
        title: "perfil do mercado",
        headerTransparent: true,
      }}/>    
      <Stack.Screen
        name="edit-location"
        options={{
          elevation: 0,
          title: "Editar Localização",
          headerStyle: {
            backgroundColor: '#ABC6FD', // Defina a cor que você deseja aqui
            // Remova a sombra no Android
            shadowOpacity: 0, // Remova a sombra no iOS

          },
        }} />
      <Stack.Screen
        name="edit-profile"
        options={{
          elevation: 0,
          title: "Editar perfil",
          headerStyle: {
            backgroundColor: '#ABC6FD', // Defina a cor que você deseja aqui
            // Remova a sombra no Android
            shadowOpacity: 0, // Remova a sombra no iOS

          },
        }}
      />
      <Stack.Screen
        name="configuration"
        options={{
          title: "configurações",
          headerTransparent: true, // Torna o cabeçalho transparente
        }}
      />
      <Stack.Screen
        name="about-us"
        options={{
          title: "Sobre o achei barato",
          headerTransparent: true, // Torna o cabeçalho transparente
        }} />
      <Stack.Screen
        name="acount"
        options={{
          title: "conta",
          headerTransparent: true, // Torna o cabeçalho transparente
        }} />
      <Stack.Screen
        name="notificationsConfig"
        options={{
          title: "notificações",
          headerTransparent: true, // Torna o cabeçalho transparente
        }} />
      <Stack.Screen
        name="location"
        options={{
          title: "Localização",
          headerTransparent: true,
        }} />
        <Stack.Screen
        name="ProductsAndPromotions"
        options={{
          title: "Produtos",
          headerTransparent: true,
        }} />
    </Stack>
  );
}
