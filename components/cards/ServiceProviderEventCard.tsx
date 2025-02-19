import React from 'react';
import {Pressable, View} from "react-native";
import ListItemDetail from "@/components/ListItemDetail";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface ServiceProviderEventCardProps {
    cost: string
    description: string
    handleServiceProviderEventEdition: () => void
    handleServiceProviderEventDeletion: () => void
    service_date: string
    service_provider_address: string
    service_provider_name: string
    service_provider_phone: string
    service_provider_type: string
}

const ServiceProviderEventCard = ({
                                      cost,
                                      description,
                                      handleServiceProviderEventEdition,
                                      handleServiceProviderEventDeletion,
                                      service_date,
                                      service_provider_address,
                                      service_provider_name,
                                      service_provider_phone,
                                      service_provider_type,
                                  }: ServiceProviderEventCardProps) => {
    return (
        <View>
            <View className={"flex-row pt-4 pl-4 pb-4 bg-white rounded shadow mt-3"}>
                <View className={"flex-1"}>
                    <View className={"absolute right-0 top-0 flex flex-col z-10"}>
                        <Pressable className={"p-2"} onPress={handleServiceProviderEventEdition}>
                            <FontAwesome name={"edit"} size={25} color={"#9c27b0"}/>
                        </Pressable>
                        <Pressable className={"p-2"} onPress={handleServiceProviderEventDeletion}>
                            <FontAwesome name={"trash"} size={25} color={"#9c27b0"}/>
                        </Pressable>
                    </View>
                    <ListItemDetail label={"Service Provider"} value={service_provider_name}/>
                    <ListItemDetail label={"Service Type"} value={service_provider_type.toLowerCase()}/>
                    <ListItemDetail label={"Phone number"} value={service_provider_phone}/>
                    <ListItemDetail label={"Address"} value={service_provider_address}/>
                    <ListItemDetail label={"Date"} value={service_date}/>
                    <ListItemDetail label={"Cost"} value={cost}/>
                    <ListItemDetail label={"Description"} value={description}/>
                </View>
            </View>
        </View>
    )
}

export default ServiceProviderEventCard;