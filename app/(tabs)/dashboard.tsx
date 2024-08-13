import React from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Text, View} from "react-native";
import {drivers, maintenanceData, trucks} from "@/constants/fixtures";
import TableEntry from "@/components/TableEntry";

const Dashboard = () => {
    const handlePress = () => {

    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View className={"w-full justify-center items-center gap-3"}>
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
                    <View className={"w-[90%] bg-white rounded pt-5 pl-5 pb-5"}>
                        <View>
                            <Text className={"font-merriweather-bold text-txt"}>Trucks Overview</Text>
                        </View>
                        <View className={"mt-5"}>
                            <TableEntry
                                name={"Name"}
                                numeric={"Mileage"}
                                status={"Status"}
                                note={"Note"}
                                containerStyles={"mb-3"}
                                textStyles={"text-default font-merriweather-regular"}
                            />
                            {trucks.map(([name, status, mileage, note], idx) => {
                                return (
                                    <TableEntry
                                        name={name}
                                        numeric={mileage}
                                        status={status}
                                        note={note}
                                        key={idx}
                                        textStyles={"font-merriweather-regular text-txt"}
                                    />
                                )
                            })}
                        </View>
                    </View>
                    <View className={"w-[90%] bg-white rounded pt-5 pl-5 pb-5"}>
                        <View>
                            <Text className={"font-merriweather-bold text-txt"}>Maintenance Overview</Text>
                        </View>
                        <View className={"mt-5"}>
                            <TableEntry name={"Name"}
                                        numeric={"Date"}
                                        status={"Type"}
                                        note={"Provider"}
                                        containerStyles={"mb-3"}
                                        textStyles={"text-default font-merriweather-regular"}/>
                            {maintenanceData.map((entry, idx) => {
                                return (
                                    <TableEntry name={entry.truckName}
                                                numeric={entry.dueDate}
                                                status={entry.maintenanceType}
                                                note={entry.provider}
                                                key={idx}
                                                textStyles={"font-merriweather-regular text-txt"}
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
