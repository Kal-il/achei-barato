import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from "react-native";
import GradientBackground from '../../components/gradient';


export default function TabRoutesLayout() {
    return (
        <Tabs screenOptions={{
            tabBarInactiveTintColor: '#fff',
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: '#fff',
            tabBarBackground: () => (
                <GradientBackground ></GradientBackground>
            ),
        }}>

            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ size, color, focused = false }) => { return focused == false ? <Ionicons name="home-outline" size={28} color={color} /> : <Ionicons name="home" size={32} color={color} />; },
                    headerShown: false, tabBarShowLabel: false
                }}
            />
            <Tabs.Screen
                name="search"
                options={{ title: "Pesquisar", tabBarIcon: ({ size, color, focused }) => { return focused == false ? <Ionicons name="search-outline" size={28} color={color} /> : <Ionicons name="search" size={34} color={color} />; }, headerShown: false, tabBarShowLabel: false }} />
            <Tabs.Screen
                name="liked"
                options={{ title: "Favoritos", tabBarIcon: ({ size, color, focused }) => { return focused == false ? <MaterialIcons name="favorite-outline" size={28} color={color} /> : <MaterialIcons name="favorite" size={34} color={color} /> }, headerShown: false, tabBarShowLabel: false }} />
            <Tabs.Screen
                name="profile"
                options={{ title: "Perfil", tabBarIcon: ({ size, color, focused }) => { return focused == false ? <Ionicons name="person-outline" size={28} color={color} /> : <Ionicons name="person" size={32} color={color} /> }, headerShown: false, tabBarShowLabel: false }} />

        </Tabs>

    );
}