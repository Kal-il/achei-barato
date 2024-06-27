import { Stack, Redirect, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "../../contexts/ctx";
import { Text } from "react-native";
import SignIn from "../sign-in";
import { ApiClient } from "../../api/ApiClient";
import GradientBackground from "../../components/gradient";
import { AntDesign } from "@expo/vector-icons";

export default function AppLayout() {
  const router = useRouter();
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
              style={{marginRight: 10}}
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
              style={{marginRight: 10}}
            ></AntDesign>
          ),
        }}
      />
    </Stack>
  );
}
