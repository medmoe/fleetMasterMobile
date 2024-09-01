import React, {useState} from 'react';
import {VehicleType} from "@/types/types";
import {Pressable, View, Text} from "react-native";
import {ListItemDetail} from "@/components/index";
import {vehicleStatusMapping} from "@/constants/constants";

interface VehicleProps {
    vehicle: VehicleType
    onPress: () => void
}


const Vehicle = ({vehicle, onPress}: VehicleProps) => {
    return (
        <Pressable>
            <View className={"flex-row p-[16px] bg-white rounded shadow mt-3"}>
                <View className={"flex-1"}>
                    <ListItemDetail label={"Vehicle name"} value={`${vehicle.make} ${vehicle.model} ${vehicle.year}`} />
                    <ListItemDetail label={"Purchase date"} value={vehicle.purchase_date} />
                    <ListItemDetail label={"Capacity"} value={vehicle.capacity} />
                    <ListItemDetail label={"Mileage"} value={vehicle.mileage} />
                    <ListItemDetail label={"Next service due"} value={vehicle.next_service_due} />
                </View>
                <View className={"justify-center items-center"}>
                    <Text className={`text-sm ${vehicleStatusMapping[vehicle.status][0]}`}>{vehicleStatusMapping[vehicle.status][1]}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default Vehicle;