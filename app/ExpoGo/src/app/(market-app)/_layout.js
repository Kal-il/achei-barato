import { Stack, Redirect, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useAuth, useSession } from "../../contexts/ctx";
import GradientBackground from "../../components/gradient";
import { AntDesign } from "@expo/vector-icons";
import { ApiClient } from "../../api/ApiClient";
import * as SecureStore from "expo-secure-store";

export default function AppLayout() {
  const { isMercado, signOut } = useAuth();
  const router = useRouter();
  const api = new ApiClient();

  const checkMercadoIsCreated = async () => {
    try {
      await api.getMercadoUsuario();
    } catch (e) {
      if (e.response) {
        if (e.response.status == 404) {
          console.log("usuario existe, mas mercado não.");
          SecureStore.setItem(
            "mensagem",
            "Você ainda não finalizou o seu cadastro!"
          );
          router.replace("/auth/store-register/RegisterScreen2");
        } else if (e.response.status == 401) {
          console.log('oi')
          signOut()
          router.replace("/sign-in");
        }
      }
    }
  };

  if (isMercado == "consumidor") {
    console.log("é consumidor");
    router.replace("/home");
  }

  if (isMercado == "deslogado") {
    console.log("deslogado");
    router.replace("/sign-in");
  }

  if (isMercado == "mercado") {
    checkMercadoIsCreated();
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
        name="sales"
        options={{
          title: "",
          headerBackground: () => <GradientBackground></GradientBackground>,
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="white"
              onPress={() => router.replace("/market-index")}
            ></AntDesign>
          ),
        }}
      />
      <Stack.Screen
        name="products"
        options={{
          title: "",
          headerBackground: () => <GradientBackground></GradientBackground>,
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="white"
              onPress={() => router.replace("/market-index")}
            ></AntDesign>
          ),
        }}
      />
      <Stack.Screen
        name="registerProduct"
        options={{
          title: "",
          headerBackground: () => <GradientBackground></GradientBackground>,
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="white"
              onPress={() => router.replace("/market-index")}
            ></AntDesign>
          ),
        }}
      />
      <Stack.Screen
        name="erp"
        options={{
          title: "",
          headerBackground: () => <GradientBackground></GradientBackground>,
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="white"
              onPress={() => router.replace("/market-index")}
            ></AntDesign>
          ),
        }}
      />
      <Stack.Screen
        name="registerErp"
        options={{
          title: "",
          headerBackground: () => <GradientBackground></GradientBackground>,
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="white"
              onPress={() => router.replace("/erp")}
            ></AntDesign>
          ),
        }}
      />
      <Stack.Screen
        name="registerSales"
        options={{
          title: "",
          headerBackground: () => <GradientBackground></GradientBackground>,
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="white"
              onPress={() => router.replace("/sales")}
            ></AntDesign>
          ),
        }}
      />
      <Stack.Screen
        name="updateErp"
        options={{
          title: "",
          headerBackground: () => <GradientBackground></GradientBackground>,
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="white"
              onPress={() => router.replace("/erp")}
            ></AntDesign>
          ),
        }}
      />
      <Stack.Screen
          name="syncErp"
        options={{
          title: "",
          headerBackground: () => <GradientBackground></GradientBackground>,
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="white"
              onPress={() => router.replace("/erp")}
            ></AntDesign>
          ),
        }}
      />
      <Stack.Screen
        name="sale/[id]"
        options={{
          title: "",
          headerTransparent: true,
          headerBackground: () => <GradientBackground></GradientBackground>,
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="white"
              onPress={() => router.replace("/sales")}
            ></AntDesign>
          ),
        }}
      />
      <Stack.Screen
        name="sale/create"
        options={{
          title: "Cadastrar Promoção",
          headerTransparent: true,
          headerBackground: () => <GradientBackground></GradientBackground>,
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="white"
              onPress={() => router.replace("/sales")}
            ></AntDesign>
          ),
        }}
      />
      <Stack.Screen
        name="store/edit-profile"
        options={{
          title: "Editar Perfil",
          headerTransparent: true,
          headerBackground: () => <GradientBackground></GradientBackground>,
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="white"
              onPress={() => router.replace("/market-profile")}
              style={{ marginRight: 10 }}
            ></AntDesign>
          ),
        }}
      />
      <Stack.Screen
        name="store/edit-location"
        options={{
          title: "Editar Perfil",
          headerTransparent: true,
          headerBackground: () => <GradientBackground></GradientBackground>,
          headerLeft: () => (
            <AntDesign
              name="arrowleft"
              size={24}
              color="white"
              onPress={() => router.replace("/market-profile")}
              style={{ marginRight: 10 }}
            ></AntDesign>
          ),
        }}
      />
      <Stack.Screen
        name="store/logout"
        options={{
          title: "",
          headerTransparent: true,
          headerBackground: () => <GradientBackground></GradientBackground>,
        }}
      />
    </Stack>
  );
}
