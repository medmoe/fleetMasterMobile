import React, {useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {PartProviderType} from "@/types/maintenance";
import axios from "axios";
import {API} from "@/constants/endpoints";
import {ListItemDetail, PartProviderForm, Spinner, ThemedButton} from "@/components";
import {router} from "expo-router";
import {useGlobalContext} from "@/context/GlobalProvider";


const PartProvider = () => {
    const {generalData, setGeneralData} = useGlobalContext()
    const [showPartProviderForm, setShowPartProviderForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [partProviderFormData, setPartProviderFormData] = useState<PartProviderType>({name: "", address: "", phone_number: ""})
    const [isUpdate, setIsUpdate] = useState(false)
    const [showDeleteFeatures, setShowDeleteFeatures] = useState(false)
    const options = {headers: {'Content-Type': "application/json"}, withCredentials: true};
    const handlePartsProviderEdition = (partsProvider: PartProviderType) => {
        setShowPartProviderForm(true);
        setPartProviderFormData(partsProvider);
        setIsUpdate(true);
    }
    const handlePartsProviderCreation = () => {
        setShowPartProviderForm(true);
        setIsUpdate(false);
        setPartProviderFormData({name: "", phone_number: "", address: ""})
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
            const url = !isUpdate ? `${API}maintenance/parts-providers/` : `${API}maintenance/parts-providers/${partProviderFormData.id}/`;
            const response = !isUpdate ? await axios.post(url, partProviderFormData, options) : await axios.put(url, partProviderFormData, options);
            const filteredPartsProviders = generalData.part_providers.filter((partsProvider) => partsProvider.id !== partProviderFormData.id);
            setGeneralData({
                ...generalData,
                part_providers: [...filteredPartsProviders, response.data]
            })
            setShowPartProviderForm(false)
        } catch (error: any) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    const handlePartProviderCancellation = () => {
        setShowPartProviderForm(false);
    }
    const handleCancelPartProviderAddition = () => {
        if (!showDeleteFeatures) {
            router.replace("/maintenance/maintenance-report");
        } else {
            setShowDeleteFeatures(false);
        }
    }
    const handlePartsProviderLongPress = (partsProvider: PartProviderType) => {
        setShowDeleteFeatures(true);
        setPartProviderFormData(partsProvider);
    }
    const handlePartsProviderDeletion = async () => {
        setIsLoading(true)
        try {
            const url = `${API}maintenance/parts-providers/${partProviderFormData.id}/`
            await axios.delete(url, options);
            const filteredPartsProviders = generalData.part_providers.filter((partsProvider) => partsProvider.id !== partProviderFormData.id);
            setGeneralData({
                ...generalData,
                part_providers: filteredPartsProviders
            })
            setShowDeleteFeatures(false);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <SafeAreaView>
            <ScrollView>
                {isLoading ? <View className={"w-full justify-center items-center h-full px-4"}><Spinner isVisible={isLoading}/></View> :
                    showPartProviderForm ?
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
                                        {generalData.part_providers.map((partProvider, idx) => {
                                            return (
                                                <Pressable onPress={() => handlePartsProviderEdition(partProvider)} key={idx} onLongPress={() => handlePartsProviderLongPress(partProvider)}>
                                                    <View
                                                        className={`flex-row p-[16px] bg-white rounded shadow mt-3 ${showDeleteFeatures && partProviderFormData.id === partProvider.id ? "shadow-error" : ""}`}>
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
                                                      handlePress={handlePartsProviderCreation}
                                                      containerStyles={"bg-primary p-5 rounded-[50%]"}
                                                      textStyles={"font-semibold text-base text-white"}
                                        />
                                        {showDeleteFeatures && <ThemedButton
                                            title={"Delete Parts Provider"}
                                            handlePress={handlePartsProviderDeletion}
                                            containerStyles={"bg-error p-5 rounded-[50%] mt-3"}
                                            textStyles={"font-semibold text-base text-white"}
                                        />
                                        }
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
