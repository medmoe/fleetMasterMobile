import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ImageSourcePropType, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {ListItemDetail, MaintenanceReportForm, PartPurchaseEventViewer, RangeCard, Spinner, StatCard, ThemedButton} from "@/components";

import {useGlobalContext} from "@/context/GlobalProvider";
import {VehicleType} from "@/types/types";
import {vehicleStatusMapping} from "@/constants/forms/vehicle";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {icons} from "@/constants/icons";
import {partPurchaseEvents} from "@/constants/fixtures";
import axios from "axios";
import {API} from "@/constants/endpoints";
import {MaintenanceOverviewType, MaintenanceReportType, OverviewType, PartPurchaseEventType} from "@/types/maintenance";
import {router} from "expo-router";
import {getLocalDateString, isPositiveInteger} from "@/utils/helpers";

const MaintenanceReport = () => {
    const {generalData, setGeneralData} = useGlobalContext();
    const partPurchaseEventFormInitialState: PartPurchaseEventType = {
        part: "",
        provider: generalData.part_providers[0]?.id || "",
        purchase_date: getLocalDateString(new Date()),
        cost: "0"
    }
    const [partPurchaseFormData, setPartPurchaseFormData] = useState<PartPurchaseEventType>(partPurchaseEventFormInitialState);
    const [maintenanceReportDates, setMaintenanceReportDates] = useState({
        "start_date": new Date(),
        "end_date": new Date(),
        "purchase_date": new Date()
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
    const [maintenanceReport, setMaintenanceReport] = useState<OverviewType>({previous_report: {}, current_report: {}})
    const statData: [string, string, string, string, ImageSourcePropType][] = Object.keys(maintenanceReport.previous_report).map((key): any => {
        const label = key.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
        const previousValue = maintenanceReport.previous_report[key as keyof MaintenanceOverviewType];
        const currentValue = maintenanceReport.current_report[key as keyof MaintenanceOverviewType];
        const currentValueNum = parseFloat(currentValue || "0");
        const previousValueNum = parseFloat(previousValue || "0");
        let percentageChange;
        if (previousValueNum === 0) {
            percentageChange = currentValueNum === 0 ? percentageChange = 0 : 100;
        } else {
            percentageChange = ((currentValueNum - previousValueNum) / previousValueNum) * 100;
        }
        const color = percentageChange > 0 ? '#e93c0c' : '#57b269';
        const icon = percentageChange > 0 ? icons.up : icons.down;
        let formattedValue;
        const keys: string[] = ["total_maintenance_cost", "preventive_cost", "curative_cost", "total_service_cost", "mechanic", "electrician", "cleaning"]
        if (keys.includes(key)) {
            formattedValue = formatValue(currentValueNum);
        } else {
            formattedValue = currentValueNum
        }
        const formattedPercentage = formatPercentage(percentageChange);

        return [label, formattedValue, formattedPercentage, color, icon];
    });
    const pairStatData = []
    for (let i = 0; i < statData.length; i += 2) {
        pairStatData.push(statData.slice(i, i + 2));
    }
    const maintenanceReportFormInitialState: MaintenanceReportType = {
        vehicle: vehicle.id || "",
        service_provider: (generalData.service_providers?.[0]?.id) || "",
        parts: [],
        maintenance_type: "PREVENTIVE",
        start_date: "",
        end_date: "",
        cost: "0",
        mileage: vehicle.mileage,
        description: ""
    }
    const [maintenanceReportFormData, setMaintenanceReportFormData] = useState(maintenanceReportFormInitialState)
    const [activeFilter, setActiveFilter] = useState(0);
    const searchingFilterLabels: string[] = ["7D", "2W", "4W", "3M", "1Y"]
    useEffect(() => {
        const fetchGeneralData = async () => {
            setIsLoading(true);
            try {
                const [generalDataResponse, maintenanceReportResponse] = await Promise.all([
                    axios.get(`${API}maintenance/general-data/`, {withCredentials: true}),
                    axios.get(`${API}maintenance/overview/`, {
                        withCredentials: true,
                        params: {range: searchingFilterLabels[activeFilter].toLowerCase()}
                    }),
                ])
                setGeneralData(generalDataResponse.data);
                setMaintenanceReport(maintenanceReportResponse.data);
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }
        fetchGeneralData();
    }, [showMaintenanceForm, activeFilter]);

    function formatValue(num: number): string {
        if (num >= 1000) {
            return `$${(num / 1000).toFixed(1)}k`;
        }
        return `$${num.toFixed(1)}`;
    }

    function formatPercentage(value: number): string {
        return `${value.toFixed(0)}%`;
    }

    const handleFilterRangeChange = (label: string) => {
        const idx = searchingFilterLabels.indexOf(label);
        setActiveFilter(idx);
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

    const handleMaintenanceReportFormChange = (name: string, value: string) => {
        setMaintenanceReportFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const validateMaintenanceReportData = () => {
        // validate Data
        if (!maintenanceReportFormData.vehicle || !isPositiveInteger(maintenanceReportFormData.vehicle)) {
            Alert.alert("Error", "You must select a valid vehicle!")
            return false
        }
        if (!maintenanceReportFormData.service_provider || !isPositiveInteger(maintenanceReportFormData.service_provider)) {
            Alert.alert("Error", "You must select a valid service provider!")
            return false
        }
        if (!maintenanceReportDates.start_date) {
            Alert.alert("Error", "You must select a valid start date!")
            return false
        }
        if (!maintenanceReportDates.end_date) {
            Alert.alert("Error", "You must select a valid end date!")
            return false
        }
        if (!isPositiveInteger(maintenanceReportFormData.cost)) {
            Alert.alert("Error", "You must select a valid cost!")
            return false
        }
        if (!isPositiveInteger(maintenanceReportFormData.mileage)) {
            Alert.alert("Error", "You must select a valid mileage!")
            return false
        }
        return true;
    }
    const handleMaintenanceReportSubmission = async () => {
        setIsLoading(true)
        try {
            if (!validateMaintenanceReportData()) {
                return
            }
            maintenanceReportFormData.start_date = getLocalDateString(maintenanceReportDates.start_date)
            maintenanceReportFormData.end_date = getLocalDateString(maintenanceReportDates.end_date)
            const url = `${API}maintenance/reports/`
            const options = {headers: {"Content-Type": "application/json"}, withCredentials: true}
            const response = await axios.post(url, maintenanceReportFormData, options)
            setShowMaintenanceForm(false);

        } catch (error: any) {
            console.log(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }
    const handleMaintenanceReportCancellation = () => {
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
                {isLoading ?
                    <View className={"w-full justify-center items-center h-full px-4"}><Spinner isVisible={isLoading}/></View> :
                    !showMaintenanceForm ?
                        <View className={"w-full justify-center items-center"}>
                            <View className={"w-[94%] bg-white rounded p-3"}>
                                <View className={"w-full bg-white rounded shadow p-2"}>
                                    <View className={"flex-row"}>
                                        <View className={"flex-1"}>
                                            <Text className={"font-semibold text-base text-txt"}>Vehicle's
                                                information</Text>
                                            <ListItemDetail label={"Vehicle's name"}
                                                            value={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
                                                            textStyle={"text-txt"}/>
                                            <ListItemDetail label={"Purchase date"} value={vehicle.purchase_date}
                                                            textStyle={"text-txt"}/>
                                            <ListItemDetail label={"Mileage"} value={vehicle.mileage}
                                                            textStyle={"text-txt"}/>
                                            <ListItemDetail label={"Status"} value={label} textStyle={style}/>
                                        </View>
                                    </View>
                                </View>
                                <View className={"mt-[20px] flex-row"}>
                                    {searchingFilterLabels.map((label, idx) => {
                                        return <RangeCard title={label} handlePress={handleFilterRangeChange}
                                                          isActive={activeFilter === idx} key={idx}/>
                                    })}
                                </View>
                                {pairStatData.map((pair, idx) => {
                                    return (
                                        <View className={"mt-[20px] flex-row"} key={idx}>
                                            {pair.map(([label, value, percentage, color, icon], idx) => {
                                                return (
                                                    <StatCard label={label}
                                                              result={value}
                                                              percentage={percentage}
                                                              color={color}
                                                              icon={icon}
                                                              containerStyles={"mr-[5px]"}
                                                              key={idx}
                                                    />
                                                )
                                            })}
                                        </View>
                                    )

                                })}
                                <View className={"mt-5 flex-1 bg-white shadow p-2"}>
                                    <View><Text className={"font-semibold text-base text-txt"}>Auto Parts
                                        Breakdown</Text></View>
                                    {partPurchaseEvents.map((obj, idx) => <PartPurchaseEventViewer name={obj.name}
                                                                                                   provider={obj.provider}
                                                                                                   cost={obj.cost}
                                                                                                   key={idx}/>)}
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
                                               handleMaintenanceReportFormChange={handleMaintenanceReportFormChange}
                                               handleMaintenanceReportSubmission={handleMaintenanceReportSubmission}
                                               handleMaintenanceReportCancellation={handleMaintenanceReportCancellation}
                                               handlePartPurchaseFormChange={handlePartPurchaseFormChange}
                                               partPurchaseFormData={partPurchaseFormData}
                                               handlePartInputChange={handlePartInputChange}
                                               setPartPurchaseFormData={setPartPurchaseFormData}
                                               setSearchTerm={setSearchTerm}
                                               maintenanceReportDates={maintenanceReportDates}
                                               maintenanceReportFormData={maintenanceReportFormData}
                                               setMaintenanceReportFormData={setMaintenanceReportFormData}
                        />}
            </ScrollView>
        </SafeAreaView>
    );
};
export default MaintenanceReport;
