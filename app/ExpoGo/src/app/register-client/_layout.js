import { Stack } from 'expo-router';
import GradientBackground from '../../components/gradient';


export default function StackLayout() {
    <Stack screenOptions={{
        headerTintColor: '#fff', //  isso define a cor do botão de voltar e do título para branco
        //headerShadowVisible: false,
      }}>
        <Stack.Screen name = "register-user-1"  options={{headerTransparent: true, title: ""}} />

        <Stack.Screen name = "register-user-2" options={{ headerTransparent: true, title: "" }} />

        <Stack.Screen name = "register-user-3" options={{ headerTransparent: true, title: "" }} />
      </Stack>
}