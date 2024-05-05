import { Stack } from 'expo-router';
import GradientBackground from '../components/gradient';

export default function AppLayout() {
  return (
    <Stack screenOptions={{
      headerTintColor: '#fff', //  isso define a cor do botão de voltar e do título para branco
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
      <Stack.Screen name="logout" options={{
        title: "logout",
        headerBackground: () => (
          <GradientBackground ></GradientBackground>
        ),
      }} />
      <Stack.Screen name="login" options={{ title: "login", headerShown: false }} />
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
      }}/>
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
      <Stack.Screen name="register-client/register-user-1" options={{ title: "registrar consumidor" }} />
      <Stack.Screen name="register-client/register-user-2" options={{ title: "registrar consumidor - segunda etapa" }} />
      
      <Stack.Screen name="SuperMarkets/RegisterScreen" options={{}} />
      <Stack.Screen name="SuperMarkets/RegisterScreen2" />
      <Stack.Screen name="SuperMarkets/RegisterScreen3" />
      <Stack.Screen
       name="location"
        options={{
           title: "Localização",
           headerTransparent: true,
           }} />
    </Stack>);
}
