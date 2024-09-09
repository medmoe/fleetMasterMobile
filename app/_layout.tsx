import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect} from 'react';
import 'react-native-reanimated';
import {GlobalProvider} from "@/context/GlobalProvider";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
        <GlobalProvider>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}}/>
                <Stack.Screen name="signup" options={{headerShown: false}}/>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                <Stack.Screen name="forms" options={{headerShown: false}}/>
                <Stack.Screen name="details" options={{headerShown: false}}/>
            </Stack>
        </GlobalProvider>


    );
}
