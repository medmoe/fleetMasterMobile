import React, {useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {icons} from "@/constants/icons"
import {ScrollView, View, Text} from "react-native";
import {drivers, trucks} from "@/constants/fixtures";
import TableEntry from "@/components/TableEntry";

const Dashboard = () => {
    const handlePress = () => {

    }
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{height: "100%"}}>
                <View className={"w-full justify-center items-center"}>
                    <View className={"w-[90%] bg-white rounded pt-5 pl-5 pb-5"}>
                        <View>
                            <Text className={"font-merriweather-bold text-txt"}>Drivers Overview</Text>
                        </View>
                        <View className={"mt-5"}>
                            <TableEntry name={"Name"}
                                        numeric={"Grade"}
                                        status={"Status"}
                                        note={"Note"}
                                        containerStyles={"mb-3"}
                                        textStyles={"text-default font-merriweather-regular"}
                            />
                            {drivers.map(([name, grade, status, note], idx) => {
                                return (
                                    <TableEntry name={name}
                                                numeric={grade}
                                                status={status}
                                                note={note}
                                                textStyles={"font-merriweather-regular text-txt"}
                                                key={idx}
                                    />
                                )
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
);
};

export default Dashboard;
