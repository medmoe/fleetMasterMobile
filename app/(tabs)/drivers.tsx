import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Driver, ThemedButton} from "@/components";
import {router} from "expo-router";
import {useGlobalContext} from "@/context/GlobalProvider";

const Drivers = () => {
    const {responseData} = useGlobalContext();
    const addDriver = () => {
        router.replace("/forms/driver")
    }
    return (
        <SafeAreaView>
            <View className={"w-full justify-center items-center"}>
                <View className={"w-[94%] bg-white rounded p-5"}>
                    <View>
                        <Text className={"font-semibold text-base text-txt"}>Driver's List</Text>
                    </View>
                    <View className={"mt-5"}>
                        <Text className={"font-open-sans text-txt"}>Here is the list of drivers</Text>
                    </View>
                    <View>
                        {responseData.drivers?.map((driver, idx) => {
                            return (
                                <Driver driver={driver} onPress={() => console.log("pressed")} key={idx}/>
                            )
                        })}

                    </View>
                    <View className={"w-full pt-5"}>
                        <ThemedButton title={"Add driver"}
                                      handlePress={addDriver}
                                      containerStyles={"bg-secondary w-[40%] p-5 rounded-[50%]"}
                                      textStyles={"text-txt font-semibold text-base text-white"}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
};
export default Drivers;
