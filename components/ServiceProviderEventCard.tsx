import React from 'react';
import {Pressable, View} from "react-native";
import ListItemDetail from "@/components/ListItemDetail";
import {ServiceProviderEventType} from "@/types/maintenance";

interface ServiceProviderEventCardProps {
    onPress: () => void
    onLongPress: () => void
    serviceProviderEvent: ServiceProviderEventType
}

const ServiceProviderEventCard = ({onPress, serviceProviderEvent, onLongPress}: ServiceProviderEventCardProps) => {
    return (
        <Pressable onPress={onPress} onLongPress={onLongPress}>
            <View className={"flex-row p-[16px] bg-white rounded shadow mt-3"}>
                <View className={"flex-1"}>
                    <ListItemDetail label={"Service Provider"}
                                    value={`${serviceProviderEvent.service_provider.name} ${serviceProviderEvent.service_provider.service_type.toLowerCase()}`}/>
                    <ListItemDetail label={"Date"} value={serviceProviderEvent.service_date}/>
                    <ListItemDetail label={"Cost"} value={serviceProviderEvent.cost}/>
                    <ListItemDetail label={"Description"} value={serviceProviderEvent.description}/>
                </View>
            </View>
        </Pressable>
    )
}

export default ServiceProviderEventCard;