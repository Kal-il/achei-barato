import React, { useState } from "react";
import { Tabs } from "expo-router";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import GradientBackground from "../../../components/gradient";

export default function TabRoutesLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "#fff",
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#fff",
        tabBarBackground: () => <GradientBackground></GradientBackground>,
      }}
    >
      <Tabs.Screen
        name="market-index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color, focused = false }) => {
            return focused == false ? (
              <Ionicons name="home-outline" size={28} color={color} />
            ) : (
              <Ionicons name="home" size={32} color={color} />
            );
          },
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="market-profile"
        options={{
          title: "",
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          tabBarShowLabel: false,
          headerStyle: {
            backgroundColor: "#ABC6FD", // Defina a cor que você deseja aqui
            elevation: 0,
          },
          tabBarIcon: ({ size, color, focused }) => {
            return focused == false ? (
              <Ionicons name="person-outline" size={28} color={color} />
            ) : (
              <Ionicons name="person" size={32} color={color} />
            );
          },
        }}
      />
    </Tabs>
  );
}
