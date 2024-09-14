import React from 'react';
import {VehicleType} from "@/types/types";
import {Pressable, Text, View} from "react-native";
import ListItemDetail from "@/components/ListItemDetail";
import {vehicleStatusMapping} from "@/constants/forms/vehicle";
import ThemedButton from "@/components/ThemedButton";
import {icons} from "@/constants/icons";

interface VehicleProps {
    vehicle: VehicleType
    onPress: () => void
    handleMaintenance: () => void
}


const VehicleCardComponent = ({vehicle, onPress, handleMaintenance}: VehicleProps) => {
    const [style, label] = vehicleStatusMapping[vehicle.status];
    return (
        <Pressable onPress={onPress}>
            <View className={"flex-row p-[16px] bg-white rounded shadow mt-3"}>
                <View className={"flex-1"}>
                    <ListItemDetail label={"Vehicle name"} value={`${vehicle.make} ${vehicle.model} ${vehicle.year}`} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Purchase date"} value={vehicle.purchase_date} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Capacity"} value={vehicle.capacity} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Mileage"} value={vehicle.mileage} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Next service due"} value={vehicle.next_service_due} textStyle={"text-txt"}/>
                    <ListItemDetail label={"Status"} value={label} textStyle={style}/>
                </View>
                <View className={"justify-center items-center"}>
                    <ThemedButton title={""}
                                  handlePress={handleMaintenance}
                                  containerStyles={"bg-white  p-5 rounded-[50%] shadow"}
                                  icon={icons.repair}
                                  imageStyles={"w-7 h-7"}
                    />
                </View>
            </View>
        </Pressable>
    )
}

export default VehicleCardComponent;