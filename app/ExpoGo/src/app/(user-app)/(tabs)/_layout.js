import React, {useState} from "react";
import { Tabs } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from "react-native";
import GradientBackground from '../../../components/gradient';
import { useSession } from '../../../contexts/ctx';
import { Redirect } from 'expo-router';



export default function TabRoutesLayout() {
    const { session, isLoading } = useSession();

    // Se ainda estiver carregando a sessão, exiba uma tela de carregamento
    if (isLoading) {
      console.log("Carregando...");
    }
  
    // Se o usuário não estiver autenticado, redirecione-o para a página de login
    if (!session) {
      console.log("Usuário não autenticado, redirecionando pra tela de login...");
      return <Redirect href="/sign-in" />;
    }

    const [showScreenTab, setShowScreenTab] = useState(true); // Adicione isso no início do seu componente


    return (
        <Tabs screenOptions={{
            tabBarInactiveTintColor: '#fff',
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: '#fff',
            tabBarBackground: () => (
                <GradientBackground ></GradientBackground>
            ),
        }}>s

            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ size, color, focused = false }) => {
                        return focused == false ? <Ionicons name="home-outline" size={28} color={color} /> :
                            <Ionicons name="home" size={32} color={color} />;
                    },
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{ title: "Pesquisar", tabBarIcon: ({ size, color, focused }) => { return focused == false ? <Ionicons name="search-outline" size={28} color={color} /> : <Ionicons name="search" size={34} color={color} />; }, headerShown: false, tabBarShowLabel: false }} />
            <Tabs.Screen
                name="liked"
                options={{ title: "Favoritos", tabBarIcon: ({ size, color, focused }) => { return focused == false ? <MaterialIcons name="favorite-outline" size={28} color={color} /> : <MaterialIcons name="favorite" size={34} color={color} /> }, headerShown: false, tabBarShowLabel: false }} />
           
            <Tabs.Screen
                name="[profile]"
                options={{
                    title: "",
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                    tabBarShowLabel: false,
                    headerStyle: {
                        backgroundColor: '#ABC6FD', // Defina a cor que você deseja aqui
                        elevation: 0,
                    },
                    tabBarIcon: ({ size, color, focused }) => {
                        return focused == false ? <Ionicons name="person-outline" size={28} color={color} /> :
                            <Ionicons name="person" size={32} color={color} />
                    },
                }}
            />

        </Tabs>

    );
}