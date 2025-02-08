import React, {useEffect} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Text, View} from "react-native";
import {maintenanceData} from "@/constants/fixtures";
import TableEntry from "@/components/TableEntry";
import {useGlobalContext} from "@/context/GlobalProvider";
import {driverStatus} from "@/constants/forms/driver";
import {vehicleStatus} from "@/constants/forms/vehicle";
import axios from "axios";
import {API} from "@/constants/endpoints";

const Dashboard = () => {
    const {responseData, setGeneralData} = useGlobalContext()
    useEffect(() => {
        const fetchGeneralData = async () => {
            const response = await axios.get(`${API}maintenance/general-data/`, {withCredentials: true})
            setGeneralData(response.data);
        }
        fetchGeneralData();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
                <View className={"w-full justify-center items-center gap-3"}>
                    <View className={"w-[94%] bg-white rounded pt-5 pl-5 pb-5"}>
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
                            {responseData.drivers?.map((driver, idx) => {
                                return (
                                    <TableEntry name={`${driver.first_name} ${driver.last_name}`}
                                                numeric={"To be implemented"}
                                                status={driver.employment_status === driverStatus.active}
                                                note={driver.notes}
                                                textStyles={"font-merriweather-regular text-txt"}
                                                key={idx}
                                    />
                                )
                            })}
                        </View>
                    </View>
                    <View className={"w-[94%] bg-white rounded pt-5 pl-5 pb-5"}>
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
                            {responseData.vehicles?.map((vehicle, idx) => {
                                return (
                                    <TableEntry
                                        name={`${vehicle.make} ${vehicle.model} ${vehicle.registration_number}`}
                                        numeric={vehicle.mileage}
                                        status={vehicle.status === vehicleStatus.active}
                                        note={vehicle.notes}
                                        key={idx}
                                        textStyles={"font-merriweather-regular text-txt"}
                                    />
                                )
                            })}
                        </View>
                    </View>
                    <View className={"w-[94%] bg-white rounded pt-5 pl-5 pb-5"}>
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
