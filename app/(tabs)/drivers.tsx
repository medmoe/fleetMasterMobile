import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {DriverCardComponent, ThemedButton} from "@/components";
import {router} from "expo-router";
import {currentDriverInitialState, useGlobalContext} from "@/context/GlobalProvider";
import {DriverType} from "@/types/types";

const Drivers = () => {
    const {responseData, setVehicle, setIsPostRequest, setDriver} = useGlobalContext();
    const addDriver = () => {
        setIsPostRequest(true);
        setDriver(currentDriverInitialState);
        router.replace("/forms/driver")
    }
    const handlePress = (driver: DriverType): void => {
        setDriver(driver)
        router.replace("/details/item-details");
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View className={"w-full justify-center items-center"}>
                    <View className={"w-[94%] bg-white rounded p-5"}>
                        <View>
                            <Text className={"font-semibold text-base text-txt"}>Driver's List</Text>
                        </View>
                        <View className={"mt-5"}>
                            <Text className={"font-open-sans text-txt"}>Here is the list of drivers</Text>
                        </View>
                        <View>
                            {responseData.drivers?.map((driver, idx) =>
                                <DriverCardComponent
                                    driver={driver}
                                    onPress={() => handlePress(driver)}
                                    vehicles={responseData.vehicles}
                                    key={idx}
                                />)}
                        </View>
                        <View className={"w-full pt-5"}>
                            <ThemedButton
                                title={"Add driver"}
                                handlePress={addDriver}
                                containerStyles={"bg-secondary w-[40%] p-5 rounded-[50%]"}
                                textStyles={"font-semibold text-base text-white"}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};
export default Drivers;
