import React from 'react';
import {Pressable, View} from "react-native";
import ListItemDetail from "@/components/ListItemDetail";
import {ServiceProviderEventType} from "@/types/maintenance";

interface ServiceProviderEventCardProps {
    onPress: () => void
    event: ServiceProviderEventType
}

const ServiceProviderEventCard = ({onPress, event}: ServiceProviderEventCardProps) => {
    return (
        <Pressable onPress={onPress}>
            <View className={"flex-row p-[16px] bg-white rounded shadow mt-3"}>
                <View className={"flex-1"}>
                    <ListItemDetail label={"Service Provider"} value={`${event.service_provider.name} ${event.service_provider.service_type}`}/>
                    <ListItemDetail label={"Date"} value={event.service_date}/>
                    <ListItemDetail label={"Cost"} value={event.cost}/>
                    <ListItemDetail label={"Description"} value={event.description}/>
                </View>
            </View>
        </Pressable>
    )
}

export default ServiceProviderEventCard;