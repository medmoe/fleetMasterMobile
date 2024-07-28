import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    MerriweatherBold: require('../assets/fonts/Merriweather-Bold.ttf'),
    MerriweatherRegular: require("../assets/fonts/Merriweather-Regular.ttf"),
    Montserrat: require("../assets/fonts/Montserrat[wght].ttf"),
    OpenSans: require("../assets/fonts/OpenSans[wdth,wght].ttf"),
    Roboto: require("../assets/fonts/Roboto[wdth,wght].ttf"),
    RobotoItalic: require("../assets/fonts/Roboto-Italic[wdth,wght].ttf"),
    SourceCodePro: require("../assets/fonts/SourceCodePro[wght].ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  return (
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
      </Stack>
  );
}
