import { Stack, Redirect } from 'expo-router';
import GradientBackground from '../../components/gradient';
import { Text } from 'react-native';
import React from 'react';
import { useSession } from '../../contexts/authContext';

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // Você pode manter a tela de carregamento aberta ou renderizar uma tela de carregamento como fazemos aqui.
  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  // Exige autenticação dentro do layout do grupo de aplicativos, já que os usuários
  // precisam acessar o grupo de autenticação e fazer login novamente.
  if (!session) {
    // No web, a renderização estática irá parar aqui, pois o usuário não está autenticado
    // no processo Node headless em que as páginas são renderizadas.
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
      }} />    
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
