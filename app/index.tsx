import React, {useState} from 'react';
import {Alert, Image, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import {images} from "@/constants/images";
import ThemedButton from "@/components/ThemedButton";
import ThemedInputText from "@/components/ThemedInputText";
import {icons} from "@/constants/icons";
import {Link, router} from "expo-router";
import axios from "axios";
import {API} from "@/constants/endpoints";
import {handleCookies, handleError} from "@/utils/authentication";
import Spinner from "@/components/Spinner";
import {StatusBar} from "expo-status-bar";

export type FormState = {
    username: string
    password: string
}

const App = () => {
    const [formState, setFormState] = useState<FormState>({
        username: "",
        password: "",
    })
    const [loading, setLoading] = useState<boolean>(false)
    const handleChange = (name: string, value: string) => {
        setFormState((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }
    const submitForm = async () => {
        setLoading(true)
        try {
            const response = await axios.post(`${API}login/`, formState, {headers: {'Content-Type': 'application/json'}})
            handleCookies(response.headers);
            router.replace("/dashboard");
        } catch (error) {
            const errorMessage: string = handleError(error);
            Alert.alert("Error", errorMessage);
        } finally {
            setLoading(false)
        }
    }
    return (
        <SafeAreaView className="bg-background hl-full">
            <ScrollView contentContainerStyle={{height: "100%"}}>
                {loading ? <View className="w-full justify-center items-center h-full px-4"><Spinner isVisible={loading}/></View> :
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
                            placeholder={"Enter Your username"}
                            onChange={handleChange}
                            name={"username"}
                            value={formState.username}
                        />
                        <ThemedInputText
                            containerStyles={"bg-white w-full p-5 mt-[15px]"}
                            placeholder={"Enter your password"}
                            onChange={handleChange}
                            name={"password"}
                            value={formState.password}
                        />
                        <ThemedButton
                            title="Log in"
                            handlePress={submitForm}
                            containerStyles="w-full mt-[50px] bg-primary"
                            textStyles={"text-white font-semibold text-base"}
                        />
                        <View className={"mt-[50px]"}>
                            <Text className={"text-txt font-open-sans"}>
                                Don't have an account? <Link href={"/signup"} className={"text-secondary font-open-sans"}>Create account</Link>
                            </Text>
                        </View>
                        <ThemedButton
                            title={"Log in with Google"}
                            handlePress={() => {
                            }}
                            containerStyles={"w-full bg-white mt-[50px]"}
                            icon={icons.google}
                        />
                        <ThemedButton
                            title={"Log in with Apple"}
                            handlePress={() => {
                            }}
                            containerStyles={"w-full bg-white mt-[15px]"}
                            icon={icons.apple}
                        />
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
};


export default App;
