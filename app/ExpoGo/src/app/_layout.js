import { Stack } from 'expo-router';
import GradientBackground from '../components/gradient';

export default function AppLayout() {
  return (
    <Stack screenOptions={{
      headerTintColor: '#fff', //  isso define a cor do botão de voltar e do título para branco
    }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="promotion" options={{
        title: "promoção",
        headerBackground: () => (
          <GradientBackground ></GradientBackground>
        ),
      }} />
      <Stack.Screen name="notification" options={{title: "Notificações", 
    headerBackground: () => (
      <GradientBackground ></GradientBackground>
    ),}} />
      <Stack.Screen name="store-profile" options={{title: "perfil do mercado",
    headerBackground: () => (
      <GradientBackground ></GradientBackground>
    ),}} />
      <Stack.Screen name="logout" options={{title: "logout",
    headerBackground: () => (
      <GradientBackground ></GradientBackground>
    ),}} />
      <Stack.Screen name="login" options={{title: "login", headerShown: false}} />
      <Stack.Screen name="edit-location" options={{title: "editar localização",}} />
      <Stack.Screen name="edit-profile" options={{title: "editar perfil",}} />
      <Stack.Screen name="configuration" options={{title: "configurações"}} />
      <Stack.Screen name="about-us" options={{title: "Sobre o achei barato"}} />
      <Stack.Screen name="acount" options={{title: "conta"}} />
      <Stack.Screen name="register-client/register-user-1" options={{title: "registrar consumidor"}}/>
      <Stack.Screen name="register-client/register-user-2" options={{title: "registrar consumidor - segunda etapa"}}/>
      <Stack.Screen name="notificationsConfig" options={{title: "notificações"}} />
      <Stack.Screen name="SuperMarkets/RegisterScreen" options={{}} />
      <Stack.Screen name="SuperMarkets/RegisterScreen2"  />
      <Stack.Screen name="SuperMarkets/RegisterScreen3"  />
    </Stack>);}
