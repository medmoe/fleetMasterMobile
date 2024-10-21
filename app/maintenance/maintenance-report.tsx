import React, {useCallback, useEffect, useState} from 'react';
import {ImageSourcePropType, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {CustomDatePicker, ListItemDetail, MaintenanceReportForm, PartPurchaseEventViewer, StatCard, ThemedButton} from "@/components";
import {useGlobalContext} from "@/context/GlobalProvider";
import {VehicleType} from "@/types/types";
import {vehicleStatusMapping} from "@/constants/forms/vehicle";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {icons} from "@/constants/icons";
import {maintenanceReport, MonthReportType, partPurchaseEvents} from "@/constants/fixtures";
import axios from "axios";
import {API} from "@/constants/endpoints";
import {PartPurchaseEventType} from "@/types/maintenance";
import {router} from "expo-router";
import {getLocalDateString} from "@/utils/helpers";

const MaintenanceReport = () => {
    const {generalData, setGeneralData} = useGlobalContext();
    const partPurchaseEventFormInitialState: PartPurchaseEventType = {part: "", provider: generalData.part_providers[0]?.id || "", purchase_date: getLocalDateString(new Date()), cost: "0"}
    const [partPurchaseFormData, setPartPurchaseFormData] = useState<PartPurchaseEventType>(partPurchaseEventFormInitialState);
    const [maintenanceReportDates, setMaintenanceReportDates] = useState({
        "start_date": new Date(), "end_date": new Date(), "purchase_date": new Date()
    })
    const [searchTerm, setSearchTerm] = useState("");
    const [isPartSelected, setIsSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const setIsPartSelected = useCallback((isSelected: boolean) => {
        setIsSelected(isSelected);
    }, [])

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
    useEffect(() => {
        const fetchGeneralData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${API}maintenance/general-data/`, {withCredentials: true})
                setGeneralData(response.data);
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }
        fetchGeneralData();
    }, [showMaintenanceForm]);

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
        router.replace('/fleet');
    }
    const selectPart = (name: string, id: string) => {
        setSearchTerm(name);
        setPartPurchaseFormData(prevState => ({
            ...prevState,
            part: id
        }))
        setIsSelected(true);
    }
    const handleDateChange = (name: string) => (_: DateTimePickerEvent, date?: Date) => {
        setMaintenanceReportDates(prevState => ({
            ...prevState,
            [name]: date
        }))
    }

    const handleReportFormChange = (name: string, value: string) => {

    }
    const handleReportSubmission = () => {

    }
    const cancelReportSubmission = () => {
        setShowMaintenanceForm(false);
    }
    const handlePartPurchaseFormChange = (name: string, value: string) => {
        setPartPurchaseFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handlePartInputChange = (name: string, value: string) => {
        setSearchTerm(value);
    }
    const handleNewPartAddition = () => {
        router.replace('/forms/part');
    }
    const handleNewPartsProviderAddition = () => {
        router.replace('/forms/part-provider')
    }
    const handleNewServiceProviderAddition = () => {
        router.replace('/forms/service-provider')
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
                            <ThemedButton title={"Add New Part"}
                                          handlePress={handleNewPartAddition}
                                          containerStyles={"bg-secondary w-full p-5 rounded-[50%] mt-3"}
                                          textStyles={"text-white font-semibold text-base"}
                            />
                            <ThemedButton title={"Add New Service Provider"}
                                          handlePress={handleNewServiceProviderAddition}
                                          containerStyles={"bg-secondary w-full p-5 rounded-[50%] mt-3"}
                                          textStyles={"text-white font-semibold text-base"}
                            />
                            <ThemedButton title={"Add New Parts Provider"}
                                          handlePress={handleNewPartsProviderAddition}
                                          containerStyles={"bg-secondary w-full p-5 rounded-[50%] mt-3"}
                                          textStyles={"text-white font-semibold text-base"}
                            />
                            <ThemedButton title={"Record maintenance"}
                                          handlePress={startRecordingMaintenance}
                                          containerStyles={"bg-primary w-full p-5 rounded-[50%] mt-3"}
                                          textStyles={"text-white font-semibold text-base"}/>
                            <ThemedButton title={"Cancel"}
                                          handlePress={cancelRecordingMaintenance}
                                          containerStyles={"bg-default w-full p-5 rounded-[50%] mt-3"}
                                          textStyles={"text-white font-semibold text-base"}
                            />
                        </View>


                    </View>
                    :
                    <MaintenanceReportForm isPartSelected={isPartSelected}
                                           setIsPartSelected={setIsPartSelected}
                                           selectPart={selectPart}
                                           searchTerm={searchTerm}
                                           handleDateChange={handleDateChange}
                                           handleMaintenanceReportFormChange={handleReportFormChange}
                                           handleMaintenanceReportSubmission={handleReportSubmission}
                                           handleMaintenanceReportCancellation={cancelReportSubmission}
                                           handlePartPurchaseFormChange={handlePartPurchaseFormChange}
                                           partPurchaseFormData={partPurchaseFormData}
                                           handlePartInputChange={handlePartInputChange}
                                           setPartPurchaseFormData={setPartPurchaseFormData}
                                           setSearchTerm={setSearchTerm}
                                           maintenanceReportDates={maintenanceReportDates}
                    />}
            </ScrollView>
        </SafeAreaView>
    );
};
export default MaintenanceReport;
