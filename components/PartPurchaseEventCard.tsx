import React from 'react';
import {Pressable, View} from "react-native";
import ListItemDetail from "@/components/ListItemDetail";
import {PartPurchaseEventType} from "@/types/maintenance";

interface PartPurchaseEventCardProps {
    onPress: () => void;
    onLongPress: () => void;
    partPurchaseEvent: PartPurchaseEventType
}


const PartPurchaseEventCard = ({onPress, onLongPress, partPurchaseEvent}: PartPurchaseEventCardProps) => {
    const {part, provider, cost, purchase_date} = partPurchaseEvent;
    return (
        <Pressable onPress={onPress} onLongPress={onLongPress}>
            <View className={"flex-row p-[16px] bg-white rounded shadow mt-3"}>
                <View className={"flex-1"}>
                    <ListItemDetail label={"Name"} value={part.name} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Provider"} value={provider.name} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Purchase date"} value={purchase_date} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Cost"} value={cost} textStyle={"text-txt"}/>
                </View>
            </View>
        </Pressable>
    )
}

export default PartPurchaseEventCard;