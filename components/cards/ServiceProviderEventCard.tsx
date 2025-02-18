import React from 'react';
import {Pressable, View} from "react-native";
import ListItemDetail from "@/components/ListItemDetail";

interface ServiceProviderEventCardProps {
    cost: string
    description: string
    onLongPress: () => void
    onPress: () => void
    service_date: string
    service_provider_address: string
    service_provider_name: string
    service_provider_phone: string
    service_provider_type: string
}

const ServiceProviderEventCard = ({
                                      cost,
                                      description,
                                      onLongPress,
                                      onPress,
                                      service_date,
                                      service_provider_address,
                                      service_provider_name,
                                      service_provider_phone,
                                      service_provider_type,
                                  }: ServiceProviderEventCardProps) => {
    return (
        <Pressable onPress={onPress} onLongPress={onLongPress}>
            <View className={"flex-row p-[16px] bg-white rounded shadow mt-3"}>
                <View className={"flex-1"}>
                    <ListItemDetail label={"Service Provider"} value={service_provider_name}/>
                    <ListItemDetail label={"Service Type"} value={service_provider_type.toLowerCase()}/>
                    <ListItemDetail label={"Phone number"} value={service_provider_phone}/>
                    <ListItemDetail label={"Address"} value={service_provider_address}/>
                    <ListItemDetail label={"Date"} value={service_date}/>
                    <ListItemDetail label={"Cost"} value={cost}/>
                    <ListItemDetail label={"Description"} value={description}/>
                </View>
            </View>
        </Pressable>
    )
}

export default ServiceProviderEventCard;