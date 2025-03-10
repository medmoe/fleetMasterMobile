import React from 'react';
import {Pressable, View} from "react-native";
import ListItemDetail from "@/components/ListItemDetail";
import {PartPurchaseEventWithNumbersType} from "@/types/maintenance";
import FontAwsome from "@expo/vector-icons/FontAwesome";

interface PartPurchaseEventCardProps {
    part_name: string;
    provider_name: string;
    provider_phone: string;
    provider_address: string;
    purchase_date: string;
    cost: string;
    handlePartPurchaseEventEdition: () => void;
    handlePartPurchaseEventDeletion: () => void;
}


const PartPurchaseEventCard = ({
                                   handlePartPurchaseEventEdition,
                                   handlePartPurchaseEventDeletion,
                                   part_name,
                                   provider_name,
                                   provider_phone,
                                   provider_address,
                                   purchase_date,
                                   cost
                               }: PartPurchaseEventCardProps) => {
    return (
        <View>
            <View className={"flex-row pt-4 pl-4 pb-4 bg-white rounded shadow mt-3"}>
                <View className={"flex-1"}>
                    <View className={"absolute right-0 top-0 flex flex-col z-10"}>
                        <Pressable className={"p-2"} onPress={handlePartPurchaseEventEdition}>
                            <FontAwsome name={"edit"} size={25} color={"#9c27b0"}/>
                        </Pressable>
                        <Pressable className={"p-2"} onPress={handlePartPurchaseEventDeletion}>
                            <FontAwsome name={"trash"} size={25} color={"#9c27b0"}/>
                        </Pressable>
                    </View>
                    <ListItemDetail label={"Part name"} value={part_name} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Provider"} value={provider_name} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Provider phone number"} value={provider_phone} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Provider address"} value={provider_address} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Purchase date"} value={purchase_date} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Cost"} value={cost} textStyle={"text-txt"}/>
                </View>
            </View>
        </View>
    )
}

export default PartPurchaseEventCard;