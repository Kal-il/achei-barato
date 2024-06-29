import { Stack, Redirect, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useAuth, useSession } from "../../contexts/ctx";
import GradientBackground from "../../components/gradient";

export default function AppLayout() {

	const { isMercado, user } = useAuth();
	const router = useRouter()

  if (user === undefined) {
    setTimeout(() => {
      if (isMercado == "mercado") {
        console.log("é mercado");
        router.push("/market-index");
      }

      if (isMercado == "deslogado") {
        console.log("deslogado");
        router.push("/sign-in");
      }

	  if (isMercado == "") {
		router.push("/sign-in");
	  }
    }, 5000);
  }

  return (
    <Stack
      screenOptions={{
        headerTintColor: "#fff", // isso define a cor do botão de voltar e do título para branco
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="notification"
        options={{
          title: "Notificações",
          headerBackground: () => <GradientBackground></GradientBackground>,
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
        name="post/[id]"
        options={{
          title: "",
          headerTransparent: true,
          headerBackground: () => <GradientBackground></GradientBackground>,
        }}
      />
      <Stack.Screen
        name="promotion/[id]"
        options={{
          title: "Promoção",
          headerTransparent: true,
          headerBackground: () => <GradientBackground></GradientBackground>,
        }}
      />
      <Stack.Screen
        name="market/[id]"
        options={{
          title: "",
          headerTransparent: true,
          headerBackground: () => <GradientBackground></GradientBackground>,
        }}
      />
    </Stack>
  );
}
