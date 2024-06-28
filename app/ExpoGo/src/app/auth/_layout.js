import { Stack, Redirect, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useAuth, useSession } from "../../contexts/ctx";
import GradientBackground from "../../components/gradient";
import { AntDesign } from "@expo/vector-icons";
import { ApiClient } from "../../api/ApiClient";
import * as SecureStore from "expo-secure-store";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#fff", // isso define a cor do botão de voltar e do título para branco
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="user-register/register-user-1"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="user-register/register-user-2"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="user-register/register-user-3"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="store-register/RegisterScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="store-register/RegisterScreen2"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="store-register/RegisterScreen3"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
