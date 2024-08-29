import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {ThemedButton, Vehicle} from "@/components";
import {router} from "expo-router";
import {useGlobalContext} from "@/context/GlobalProvider";

const Fleet = () => {
    const {responseData} = useGlobalContext();
    const addVehicle = () => {
        router.replace("/forms/vehicle");
    }
    return (
        <SafeAreaView>
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
                                <Vehicle vehicle={vehicle} onPress={() => console.log("pressed")} key={idx}/>
                            )
                        })}
                    </View>
                    <View className={"w-full pt-5"}>
                        <ThemedButton title={"Add vehicle"}
                                      handlePress={addVehicle}
                                      containerStyles={"bg-secondary w-[40%] p-5 rounded-[50%]"}
                                      textStyles={"text-txt font-semibold text-base text-white"}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};


export default Fleet;
