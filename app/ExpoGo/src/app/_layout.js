import React from 'react';
import { Slot, useRouter } from 'expo-router'; // Certifique-se de importar Slot de 'expo-router'
import { SessionProvider, useSession } from '../contexts/ctx'; // Importe o hook useSession

export default function Root() {
  const { isAuthenticated } = useSession(); // Use o hook useSession
  const router = useRouter();

  // Verifique se o usuário está autenticado e redirecione-o para a página inicial, se necessário
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/(user-app)/(tabs)/index'); // Redireciona para a página inicial
    }
  }, [isAuthenticated, router]);

  return (
    <Stack
      screenOptions={{
        headerTintColor: "#fff", //  isso define a cor do botão de voltar e do título para branco
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="register-client" options={{ headerShown: false }} />
      <Stack.Screen name="SuperMarkets" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />

      <Stack.Screen
        name="promotion"
        options={{
          title: "promoção",
          headerBackground: () => <GradientBackground></GradientBackground>,
        }}
      />
      <Stack.Screen
        name="notification"
        options={{
          title: "Notificações",
          headerBackground: () => <GradientBackground></GradientBackground>,
        }}
      />
      <Stack.Screen
        name="store-profile"
        options={{
          title: "perfil do mercado",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="edit-location"
        options={{
          elevation: 0,
          title: "Editar Localização",
          headerStyle: {
            backgroundColor: "#ABC6FD", // Defina a cor que você deseja aqui
            // Remova a sombra no Android
            shadowOpacity: 0, // Remova a sombra no iOS
          },
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          elevation: 0,
          title: "Editar perfil",
          headerStyle: {
            backgroundColor: "#ABC6FD", // Defina a cor que você deseja aqui
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
        }}
      />
      <Stack.Screen
        name="acount"
        options={{
          title: "conta",
          headerTransparent: true, // Torna o cabeçalho transparente
        }}
      />
      <Stack.Screen
        name="notificationsConfig"
        options={{
          title: "notificações",
          headerTransparent: true, // Torna o cabeçalho transparente
        }}
      />
      <Stack.Screen
        name="location"
        options={{
          title: "Localização",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ProductsAndPromotions"
        options={{
          title: "Produtos",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="createPost"
        options={{
          title: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="post/[id]"
        options={{
          title: "",
          headerTransparent: true,
          headerBackground: () => <GradientBackground></GradientBackground>,
        }}
      />
    </Stack>
  );
}