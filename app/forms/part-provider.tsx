import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {PartProviderType} from "@/types/maintenance";
import axios from "axios";
import {API} from "@/constants/endpoints";
import {ListItemDetail, PartProviderForm, Spinner, ThemedButton} from "@/components";
import {router} from "expo-router";
import {useGlobalContext} from "@/context/GlobalProvider";


const PartProvider = () => {
    const {partProviders, setPartProviders} = useGlobalContext()
    const [showPartProviderForm, setShowPartProviderForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [partProviderFormData, setPartProviderFormData] = useState<PartProviderType>({name: "", address: "", phone_number: "", id: ""})

    const handleEditPartProvider = () => {

    }
    const handleAddPartProvider = () => {
        setShowPartProviderForm(true);
    }

    const handlePartProviderInputChange = (name: string, value: string) => {
        setPartProviderFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handlePartProviderSubmission = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API}maintenance/parts-providers/`, partProviderFormData, {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            const newPartProvider = response.data;
            setPartProviders([...partProviders, newPartProvider]);
            setShowPartProviderForm(false)
        } catch (error: any) {
            console.log(error);
        }finally {
            setIsLoading(false);
        }
    }
    const handlePartProviderCancellation = () => {
        setShowPartProviderForm(false);
    }
    const handleCancelPartProviderAddition = () => {
        router.replace("/maintenance/maintenance-report");
    }
    return (
        <SafeAreaView>
            <ScrollView>
                {showPartProviderForm ?
                    <PartProviderForm partProvider={partProviderFormData}
                                      handlePartProviderInputChange={handlePartProviderInputChange}
                                      handlePartProviderSubmission={handlePartProviderSubmission}
                                      handlePartProviderCancellation={handlePartProviderCancellation}
                    />
                    :
                    <View className={"w-full justify-center items-center"}>
                        {isLoading ? <Spinner isVisible={isLoading}/> :
                            <View className={"w-[94%] bg-white rounded p-5"}>
                                <View className={"gap-2"}>
                                    <Text className={"font-semibold text-base text-txt"}>Part provider's list</Text>
                                    <Text className={"font-open-sans text-txt text-sm"}>Here is the list of part providers</Text>
                                </View>
                                <View>
                                    {partProviders.map((partProvider, idx) => {
                                        return (
                                            <Pressable onPress={handleEditPartProvider} key={idx}>
                                                <View className={"flex-row p-[16px] bg-white rounded shadow mt-3"}>
                                                    <View className={"flex-1"}>
                                                        <ListItemDetail label={"Name"} value={partProvider.name} textStyle={"text-txt"}/>
                                                        <ListItemDetail label={"Phone number"} value={partProvider.phone_number} textStyle={"text-txt"}/>
                                                        <ListItemDetail label={"Address"} value={partProvider.address} textStyle={"text-txt"}/>
                                                    </View>
                                                </View>
                                            </Pressable>
                                        )
                                    })}
                                </View>
                                <View className={"w-full pt-5"}>
                                    <ThemedButton title={"Add part provider"}
                                                  handlePress={handleAddPartProvider}
                                                  containerStyles={"bg-primary p-5 rounded-[50%]"}
                                                  textStyles={"font-semibold text-base text-white"}
                                    />
                                    <ThemedButton title={"Cancel"}
                                                  handlePress={handleCancelPartProviderAddition}
                                                  containerStyles={"bg-default p-5 rounded-[50%] mt-3"}
                                                  textStyles={"font-semibold text-base text-white"}
                                                  />
                                </View>
                            </View>
                        }
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default PartProvider;
