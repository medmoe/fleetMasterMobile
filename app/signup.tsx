import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View} from 'react-native';
import {Link, useRouter} from "expo-router";
import axios from "axios";
import {API} from "@/constants/endpoints";
import {handleAuthenticationErrors, handleCookies} from "@/utils/authentication";
import {SafeAreaView} from "react-native-safe-area-context";
import Spinner from "@/components/Spinner";
import ThemedInputText from "@/components/ThemedInputText";
import ThemedButton from "@/components/ThemedButton";

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
    const api = axios.create({baseURL: `${API}accounts/`})
    const [formState, setFormState] = useState<FormState>({
        user: {
            username: "",
            email: "",
            password: "",
        }
    })
    const [password, setpassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
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
        setLoading(true);
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

            handleCookies(response.headers)
            // Navigate to dashboard
            router.replace("/dashboard");

        } catch (error) {
            // Handle errors
            const errorMessage = handleAuthenticationErrors(error);
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView>
                    {loading ?
                        <View className="w-full justify-center items-center h-full px-4"><Spinner isVisible={loading}/></View> :
                        <View className={"w-full justify-center items-center h-full px-4"}>
                            <View>
                                <Text className={"text-2xl font-merriweather-bold text-center text-txt"}>Welcome to
                                    Fleet Master</Text>
                            </View>
                            <View className={"mt-[15px]"}>
                                <Text className={"text-txt text-center font-open-sans"}>Start managing your fleet with
                                    ease</Text>
                                <Text className={"text-txt text-center font-open-sans"}>Sign up now to keep track of
                                    your fleet and stay
                                    organized</Text>
                            </View>
                            <ThemedInputText name={"firstname"}
                                             value={formState.user.firstname ? formState.user.firstname : ""}
                                             containerStyles={"mt-[15px]"}
                                             inputContainerStyles={"bg-white w-full p-5"}
                                             placeholder={"Your first name"}
                                             onChange={handleChange}/>
                            <ThemedInputText name={"lastname"}
                                             value={formState.user.lastname ? formState.user.lastname : ""}
                                             containerStyles={"mt-[15px]"}
                                             inputContainerStyles={"bg-white w-full p-5"}
                                             placeholder={"Your last name"}
                                             onChange={handleChange}/>
                            <ThemedInputText name={"username"} value={formState.user.username}
                                             containerStyles={"mt-[15px]"}
                                             inputContainerStyles={"bg-white w-full p-5"}
                                             placeholder={"Your username"} onChange={handleChange}/>
                            <ThemedInputText name={"email"} value={formState.user.email}
                                             containerStyles={"mt-[15px]"}
                                             inputContainerStyles={"bg-white w-full p-5"}
                                             placeholder={"Your email"} onChange={handleChange}/>
                            <ThemedInputText name={"phone"} value={formState.phone ? formState.phone : ""}
                                             containerStyles={"mt-[15px]"}
                                             inputContainerStyles={"bg-white w-full p-5"}
                                             placeholder={"Your phone number"}
                                             onChange={handleChange}/>
                            <ThemedInputText name={"password"} value={formState.user.password}
                                             containerStyles={"mt-[15px]"}
                                             inputContainerStyles={"bg-white w-full p-5"}
                                             placeholder={"Your password"} onChange={handleChange}/>
                            <ThemedInputText name={"password"} value={password}
                                             containerStyles={"mt-[15px]"}
                                             inputContainerStyles={"bg-white w-full p-5"}
                                             placeholder={"re-enter password"} onChange={updatePassword}/>
                            <View className="mt-[15px]">
                                <Text className={"text-txt font-open-sans"}>
                                    By continuing you agree to Fleet Master's
                                    <Text className="text-secondary-500"> Terms of service </Text> and
                                    <Text className="text-secondary-500"> privacy policy</Text>
                                </Text>
                            </View>
                            <ThemedButton
                                title={"Continue"}
                                handlePress={submitForm}
                                containerStyles={"w-full mt-[15px] bg-primary-500 p-5 rounded"}
                                textStyles={"text-white font-semibold text-base"}
                            />
                            <View className={"mt-[25px]"}>
                                <Text>Already registered? <Link href={"/"} className={"text-secondary-500 font-open-sans"}>Sign
                                    in</Link></Text>
                            </View>
                        </View>
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );

};

export default SignUp;