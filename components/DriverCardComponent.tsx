import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {DriverType, VehicleType} from '@/types/types';
import ListItemDetail from "@/components/ListItemDetail";
import {driverStatusMapping} from "@/constants/forms/driver";
import {getVehicleName} from "@/utils/helpers";

interface DriverProps {
    driver: DriverType
    vehicles: VehicleType[] | undefined
    onPress: () => void
}

const DriverCardComponent = ({vehicles, driver, onPress}: DriverProps) => {
    const [style, label] = driverStatusMapping[driver.employment_status];
    const vehicleDetails = getVehicleName(vehicles, driver);


    return (
        <Pressable onPress={onPress}>
            <View className={"flex-row p-[16px] bg-white rounded-[10px] shadow mt-3"}>
                <View className={"flex-1"}>
                    <ListItemDetail label="First name" value={driver.first_name} containerStyle={""}/>
                    <ListItemDetail label="Last name" value={driver.last_name} containerStyle={""}/>
                    <ListItemDetail label="Phone number" value={driver.phone_number} containerStyle={""}/>
                    <ListItemDetail label="License number" value={driver.license_number} containerStyle={""}/>
                    <ListItemDetail label="Assigned vehicle" value={vehicleDetails} containerStyle={""}/>
                </View>
                <View className={"justify-center items-center"}>
                    <Text className={`${style} text-sm`}>{label}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default DriverCardComponent;