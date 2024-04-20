import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export default function TabRoutesLayout() {
    return (
        
        <Tabs>         
            <Tabs.Screen
            name="index"
            options={{  title: "Home", tabBarIcon: ({ size, color }) => <MaterialIcons name="home" size={size} color={color} />, headerShown: false }} />
            <Tabs.Screen
                name="search"
                options={{ title: "Pesquisar", tabBarIcon: ({ size, color }) => <MaterialIcons name="search" size={size} color={color} />, headerShown: false }} />
            <Tabs.Screen
                name="liked"
                options={{ title: "Favoritos", tabBarIcon: ({ size, color }) => <MaterialIcons name="favorite" size={size} color={color} />, headerShown: false }} />
            <Tabs.Screen
                name="profile"
                options={{ title: "Perfil", tabBarIcon: ({ size, color }) => <MaterialIcons name="person" size={size} color={color} />, headerShown: false }} />
        
        </Tabs>
       

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    innerContainer: {
        width: "100%",
        alignItems: "center",
    },
});
