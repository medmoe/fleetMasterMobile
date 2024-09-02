import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {DriverType} from '@/types/types';
import ListItemDetail from "@/components/ListItemDetail";
import {driverStatusMapping} from "@/constants/forms/driver";

interface DriverProps {
    driver: DriverType
    onPress: () => void
}

// This function wraps common parts to display driver's details

const DriverCardComponent = ({driver, onPress}: DriverProps) => {
    const [style, label] = driverStatusMapping[driver.employment_status];
    return (
        <Pressable onPress={onPress}>
            <View className={"flex-row p-[16px] bg-white rounded-[10px] shadow mt-3"}>
                <View className={"flex-1"}>
                    <ListItemDetail label="First name" value={driver.first_name}/>
                    <ListItemDetail label="Last name" value={driver.last_name}/>
                    <ListItemDetail label="Phone number" value={driver.phone_number}/>
                    <ListItemDetail label="License number" value={driver.license_number}/>
                    <ListItemDetail label="Assigned vehicle" value={driver.vehicle}/>
                </View>
                <View className={"justify-center items-center"}>
                    <Text className={`${style} text-sm`}>{label}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default DriverCardComponent;