import React from 'react';
import {ImageSourcePropType, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {CustomDatePicker, ListItemDetail, StatCard} from "@/components";
import {useGlobalContext} from "@/context/GlobalProvider";
import {VehicleType} from "@/types/types";
import {vehicleStatusMapping} from "@/constants/forms/vehicle";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {icons} from "@/constants/icons";
import {maintenanceReport, MonthReportType} from "@/constants/fixtures";

const MaintenanceReport = () => {
    const {currentItem} = useGlobalContext();
    const vehicle = currentItem as VehicleType
    const [style, label] = vehicleStatusMapping[vehicle.status];
    const statData: [string, string, string, string, ImageSourcePropType][] = Object.keys(maintenanceReport.previous_month).map((key) => {
        const label = key.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
        const previousValue = maintenanceReport.previous_month[key as keyof MonthReportType];
        const currentValue = maintenanceReport.current_month[key as keyof  MonthReportType];
        const percentage = ((parseFloat(currentValue) - parseFloat(previousValue)) / parseFloat(previousValue)) * 100;
        const color = percentage > 0 ? '#e93c0c' : '#57b269';
        const icon = percentage > 0 ? icons.up : icons.down;
        const formattedValue = formatValue(currentValue);
        const formattedPercentage = formatPercentage(percentage);

        return [label, formattedValue, formattedPercentage, color, icon];
    });


    function formatValue(value: string): string {
        const num = parseFloat(value);
        if (num >= 1000) {
            return `$${(num / 1000).toFixed(1)}k`;
        }
        return `$${num.toFixed(2)}`;
    }

    function formatPercentage(value: number): string {
        return `${value.toFixed(0)}%`;
    }

    const handleChange = (name: string) => (_: DateTimePickerEvent, date?: Date): void => {

    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View className={"w-full justify-center items-center"}>
                    <View className={"w-[94%] bg-white rounded p-3"}>
                        <View className={"w-full bg-white rounded shadow p-2"}>
                            <View className={"flex-row"}>
                                <View className={"flex-1"}>
                                    <Text className={"font-semibold text-base text-txt"}>Vehicle's information</Text>
                                    <ListItemDetail label={"Vehicle's name"} value={`${vehicle.make} ${vehicle.model} ${vehicle.year}`} textStyle={"text-txt"}/>
                                    <ListItemDetail label={"Purchase date"} value={vehicle.purchase_date} textStyle={"text-txt"}/>
                                    <ListItemDetail label={"Mileage"} value={vehicle.mileage} textStyle={"text-txt"}/>
                                    <ListItemDetail label={"Status"} value={label} textStyle={style}/>
                                </View>
                                <View className={"flex-1"}>
                                    <CustomDatePicker date={new Date()} handleChange={handleChange} label={"Filter by month"} name={"month"}/>
                                </View>
                            </View>
                        </View>
                        {/*<View className={"mt-[20px] flex-row"}>*/}
                        {/*    <StatCard label={"Total Maintenance"}*/}
                        {/*              result={"14"}*/}
                        {/*              percentage={"60%"}*/}
                        {/*              color={"#57b269"}*/}
                        {/*              icon={icons.up}*/}
                        {/*              containerStyles={"mr-[5px]"}*/}
                        {/*    />*/}
                        {/*    <StatCard label={"Total Maintenance Cost"}*/}
                        {/*              result={"$3.5k"}*/}
                        {/*              percentage={"10%"}*/}
                        {/*              icon={icons.down}*/}
                        {/*              color={"#e93c0c"}*/}
                        {/*              containerStyles={"ml-[5px]"}*/}
                        {/*    />*/}
                        {/*</View>*/}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default MaintenanceReport;
