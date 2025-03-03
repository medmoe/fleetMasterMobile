import React, {useState} from 'react';
import {Alert, Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import ServiceProviderForm from "@/components/forms/ServiceProviderForm";
import {ServiceProviderType} from "@/types/maintenance";
import {router} from "expo-router";
import axios from "axios";
import {API} from "@/constants/endpoints";
import {useGlobalContext} from "@/context/GlobalProvider";
import {ListItemDetail, Spinner, ThemedButton} from "@/components";

const ServiceProvider = () => {
    const {generalData, setGeneralData} = useGlobalContext()
    const initialState: ServiceProviderType = {name: "", address: "", service_type: "MECHANIC", phone_number: ""}
    const [serviceProviderFormData, setServiceProviderFormData] = useState<ServiceProviderType>(initialState);
    const [showServiceProviderCreationForm, setShowServiceProviderCreationForm] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteFeatures, setShowDeleteFeatures] = useState(false);
    const options = {headers: {'Content-Type': "application/json"}, withCredentials: true}
    const handleServiceProviderCreationCancellation = () => {
        setShowServiceProviderCreationForm(false);
    }
    const handleServiceProviderFormChange = (name: string, value: string) => {
        setServiceProviderFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const areServiceProviderFormDataValid = () => {
        if (serviceProviderFormData.name === "") {
            Alert.alert("Error", "Please fill the name field")
            return false;
        }
        if (serviceProviderFormData.phone_number === "") {
            Alert.alert("Error", "Please fill the phone number field")
            return false;
        }
        return true

    }
    const handleServiceProviderSubmission = async () => {
        setIsLoading(true)
        try {
            if (!areServiceProviderFormDataValid()) {
                return
            }
            const url = !isUpdate ? `${API}maintenance/service-providers/` : `${API}maintenance/service-providers/${serviceProviderFormData.id}/`
            const response = !isUpdate ? await axios.post(url, serviceProviderFormData, options) : await axios.put(url, serviceProviderFormData, options)
            const filteredServiceProviders = generalData.service_providers.filter((serviceProvider) => serviceProvider.id !== serviceProviderFormData.id);
            setGeneralData({
                ...generalData,
                service_providers: [...filteredServiceProviders, response.data]
            })
            setShowServiceProviderCreationForm(false);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    const handleServiceProviderEdition = (serviceProvider: ServiceProviderType) => {
        if (showDeleteFeatures) {
            setShowDeleteFeatures(false);
        } else {
            setShowServiceProviderCreationForm(true);
            setServiceProviderFormData(serviceProvider);
            setIsUpdate(true);
        }

    }
    const handleServiceProviderCreation = () => {
        setShowServiceProviderCreationForm(true);
        setIsUpdate(false);
        setServiceProviderFormData(initialState);
    }
    const handleServiceProviderAdditionCancellation = () => {
        if (showDeleteFeatures) {
            setShowDeleteFeatures(false);
        } else {
            router.replace('/maintenance/maintenance-report');
        }
    }
    const handleServiceProviderDeletion = async () => {
        setIsLoading(true)
        try {
            const url = `${API}maintenance/service-providers/${serviceProviderFormData.id}/`;
            await axios.delete(url, options)
            const filteredServiceProviders = generalData.service_providers.filter((serviceProvider) => serviceProvider.id !== serviceProviderFormData.id)
            setGeneralData({
                ...generalData,
                service_providers: filteredServiceProviders,
            })
            setShowDeleteFeatures(false);
            setServiceProviderFormData(initialState);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }
    const handleServiceProviderLongPress = (serviceProvider: ServiceProviderType) => {
        if (!showDeleteFeatures) {
            setShowDeleteFeatures(true);
            setServiceProviderFormData(serviceProvider);
        } else {
            setShowDeleteFeatures(false);
            setServiceProviderFormData(initialState);
        }
    }
    return (
        <SafeAreaView>
            <ScrollView>
                {isLoading ?
                    <View className={"w-full justify-center items-center h-full px-4"}><Spinner isVisible={isLoading}/></View> :
                    showServiceProviderCreationForm ?
                        <ServiceProviderForm handleServiceProviderSubmission={handleServiceProviderSubmission}
                                             handleServiceProviderCreationCancellation={handleServiceProviderCreationCancellation}
                                             serviceProviderFormData={serviceProviderFormData}
                                             handleServiceProviderFormChange={handleServiceProviderFormChange}
                        />
                        :
                        <View className={"w-full justify-center items-center"}>
                            <View className={"w-[94%] bg-white rounded p-5"}>
                                <View className={"gap-2"}>
                                    <Text className={"font-semibold text-base text-txt"}>Service providers' list</Text>
                                    <Text className={"font-open-sans text-txt text-sm"}>Here is the list of service
                                        providers</Text>
                                </View>
                                <View>
                                    {generalData.service_providers.map((serviceProvider, idx) => {
                                        return (
                                            <Pressable onPress={() => handleServiceProviderEdition(serviceProvider)}
                                                       key={idx}
                                                       onLongPress={() => handleServiceProviderLongPress(serviceProvider)}>
                                                <View
                                                    className={`flex-row p-[16px] bg-white rounded shadow mt-3 ${showDeleteFeatures && serviceProvider.id === serviceProviderFormData.id ? "shadow-error" : ""}`}>
                                                    <View className={"flex-1"}>
                                                        <ListItemDetail label={"Name"} value={serviceProvider.name}
                                                                        textStyle={"text-txt"}/>
                                                        <ListItemDetail label={"Phone number"}
                                                                        value={serviceProvider.phone_number}
                                                                        textStyle={"text-txt"}/>
                                                        <ListItemDetail label={"Address"}
                                                                        value={serviceProvider.address}
                                                                        textStyle={"text-txt"}/>
                                                        <ListItemDetail label={"Type"}
                                                                        value={serviceProvider.service_type.toLowerCase()}
                                                                        textStyle={"text-text"}/>
                                                    </View>
                                                </View>
                                            </Pressable>
                                        )
                                    })}
                                </View>
                                <View className={"w-full pt-5"}>
                                    <ThemedButton title={"Create Service Provider"}
                                                  handlePress={handleServiceProviderCreation}
                                                  containerStyles={"bg-primary-500 p-5 rounded"}
                                                  textStyles={"font-semibold text-base text-white"}
                                    />
                                    {showDeleteFeatures && <ThemedButton title={"Delete Service Provider"}
                                                                         handlePress={handleServiceProviderDeletion}
                                                                         containerStyles={"bg-error p-5 rounded mt-3"}
                                                                         textStyles={"font-semibold text-base text-white"}
                                    />
                                    }
                                    <ThemedButton title={"Cancel"}
                                                  handlePress={handleServiceProviderAdditionCancellation}
                                                  containerStyles={"bg-default p-5 rounded mt-3"}
                                                  textStyles={"font-semibold text-base text-white"}
                                    />
                                </View>
                            </View>
                        </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default ServiceProvider;
