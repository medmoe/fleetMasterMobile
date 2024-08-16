import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {driversEntries} from "@/constants/fixtures";
import TableEntry from "@/components/TableEntry";
import ThemedButton from "@/components/ThemedButton";
import {router} from "expo-router";

const Drivers = () => {
    const addDriver = () => {
        router.replace("/forms/driver")
    }
    return (
        <SafeAreaView>
            <View className={"w-full justify-center items-center"}>
                <View className={"w-[94%] bg-white rounded pt-5 pl-5 pb-5"}>
                    <View>
                        <Text className={"font-semibold text-base text-txt"}>Driver's List</Text>
                    </View>
                    <View className={"mt-5"}>
                        <Text className={"font-open-sans text-txt"}>Here is the list of drivers</Text>
                    </View>
                    <View className={"mt-5"}>
                        <TableEntry
                            name={"Full name"}
                            numeric={"Joined date"}
                            status={"Status"}
                            note={"Vehicle"}
                            containerStyles={"mb-3"}
                            textStyles={"text-default font-semibold"}
                        />
                        {driversEntries.map((entry, idx) => {
                            return (
                                <TableEntry
                                    name={entry.fullname}
                                    numeric={entry.joinedDate}
                                    status={entry.status}
                                    note={entry.vehicleName}
                                    textStyles={"font-open-sans text-txt"}
                                    key={idx}
                                />
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
