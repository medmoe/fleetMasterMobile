import React, {useCallback, useState} from 'react';
import {ImageSourcePropType, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {CustomDatePicker, ListItemDetail, MaintenanceForm, PartPurchaseEventViewer, StatCard, ThemedButton} from "@/components";
import {useGlobalContext} from "@/context/GlobalProvider";
import {VehicleType} from "@/types/types";
import {vehicleStatusMapping} from "@/constants/forms/vehicle";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {icons} from "@/constants/icons";
import {maintenanceReport, MonthReportType, partPurchaseEvents} from "@/constants/fixtures";

const MaintenanceReport = () => {
    const [cost, setCost] = useState("0");
    const [inputValue, setInputValue] = useState<{ id: string, name: string }>({id: "-1", name: ""});
    const [isPartSelected, setIsSelected] = useState(false);
    const setIsPartSelected = useCallback((isSelected: boolean) => {
        setIsSelected(isSelected);
    }, [])
    const parts = [
        {id: '1', name: 'Air Filter'},
        {id: '2', name: 'Battery'},
        {id: '3', name: 'Brake Pads'},
        {id: '4', name: 'Catalytic Converter'},
        {id: '5', name: 'Engine Oil'},
        {id: '6', name: 'Fuel Filter'},
        {id: '7', name: 'Headlights'},
        {id: '8', name: 'Muffler'},
        {id: '9', name: 'Oil Filter'},
        {id: '10', name: 'Radiator'},
        {id: '11', name: 'Spark Plugs'},
        {id: '12', name: 'Tire Pressure Sensor'},
        {id: '13', name: 'Transmission Fluid'},
        {id: '14', name: 'Wiper Blades'},
    ];
    const [showMaintenanceForm, setShowMaintenanceForm] = useState<boolean>(false);
    const {currentItem} = useGlobalContext();
    const vehicle = currentItem as VehicleType
    const [style, label] = vehicleStatusMapping[vehicle.status];
    const statData: [string, string, string, string, ImageSourcePropType][] = Object.keys(maintenanceReport.previous_month).map((key) => {
        const label = key.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
        const previousValue = maintenanceReport.previous_month[key as keyof MonthReportType];
        const currentValue = maintenanceReport.current_month[key as keyof MonthReportType];
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
    const startRecordingMaintenance = () => {
        setShowMaintenanceForm(true);
    }
    const cancelRecordingMaintenance = () => {

    }
    const selectPart = (name: string, id: string) => {
        setInputValue(prevState => ({id, name}))
        setIsSelected(true);
    }

    const handlePartInputChange = (name: string, value: string): void => {
        setInputValue(prevState => ({...prevState, name: value}))
    }
    const handleDateChange = (name: string) => (_: DateTimePickerEvent, date: Date | undefined) => {

    }
    const handleEndDateChange = (name: string) => (_: DateTimePickerEvent, date: Date | undefined) =>  {

    }
    const handleStartDateChange = (name: string) => (_: DateTimePickerEvent, date: Date | undefined) => {

    }
    const handleCostChange = (name: string, value: string) => {
        setCost(value);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {!showMaintenanceForm ?
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
                            <View className={"mt-[20px] flex-row"}>
                                <StatCard label={"Total Maintenance"}
                                          result={"14"}
                                          percentage={"60%"}
                                          color={"#57b269"}
                                          icon={icons.up}
                                          containerStyles={"mr-[5px]"}
                                />
                                <StatCard label={"Total Maintenance Cost"}
                                          result={"$3.5k"}
                                          percentage={"10%"}
                                          icon={icons.down}
                                          color={"#e93c0c"}
                                          containerStyles={"ml-[5px]"}
                                />
                            </View>
                            <View className={"mt-5 flex-1 bg-white shadow p-2"}>
                                <View><Text className={"font-semibold text-base text-txt"}>Auto Parts Breakdown</Text></View>
                                {partPurchaseEvents.map((obj, idx) => <PartPurchaseEventViewer name={obj.name} provider={obj.provider} cost={obj.cost} key={idx}/>)}
                            </View>
                            <View className={"mt-5"}>
                                <ThemedButton title={"Record maintenance"}
                                              handlePress={startRecordingMaintenance}
                                              containerStyles={"bg-primary w-full p-5 rounded-[50%]"}
                                              textStyles={"text-white font-semibold text-base"}/>
                                <ThemedButton title={"Cancel"}
                                              handlePress={cancelRecordingMaintenance}
                                              containerStyles={"bg-default w-full p-5 rounded-[50%] mt-5"}
                                              textStyles={"text-white font-semibold text-base"}
                                />
                            </View>

                        </View>
                    </View>
                    :
                    <MaintenanceForm isPartSelected={isPartSelected}
                                     setIsPartSelected={setIsPartSelected}
                                     selectPart={selectPart}
                                     parts={parts}
                                     handlePartInputChange={handlePartInputChange}
                                     inputValue={inputValue}
                                     handleDateChange={handleDateChange}
                                     handleCostChange={handleCostChange}
                                     cost={cost}
                                     handleEndDateChange={handleEndDateChange}
                                     handleStartDateChange={handleStartDateChange}
                    />}
            </ScrollView>
        </SafeAreaView>
    );
};
export default MaintenanceReport;
