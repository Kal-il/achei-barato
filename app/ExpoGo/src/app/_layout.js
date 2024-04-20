import { Stack } from 'expo-router/stack';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="promotion" options={{title: "promoção"}} />
      <Stack.Screen name="notification" options={{title: "Notificações"}} />
      <Stack.Screen name="store-profile" options={{title: "perfil do mercado"}} />
      <Stack.Screen name="logout" options={{title: "logout"}} />
      <Stack.Screen name="login" options={{title: "login"}} />
      <Stack.Screen name="edit-location" options={{title: "editar localização"}} />
      <Stack.Screen name="edit-profile" options={{title: "editar perfil"}} />
      <Stack.Screen name="user-configs/configuration" options={{title: "configurações"}} />
      <Stack.Screen name="user-configs/about-us" options={{title: "configurações"}} />
      <Stack.Screen name="user-configs/acount" options={{title: "configurações"}} />
      <Stack.Screen name="user-configs/notifications" options={{title: "configurações"}} />
      <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} />

    </Stack>
  );
}
