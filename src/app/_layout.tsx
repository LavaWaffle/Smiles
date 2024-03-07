import "../global.css";
import { Stack, SplashScreen } from "expo-router";
// import { useFonts } from "expo-font";
import {
  useFonts,
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_200ExtraLight,
} from "@expo-google-fonts/poppins";

import { Roboto_700Bold } from "@expo-google-fonts/roboto";

import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_300Light,
    Poppins_500Medium,
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_200ExtraLight,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
