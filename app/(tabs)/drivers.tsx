import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {driversEntries} from "@/constants/fixtures";
import TableEntry from "@/components/TableEntry";

const Drivers = () => {
    return (
        <SafeAreaView>
            <View className={"w-full justify-center items-center"}>
                <View className={"w-[94%] bg-white rounded pt-5 pl-5 pb-5"}>
                    <View>
                        <Text className={"font-merriweather-bold text-txt"}>Driver's List</Text>
                    </View>
                    <View className={"mt-5"}>
                        <Text className={"font-merriweather-regular text-txt"}>Here is the list of drivers</Text>
                    </View>
                    <View className={"mt-5"}>
                        <TableEntry
                            name={"Full name"}
                            numeric={"Joined date"}
                            status={"Status"}
                            note={"Vehicle"}
                            containerStyles={"mb-3"}
                            textStyles={"text-default font-merriweather-regular"}
                        />
                        {driversEntries.map((entry, idx) => {
                            return (
                                <TableEntry
                                    name={entry.fullname}
                                    numeric={entry.joinedDate}
                                    status={entry.status}
                                    note={entry.vehicleName}
                                    textStyles={"font-merriweather-regular text-txt"}
                                    key={idx}
                                />
                            )
                        })}
                    </View>
                    <TouchableOpacity onPress={() => console.log("pressed")}>
                        <Text>Add Driver</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};
export default Drivers;
