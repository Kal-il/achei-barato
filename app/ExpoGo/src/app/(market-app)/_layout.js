import { Stack } from 'expo-router';
import GradientBackground from '../../components/gradient.js';


export default function StackLayout() {
  
    return (<Stack screenOptions={{
        headerTintColor: '#fff', //  isso define a cor do botão de voltar e do título para branco
        headerShadowVisible: false,
      }}>
        <Stack.Screen name = "RegisterScreen"  options={{headerTransparent: true, title: ""}} />

        <Stack.Screen name = "RegisterScreen1" options={{ headerTransparent: true, title: "" }} />


        <Stack screenOptions={{
      headerTintColor: '#fff', //  isso define a cor do botão de voltar e do título para branco
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="register-client" options={{ headerShown: false }} />
      <Stack.Screen name="SuperMarkets" options={{headerShown: false}} />
      <Stack.Screen name="login" options={{headerShown: false}} />

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
      </Stack>)
}