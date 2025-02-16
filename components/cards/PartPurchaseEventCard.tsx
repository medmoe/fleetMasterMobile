import React from 'react';
import {Pressable, View} from "react-native";
import ListItemDetail from "@/components/ListItemDetail";
import {PartPurchaseEventType, PartPurchaseEventWithNumbersType} from "@/types/maintenance";

interface PartPurchaseEventCardProps {
    onPress: () => void;
    onLongPress: () => void;
    partPurchaseEvent: PartPurchaseEventWithNumbersType;
}


const PartPurchaseEventCard = ({onPress, onLongPress, partPurchaseEvent}: PartPurchaseEventCardProps) => {
    const {part_details, provider_details, cost, purchase_date} = partPurchaseEvent;
    return (
        <Pressable onPress={onPress} onLongPress={onLongPress}>
            <View className={"flex-row p-[16px] bg-white rounded shadow mt-3"}>
                <View className={"flex-1"}>
                    <ListItemDetail label={"Name"} value={part_details?.name || "N/A"} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Provider"} value={provider_details?.name || "N/A"} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Provider phone number"} value={provider_details?.phone_number || "N/A"} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Provider address"} value={provider_details?.address || "N/A"} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Purchase date"} value={purchase_date} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Cost"} value={cost} textStyle={"text-txt"}/>
                </View>
            </View>
        </Pressable>
    )
}

export default PartPurchaseEventCard;