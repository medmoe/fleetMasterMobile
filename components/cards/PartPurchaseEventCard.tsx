import React from 'react';
import {Pressable, View} from "react-native";
import ListItemDetail from "@/components/ListItemDetail";
import {PartPurchaseEventWithNumbersType} from "@/types/maintenance";

interface PartPurchaseEventCardProps {
    onPress: () => void;
    onLongPress: () => void;
    part_name: string;
    provider_name: string;
    provider_phone: string;
    provider_address: string;
    purchase_date: string;
    cost: string;
}


const PartPurchaseEventCard = ({
                                   onPress,
                                   onLongPress,
                                   part_name,
                                   provider_name,
                                   provider_phone,
                                   provider_address,
                                   purchase_date,
                                   cost
                               }: PartPurchaseEventCardProps) => {
    return (
        <Pressable onPress={onPress} onLongPress={onLongPress}>
            <View className={"flex-row p-[16px] bg-white rounded shadow mt-3"}>
                <View className={"flex-1"}>
                    <ListItemDetail label={"Part name"} value={part_name} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Provider"} value={provider_name} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Provider phone number"} value={provider_phone} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Provider address"} value={provider_address} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Purchase date"} value={purchase_date} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Cost"} value={cost} textStyle={"text-txt"}/>
                </View>
            </View>
        </Pressable>
    )
}

export default PartPurchaseEventCard;