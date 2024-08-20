import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {TableEntry, ThemedButton} from "@/components";
import {router} from "expo-router";
import {trucks} from "@/constants/fixtures";

const Fleet = () => {
    const addVehicle = () => {
        router.replace("/forms/vehicle");
    }
    return (
        <SafeAreaView>
            <View className={"w-full justify-center items-center"}>
                <View className={"w-[94%] bg-white rounded pt-5 pl-5 pb-5"}>
                    <View>
                        <Text className={"font-semibold text-base text-txt"}>Vehicle's list</Text>
                    </View>
                    <View className={"mt-5"}>
                        <Text className={"font-open-sans text-txt"}>Here is the list of vehicles.</Text>
                    </View>
                    <View className={"mt-5"}>
                        <TableEntry name={"Name"}
                                    numeric={"Mileage"}
                                    status={"Status"}
                                    note={"Note"}
                                    containerStyles={"mb-3"}
                                    textStyles={"text-default font-semibold"}
                        />
                        {trucks.map(([name, status, mileage, note], idx) => {
                            return (
                                <TableEntry name={name}
                                            numeric={Number(mileage).toLocaleString('en')}
                                            status={status}
                                            note={note}
                                            textStyles={"font-open-sans text-txt"}
                                            key={idx}
                                />
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
