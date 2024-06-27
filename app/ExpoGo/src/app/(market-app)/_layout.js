import { Stack, Redirect, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "../../contexts/ctx";
import { Text } from "react-native";
import SignIn from "../sign-in";
import { ApiClient } from "../../api/ApiClient";
import GradientBackground from "../../components/gradient";

export default function AppLayout() {
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
        }}
      />
      <Stack.Screen
        name="products"
        options={{
          title: "",
          headerBackground: () => <GradientBackground></GradientBackground>,
        }}
      />
      <Stack.Screen
        name="erp"
        options={{
          title: "",
          headerBackground: () => <GradientBackground></GradientBackground>,
        }}
      />
      <Stack.Screen
        name="registerErp"
        options={{
          title: "",
          headerBackground: () => <GradientBackground></GradientBackground>,
        }}
      />
      <Stack.Screen
        name="updateErp"
        options={{
          title: "",
          headerBackground: () => <GradientBackground></GradientBackground>,
        }}
      />
    </Stack>
  );
}
