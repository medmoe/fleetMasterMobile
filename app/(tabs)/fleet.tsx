import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {ThemedButton} from "@/components";
import {router} from "expo-router";
import {currentVehicleInitialState, useGlobalContext} from "@/context/GlobalProvider";
import VehicleCardComponent from "@/components/VehicleCardComponent";
import {VehicleType} from "@/types/types";

const Fleet = () => {
    const {responseData, setCurrentItem, setIsPostRequest} = useGlobalContext();
    const addVehicle = () => {
        setIsPostRequest(true);
        setCurrentItem(currentVehicleInitialState);
        router.replace("/forms/vehicle");
    }
    const handlePress = (vehicle: VehicleType): void => {
        setCurrentItem(vehicle);
        router.replace("/details/item-details");
    }

    const handleMaintenance = (vehicle: VehicleType) => {
        setCurrentItem(vehicle);
        router.replace("/maintenance/maintenance-report");
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View className={"w-full justify-center items-center"}>
                    <View className={"w-[94%] bg-white rounded p-5"}>
                        <View>
                            <Text className={"font-semibold text-base text-txt"}>Vehicle's list</Text>
                        </View>
                        <View className={"mt-5"}>
                            <Text className={"font-open-sans text-txt"}>Here is the list of vehicles.</Text>
                        </View>
                        <View>
                            {responseData.vehicles?.map((vehicle, idx) => {
                                return (
                                    <VehicleCardComponent vehicle={vehicle} onPress={() => handlePress(vehicle)} key={idx} handleMaintenance={() => handleMaintenance(vehicle)}/>
                                )
                            })}
                        </View>
                        <View className={"w-full pt-5"}>
                            <ThemedButton title={"Add vehicle"}
                                          handlePress={addVehicle}
                                          containerStyles={"bg-secondary w-[40%] p-5 rounded-[50%]"}
                                          textStyles={"font-semibold text-base text-white"}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


export default Fleet;
