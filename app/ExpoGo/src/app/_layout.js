import { Slot } from 'expo-router';
import { SessionProvider } from '../contexts/ctx';

export const unstable_settings = {
  initialRouteName: 'login',
};

export default function RootLayoutNav() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
