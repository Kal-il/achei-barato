import { Stack } from 'expo-router';
import GradientBackground from '../../components/gradient';


export default function StackLayout() {
    return (<Stack screenOptions={{
        headerTintColor: '#fff', //  isso define a cor do botão de voltar e do título para branco
        headerShadowVisible: false,
      }}>
        <Stack.Screen name = "ReisterScreen"  options={{headerTransparent: true, title: ""}} />

        <Stack.Screen name = "ReisterScreen2" options={{ headerTransparent: true, title: "" }} />

        <Stack.Screen name = "ReisterScreen3" options={{ headerTransparent: true, title: "" }} />
      </Stack>)
}