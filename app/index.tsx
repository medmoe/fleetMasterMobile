import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import {images} from "@/constants/images";
import ThemedButton from "@/components/ThemedButton";
import ThemedInputText from "@/components/ThemedInputText";
import {icons} from "@/constants/icons";

const App = () => {
    return (
        <SafeAreaView className="bg-background hl-full">
            <ScrollView contentContainerStyle={{height: "100%"}}>
                <View className="w-full justify-center items-center h-full px-4">
                    <Image source={images.logo} className="w-[140px] h-[140px]"/>
                    <View className="relative mt-5">
                        <Text className="text-2xl text-txt font-merriweather-bold text-center">Welcome to Fleet Master</Text>
                    </View>
                    <View className="relative mt-5">
                        <Text className="text-txt text-center font-open-sans">Sign in to manage your fleet</Text>
                    </View>
                    <ThemedInputText
                        containerStyles={"bg-white w-full p-5 mt-[30px]"}
                        placeholder={"Enter Your Email"}
                        onChange={() => {
                        }}
                    />
                    <ThemedInputText
                        containerStyles={"bg-white w-full p-5 mt-[15px]"}
                        placeholder={"Enter your password"}
                        onChange={() => {
                    }}/>
                    <ThemedButton
                        title="Log in"
                        handlePress={() => {
                        }}
                        containerStyles="w-full mt-[50px] bg-primary"
                        textStyles={"text-white font-semibold text-base"}
                    />
                    <View className={"mt-[50px]"}>
                        <Text className={"text-txt font-open-sans"}>
                            Don't have an account? <Text className={"text-secondary font-open-sans"}>Create account</Text>
                        </Text>
                    </View>
                    <ThemedButton
                        title={"Log in with Google"}
                        handlePress={() => {}}
                        containerStyles={"w-full bg-white mt-[50px]"}
                        icon={icons.google}
                    />
                    <ThemedButton
                        title={"Log in with Apple"}
                        handlePress={() => {}}
                        containerStyles={"w-full bg-white mt-[15px]"}
                        icon={icons.apple}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
