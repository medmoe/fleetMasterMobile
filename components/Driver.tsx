import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {DriverType} from '@/types/types';
import {driverStatus} from "@/constants/constants";
import {ListItemDetail} from "@/components/index";

interface DriverProps {
    driver: DriverType
    onPress: () => void
}

// This function wraps common parts to display driver's details

const Driver = ({driver, onPress}: DriverProps) => {
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
                    {driver.employment_status === driverStatus.active ?
                        <Text className={"text-sm text-success"}>Active</Text> :
                        <Text className={"text-sm text-error"}>{driver.employment_status}</Text>
                    }
                </View>
            </View>
        </Pressable>
    )
}

export default Driver;