import React from 'react';
import {Pressable, View} from "react-native";
import ListItemDetail from "@/components/ListItemDetail";
import {PartType, PartProviderType} from "@/types/maintenance";

interface PartPurchaseEventCardProps {
    onPress: () => void;
    part: PartType
    partProvider: PartProviderType
    purchaseDate: string
    cost: string
}


const PartPurchaseEventCard = ({onPress, part, partProvider, purchaseDate, cost}: PartPurchaseEventCardProps) => {
    return (
        <Pressable onPress={onPress}>
            <View className={"flex-row p-[16px] bg-white rounded shadow mt-3"}>
                <View className={"flex-1"}>
                    <ListItemDetail label={"Name"} value={part.name} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Provider"} value={partProvider.name} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Purchase date"} value={purchaseDate} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Cost"} value={cost} textStyle={"text-txt"}/>
                </View>
            </View>
        </Pressable>
    )
}

export default PartPurchaseEventCard;