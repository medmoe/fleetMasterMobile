import React, {useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import ServiceProviderForm from "@/components/forms/ServiceProviderForm";
import {ServiceProviderType} from "@/types/maintenance";
import {router} from "expo-router";
import axios from "axios";
import {API} from "@/constants/endpoints";
import {useGlobalContext} from "@/context/GlobalProvider";
import {ListItemDetail, ThemedButton} from "@/components";

const ServiceProvider = () => {
    const {generalData, setGeneralData} = useGlobalContext()
    const [serviceProviderFormData, setServiceProviderFormData] = useState<ServiceProviderType>({
        name: "", address: "", service_type: "MECHANIC", phone_number: ""
    })
    const [showServiceProviderCreationForm, setShowServiceProviderCreationForm] = useState(false);
    const handleServiceProviderCreationCancellation = () => {
        setShowServiceProviderCreationForm(false);
    }
    const handleServiceProviderFormChange = (name: string, value: string) => {
        setServiceProviderFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleServiceProviderSubmission = async () => {
        try {
            const response = await axios.post(`${API}maintenance/service-providers/`,
                serviceProviderFormData, {headers: {'Content-Type': "application/json"}, withCredentials: true})
            setGeneralData({
                ...generalData,
                service_providers: [...generalData.service_providers, response.data]
            })
            setShowServiceProviderCreationForm(false);

        } catch (error) {
            console.log(error)
        }
    }
    const handleServiceProviderEdition = () => {

    }
    const handleServiceProviderCreation = () => {
        setShowServiceProviderCreationForm(true);
    }
    const handleServiceProviderAdditionCancellation = () => {
        router.replace('/maintenance/maintenance-report');
    }
    return (
        <SafeAreaView>
            <ScrollView>
                {showServiceProviderCreationForm ?
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
                                <Text className={"font-open-sans text-txt text-sm"}>Here is the list of service providers</Text>
                            </View>
                            <View>
                                {generalData.service_providers.map((serviceProvider, idx) => {
                                    return (
                                        <Pressable onPress={handleServiceProviderEdition} key={idx}>
                                            <View className={"flex-row p-[16px] bg-white rounded shadow mt-3"}>
                                                <View className={"flex-1"}>
                                                    <ListItemDetail label={"Name"} value={serviceProvider.name} textStyle={"text-txt"} />
                                                    <ListItemDetail label={"Phone number"} value={serviceProvider.phone_number} textStyle={"text-txt"} />
                                                    <ListItemDetail label={"Address"} value={serviceProvider.address} textStyle={"text-txt"} />
                                                    <ListItemDetail label={"Type"} value={serviceProvider.service_type.toLowerCase()} textStyle={"text-text"} />
                                                </View>
                                            </View>
                                        </Pressable>
                                    )
                                })}
                            </View>
                            <View className={"w-full pt-5"}>
                                <ThemedButton title={"Create Service Provider"}
                                              handlePress={handleServiceProviderCreation}
                                              containerStyles={"bg-secondary p-5 rounded-[50%]"}
                                              textStyles={"font-semibold text-base text-white"}
                                />
                                <ThemedButton title={"Cancel"}
                                              handlePress={handleServiceProviderAdditionCancellation}
                                              containerStyles={"bg-default p-5 rounded-[50%] mt-3"}
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
