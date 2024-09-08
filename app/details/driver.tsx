import React, {useState} from 'react';
import {Alert, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useGlobalContext} from "@/context/GlobalProvider";
import {ListItemDetail, ThemedButton} from "@/components";
import {icons} from "@/constants/icons";
import {DriverType, VehicleType} from "@/types/types";
import {getVehicleName} from "@/utils/helpers";
import {router} from "expo-router";
import {API} from "@/constants/endpoints";
import axios from "axios";
import {handleAuthenticationErrors} from "@/utils/authentication";

const getDriverDetails = (vehicles: VehicleType[] | undefined, driverData: DriverType): { label: string, value: string }[] => {
    return Object.entries(driverData).map(([label, value]) => {
        label = label.charAt(0).toUpperCase() + label.slice(1).replace(/_/g, " ");
        if (label === "Vehicle") {
            value = getVehicleName(vehicles, driverData);
        }
        return {label, value}
    })
}

const DriverDetails = () => {
    const {currentDriver, responseData, setResponseData, setIsPostRequest} = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const {id, profile_picture, created_at, updated_at, profile, ...driverData} = currentDriver;
    const details = getDriverDetails(responseData.vehicles, driverData);
    const handleUpdate = () => {
        setIsPostRequest(false);
        router.replace("/forms/driver");
    }
    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const _ = await axios.delete(`${API}drivers/${currentDriver.id}/`)
            const drivers = responseData.drivers?.filter(driver => driver.id !== currentDriver.id)
            setResponseData({
                ...responseData,
                drivers: drivers
            })
            router.replace("/drivers")
        } catch (error) {
            const errorMessage: string = handleAuthenticationErrors(error);
            Alert.alert("Error", errorMessage);
        } finally {
            setIsLoading(false);
        }
    }
    const handleCancel = () => {
        router.replace("/drivers");
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
