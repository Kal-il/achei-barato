import { Stack } from 'expo-router';
import GradientBackground from '../../components/gradient';


export default function StackLayout() {
    return (<Stack screenOptions={{
        headerTintColor: '#fff', //  isso define a cor do botão de voltar e do título para branco
        headerShadowVisible: false,
      }}>
        <Stack.Screen name = "RegisterScreen"  options={{headerTransparent: true, title: ""}} />

        <Stack.Screen name = "RegisterScreen2" options={{ headerTransparent: true, title: "" }} />

        <Stack.Screen name = "RegisterScreen3" options={{ headerTransparent: true, title: "" }} />
      </Stack>)
}