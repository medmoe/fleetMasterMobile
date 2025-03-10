import React, {useEffect, useState} from 'react';
import {Alert, Image, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import {Link, router} from "expo-router";
import axios from "axios";
import {API} from "@/constants/endpoints";
import {handleAuthenticationErrors, handleCookies} from "@/utils/authentication";
import {useGlobalContext} from "@/context/GlobalProvider";
import {Spinner, ThemedButton, ThemedInputText} from "@/components";

export type FormState = {
    username: string
    password: string
}

const App = () => {
    const {responseData, setResponseData} = useGlobalContext();
    useEffect(() => {
        setLoading(true);
        const verifyToken = async () => {
            try {
                const response = await axios.get(`${API}accounts/refresh/`, {withCredentials: true});
                if (response.status === 200) {
                    router.replace("/dashboard");
                }
            } catch (error) {
                const errorMessage = handleAuthenticationErrors(error)
                console.log(errorMessage);
            } finally {
                setLoading(false);
            }
        }
        verifyToken();
    }, [])

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
            const response = await axios.post(`${API}accounts/login/`, formState, {headers: {'Content-Type': 'application/json'}})
            handleCookies(response.headers);
            setResponseData(response.data);
            router.replace("/dashboard");
        } catch (error) {
            const errorMessage: string = handleAuthenticationErrors(error);
            Alert.alert("Error", errorMessage);
        } finally {
            setLoading(false)
        }
    }
    return (
        <SafeAreaView className="bg-background hl-full">
            <ScrollView contentContainerStyle={{height: "100%"}}>
                {loading ? <View className="w-full justify-center items-center h-full px-4"><Spinner
                        isVisible={loading}/></View> :
                    <View className="w-full justify-center items-center h-full px-4">
                        <Image source={images.logo} className="w-[140px] h-[140px]"/>
                        <View className="mt-3">
                            <Text className="text-2xl text-txt font-merriweather-bold text-center">Welcome to Fleet
                                Master</Text>
                        </View>
                        <View className="mt-3">
                            <Text className="text-txt text-center font-open-sans">Sign in to manage your fleet</Text>
                        </View>
                        <ThemedInputText
                            containerStyles={"mt-3"}
                            inputContainerStyles={"bg-white w-full p-5"}
                            placeholder={"Enter Your username"}
                            onChange={handleChange}
                            name={"username"}
                            value={formState.username}
                        />
                        <ThemedInputText
                            containerStyles={"mt-3"}
                            inputContainerStyles={"bg-white w-full p-5"}
                            placeholder={"Enter your password"}
                            onChange={handleChange}
                            name={"password"}
                            value={formState.password}
                        />
                        <ThemedButton
                            title="Log in"
                            handlePress={submitForm}
                            containerStyles="w-full bg-primary-500 p-5 rounded mt-[50px]"
                            textStyles={"text-white font-semibold text-base"}
                        />
                        <View className={"mt-[25px]"}>
                            <Text className={"text-txt font-open-sans"}>
                                Don't have an account? <Link href={"/signup"}
                                                             className={"text-secondary-500 font-open-sans"}>Create
                                account</Link>
                            </Text>
                        </View>
                        <ThemedButton
                            title={"Log in with Google"}
                            handlePress={() => {
                            }}
                            containerStyles={"w-full bg-white p-5 rounded mt-[15px]"}
                            icon={icons.google}
                        />
                        <ThemedButton
                            title={"Log in with Apple"}
                            handlePress={() => {
                            }}
                            containerStyles={"w-full bg-white mt-[15px] p-5 rounded mt-[15px]"}
                            icon={icons.apple}
                        />
                    </View>
                }
            </ScrollView>
        </SafeAreaView>

    );
};

export default App;
