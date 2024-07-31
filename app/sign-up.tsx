import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import ThemedInputText from "@/components/ThemedInputText";
import ThemedButton from "@/components/ThemedButton";
import {Link, useRouter} from "expo-router";
import {API} from "@/constants/endpoints";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

export type FormState = {
    user: {
        firstname?: string;
        lastname?: string;
        username: string;
        email: string;
        password: string;
    },
    phone?: string,
    address?: string,
    city?: string,
    state?: string,
    country?: string,
    zip_code?: string,
}

const SignUp = () => {
    const router = useRouter();
    const api = axios.create({baseURL: `${API}`})
    const [formState, setFormState] = useState<FormState>({
        user: {
            username: "",
            email: "",
            password: "",
        }
    })
    const [password, setpassword] = useState<string>("")
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }
    const saveToken = async (key: string, value: string) => {
        await SecureStore.setItemAsync(key, value);
    }
    const getToken = async (key: string) => {
        await SecureStore.getItemAsync(key);
    }
    const handleChange = (name: string, value: string) => {
        setFormState((prevState) => {
            if (name in prevState.user) {
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        [name]: value,
                    }
                }
            } else {
                return {
                    ...prevState,
                    [name]: value,
                }
            }
        })
    };
    const updatePassword = (name: string, value: string) => {
        setpassword(value)
    }
    const submitForm = async () => {
        try {
            // Validate password
            if (formState.user.password !== password) {
                Alert.alert("Error", "Password didn't match!");
                return;
            }

            // Validate email
            if (!validateEmail(formState.user.email)) {
                Alert.alert("Error", "Invalid email address!");
                return;
            }

            // Make the API call
            const response = await api.post(`signup/`, formState, {
                headers: {'Content-Type': 'application/json'}
            });

            // Extract tokens from response headers
            let cookies: string[] = []
            if (response.headers["set-cookie"]) {
                cookies = response.headers["set-cookie"][0].split(",")
                cookies.forEach((cookie) => {
                    if (cookie.startsWith("refresh=")) {
                        saveToken("refresh", cookie.split(";")[0].split('=')[1])
                    }
                    if (cookie.startsWith("access=")) {
                        saveToken("access", cookie.split(";")[0].split("=")[1])
                    }
                })
            }
            // Navigate to dashboard
            router.push("/(tabs)/dashboard");

        } catch (error) {
            // Handle errors
            const errorMessage = handleError(error);
            Alert.alert('Error', errorMessage);
        }
    };


    const handleError = (error: any): string => {
        if (error.response) {
            console.error('Error response data:', error.response.data);
            const errorMessages = [];
            if (error.response.data.user) {
                for (const key in error.response.data.user) {
                    if (error.response.data.user[key]) {
                        errorMessages.push(...error.response.data.user[key]);
                    }
                }
            }
            return errorMessages.join("\n") || 'An error occurred during sign up.';
        } else if (error.request) {
            console.error("Error request:", error.request);
            return "No response from server. Please try again later."
        } else {
            console.error("Error message:", error.message);
            return "An error occurred. Please try again"
        }
    };

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView>
                    <View className={"w-full justify-center items-center h-full px-4"}>
                        <View>
                            <Text className={"text-2xl font-merriweather-bold text-center text-txt"}>Welcome to Fleet Master</Text>
                        </View>
                        <View className={"mt-[15px]"}>
                            <Text className={"text-txt text-center font-open-sans"}>Start managing your fleet with ease</Text>
                            <Text className={"text-txt text-center font-open-sans"}>Sign up now to keep track of your fleet and stay organized</Text>
                        </View>
                        <ThemedInputText name={"firstname"} value={formState.user.firstname ? formState.user.firstname : ""}
                                         containerStyles={"bg-white w-full p-5 mt-[15px]"} placeholder={"Your first name"} onChange={handleChange}/>
                        <ThemedInputText name={"lastname"} value={formState.user.lastname ? formState.user.lastname : ""}
                                         containerStyles={"bg-white w-full p-5 mt-[15px]"} placeholder={"Your last name"} onChange={handleChange}/>
                        <ThemedInputText name={"username"} value={formState.user.username} containerStyles={"bg-white w-full p-5 mt-[15px]"}
                                         placeholder={"Your username"} onChange={handleChange}/>
                        <ThemedInputText name={"email"} value={formState.user.email} containerStyles={"bg-white w-full p-5 mt-[15px]"}
                                         placeholder={"Your email"} onChange={handleChange}/>
                        <ThemedInputText name={"phone"} value={formState.phone ? formState.phone : ""}
                                         containerStyles={"bg-white w-full p-5 mt-[15px]"} placeholder={"Your phone number"} onChange={handleChange}/>
                        <ThemedInputText name={"password"} value={formState.user.password} containerStyles={"bg-white w-full p-5 mt-[15px]"}
                                         placeholder={"Your password"} onChange={handleChange}/>
                        <ThemedInputText name={"password"} value={password} containerStyles={"bg-white w-full p-5 mt-[15px]"}
                                         placeholder={"re-enter password"} onChange={updatePassword}/>
                        <View className="mt-[15px]">
                            <Text className={"text-txt font-open-sans"}>
                                By continuing you agree to Fleet Master's
                                <Text className="text-secondary"> Terms of service </Text> and
                                <Text className="text-secondary"> privacy policy</Text>
                            </Text>
                        </View>
                        <ThemedButton
                            title={"Continue"}
                            handlePress={submitForm}
                            containerStyles={"w-full mt-[50px] bg-primary"}
                            textStyles={"text-white font-semibold text-base"}
                        />
                        <View className={"mt-[25px]"}>
                            <Text>Already registered? <Link href={"/"} className={"text-secondary font-open-sans"}>Sign in</Link></Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignUp;
