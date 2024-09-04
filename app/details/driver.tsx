import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useGlobalContext} from "@/context/GlobalProvider";
import {ListItemDetail, ThemedButton} from "@/components";
import {icons} from "@/constants/icons";
import {DriverType} from "@/types/types";
import {router} from "expo-router";

const getDriverDetails = (driverData: DriverType): { label: string, value: string }[] => {
    return Object.entries(driverData).map(([label, value]) => {
        label = label.charAt(0).toUpperCase() + label.slice(1).replace(/_/g, " ");
        return {label, value}
    })
}

const DriverDetails = () => {
    const {currentDriver} = useGlobalContext();
    const {id, profile_picture, created_at, updated_at, profile, ...driverData} = currentDriver;
    const details = getDriverDetails(driverData);
    const handleUpdate = () => {

    }
    const handleDelete = () => {

    }
    const handleCancel = () => {
        router
    };
    return (
        <SafeAreaView>
            <ScrollView>
                <View className={"w-full justify-center items-center"}>
                    <View className={"w-[94%] bg-white rounded p-5"}>
                        <View>
                            <Text className={"font-semibold text-base text-txt"}>Driver's Detail</Text>
                        </View>
                        <View className={"mt-5"}>
                            <Text className={"font-open-sans text-txt"}>Here are the details of the current driver</Text>
                        </View>
                        <View className={"flex-1 mt-3"}>
                            {details.map(({label, value}, idx) => <ListItemDetail label={label} value={value} key={idx} containerStyle={"pt-2 pb-2"}/>)}
                        </View>
                        <View className={"flex-row"}>
                            <ThemedButton title={"Edit"} handlePress={handleUpdate} containerStyles={"bg-primary p-5 rounded-[50%] flex-1"} textStyles={"text-white font-semibold text-base"}
                                          icon={icons.pen}/>
                            <ThemedButton title={"Delete"} handlePress={handleDelete} containerStyles={"bg-error p-5 rounded-[50%] flex-1"} textStyles={"text-white font-semibold text-base"}
                                          icon={icons.trash}/>
                            <ThemedButton title={"Cancel"} handlePress={handleCancel} containerStyles={"bg-default p-5 rounded-[50%] flex-1"} textStyles={"text-white font-semibold text-base"}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DriverDetails;
