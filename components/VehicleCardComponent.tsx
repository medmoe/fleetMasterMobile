import React from 'react';
import {VehicleType} from "@/types/types";
import {Pressable, Text, View} from "react-native";
import ListItemDetail from "@/components/ListItemDetail";
import {vehicleStatusMapping} from "@/constants/forms/vehicle";

interface VehicleProps {
    vehicle: VehicleType
    onPress: () => void
}


const VehicleCardComponent = ({vehicle, onPress}: VehicleProps) => {
    const [style, label] = vehicleStatusMapping[vehicle.status];
    return (
        <Pressable onPress={onPress}>
            <View className={"flex-row p-[16px] bg-white rounded shadow mt-3"}>
                <View className={"flex-1"}>
                    <ListItemDetail label={"Vehicle name"} value={`${vehicle.make} ${vehicle.model} ${vehicle.year}`} containerStyle={""}/>
                    <ListItemDetail label={"Purchase date"} value={vehicle.purchase_date} containerStyle={""}/>
                    <ListItemDetail label={"Capacity"} value={vehicle.capacity} containerStyle={""}/>
                    <ListItemDetail label={"Mileage"} value={vehicle.mileage} containerStyle={""}/>
                    <ListItemDetail label={"Next service due"} value={vehicle.next_service_due} containerStyle={""}/>
                </View>
                <View className={"justify-center items-center"}>
                    <Text className={`text-sm ${style}`}>{label}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default VehicleCardComponent;