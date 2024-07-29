import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import ThemedInputText from "@/components/ThemedInputText";
import ThemedButton from "@/components/ThemedButton";
import {Link} from "expo-router";

const SignUp = () => {
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{height: "100%"}}>
                <View className={"w-full justify-center items-center h-full px-4"}>
                    <View>
                        <Text className={"text-2xl font-merriweather-bold text-center text-txt"}>Welcome to Fleet Master</Text>
                    </View>
                    <View className={"mt-[15px]"}>
                        <Text className={"text-txt text-center font-open-sans"}>Start managing your fleet with ease</Text>
                        <Text className={"text-txt text-center font-open-sans"}>Sign up now to keep track of your fleet and stay organized</Text>
                    </View>
                    <ThemedInputText containerStyles={"bg-white w-full p-5 mt-[15px]"} placeholder={"Your first name"} onChange={() => {
                    }}/>
                    <ThemedInputText containerStyles={"bg-white w-full p-5 mt-[15px]"} placeholder={"Your last name"} onChange={() => {
                    }}/>
                    <ThemedInputText containerStyles={"bg-white w-full p-5 mt-[15px]"} placeholder={"Your email"} onChange={() => {
                    }}/>
                    <ThemedInputText containerStyles={"bg-white w-full p-5 mt-[15px]"} placeholder={"Your phone number"} onChange={() => {
                    }}/>
                    <View className="mt-[15px]">
                        <Text className={"text-txt font-open-sans"}>
                            By continuing you agree to Fleet Master's
                            <Text className="text-secondary"> Terms of service </Text> and
                            <Text className="text-secondary"> privacy policy</Text>
                        </Text>
                    </View>
                    <ThemedButton
                        title={"Continue"}
                        handlePress={() => {
                        }}
                        containerStyles={"w-full mt-[50px] bg-primary"}
                        textStyles={"text-white font-semibold text-base"}
                    />
                    <View className={"mt-[25px]"}>
                        <Text>Already registered? <Link href={"/"} className={"text-secondary font-open-sans"}>Sign in</Link></Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
