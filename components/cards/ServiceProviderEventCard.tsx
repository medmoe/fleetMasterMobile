import React from 'react';
import {Pressable, View} from "react-native";
import ListItemDetail from "@/components/ListItemDetail";
import {ServiceProviderEventWithNumbersType} from "@/types/maintenance";

interface ServiceProviderEventCardProps {
    onPress: () => void
    onLongPress: () => void
    serviceProviderEvent: ServiceProviderEventWithNumbersType
}

const ServiceProviderEventCard = ({onPress, serviceProviderEvent, onLongPress}: ServiceProviderEventCardProps) => {
    return (
        <Pressable onPress={onPress} onLongPress={onLongPress}>
            <View className={"flex-row p-[16px] bg-white rounded shadow mt-3"}>
                <View className={"flex-1"}>
                    <ListItemDetail label={"Service Provider"} value={serviceProviderEvent.service_provider_details?.name || "N/A"}/>
                    <ListItemDetail label={"Service Type"} value={serviceProviderEvent.service_provider_details?.service_type || "N/A"}/>
                    <ListItemDetail label={"Phone number"} value={serviceProviderEvent.service_provider_details?.phone_number || "N/A"}/>
                    <ListItemDetail label={"Address"} value={serviceProviderEvent.service_provider_details?.address || "N/A"}/>
                    <ListItemDetail label={"Date"} value={serviceProviderEvent.service_date}/>
                    <ListItemDetail label={"Cost"} value={serviceProviderEvent.cost}/>
                    <ListItemDetail label={"Description"} value={serviceProviderEvent.description}/>
                </View>
            </View>
        </Pressable>
    )
}

export default ServiceProviderEventCard;