import { Slot } from "expo-router";
import { SessionProvider } from "../contexts/ctx";

export default function RootLayoutNav() {
  return (
    <SessionProvider >
      <Slot />
    </SessionProvider>
  );
}