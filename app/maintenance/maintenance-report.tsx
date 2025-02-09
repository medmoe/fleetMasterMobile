import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ImageSourcePropType, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {ListItemDetail, MaintenanceReportForm, RangeCard, Spinner, StatCard, ThemedButton} from "@/components";

import {useGlobalContext} from "@/context/GlobalProvider";
import {VehicleType} from "@/types/types";
import {vehicleStatusMapping} from "@/constants/forms/vehicle";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {icons} from "@/constants/icons";
import axios from "axios";
import {API} from "@/constants/endpoints";
import {
    MaintenanceOverviewType,
    MaintenanceReportType,
    MaintenanceSummaryType,
    PartPurchaseEventType,
    ServiceProviderEventType,
    ServiceProviderType
} from "@/types/maintenance";
import {router} from "expo-router";
import {getLocalDateString, isPositiveInteger} from "@/utils/helpers";


const MaintenanceReport = () => {
    const {generalData, setGeneralData, currentItem} = useGlobalContext();
    const partPurchaseEventFormInitialState: PartPurchaseEventType = {
        part: {
            name: "",
            description: "",
        },
        provider: {
            name: "",
            address: "",
            phone_number: "",
        },
        purchase_date: "",
        cost: "",
    }
    const ServiceProviderEventFormInitialState: ServiceProviderEventType = {
        service_provider: {
            name: "",
            phone_number: "",
            address: "",
            service_type: "MECHANIC"
        },
        service_date: "",
        cost: "",
        description: ""
    }
    const [partPurchaseEventFormData, setPartPurchaseEventFormData] = useState<PartPurchaseEventType>(partPurchaseEventFormInitialState);
    const [serviceProviderEventFormData, setServiceProviderEventFormData] = useState<ServiceProviderEventType>(ServiceProviderEventFormInitialState);
    const [showServiceProviderEventForm, setShowServiceProviderEventForm] = useState(false);
    const [isServiceProviderEventFormDataEdition, setIsServiceProviderEventFormDataEdition] = useState(false);
    const [indexOfServiceProviderEventToEdit, setIndexOfServiceProviderEventToEdit] = useState<number | undefined>();
    const [maintenanceReportDates, setMaintenanceReportDates] = useState({
        "start_date": new Date(),
        "end_date": new Date(),
        "purchase_date": new Date()
    })
    const [eventsDates, setEventsDates] = useState({
        "purchase_date": new Date(),
        "service_date": new Date(),
    })
    const [searchTerm, setSearchTerm] = useState("");
    const [isPartSelected, setIsSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const setIsPartSelected = useCallback((isSelected: boolean) => {
        setIsSelected(isSelected);
    }, [])
    const [showMaintenanceForm, setShowMaintenanceForm] = useState<boolean>(false);
    const vehicle = currentItem as VehicleType
    const [style, label] = vehicleStatusMapping[vehicle.status];
    const [maintenanceReport, setMaintenanceReport] = useState<MaintenanceOverviewType>({
        previous_report: {},
        current_report: {},
    })
    const statData: [string, string, string, string, ImageSourcePropType][] = Object.keys(maintenanceReport.previous_report || {}).map((key): any => {
        const label = key.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
        const previousValue = maintenanceReport.previous_report[key as keyof MaintenanceSummaryType];
        const currentValue = maintenanceReport.current_report[key as keyof MaintenanceSummaryType];
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
        maintenance_type: "PREVENTIVE",
        start_date: "",
        end_date: "",
        mileage: vehicle.mileage,
        description: "",
        part_purchase_events: [],
        service_provider_events: [],
        vehicle_events: [],
    }
    const [maintenanceReportFormData, setMaintenanceReportFormData] = useState(maintenanceReportFormInitialState)
    const [activeFilter, setActiveFilter] = useState(0);
    const searchingFilterLabels: string[] = ["7D", "2W", "4W", "3M", "1Y"]
    const [showDeleteFeaturesForPartPurchaseEvent, setShowDeleteFeaturesForPartPurchaseEvent] = useState<boolean>(false);
    const [isLoadingGeneral, setIsLoadingGeneral] = useState(false);
    const [isLoadingMaintenance, setIsLoadingMaintenance] = useState(false);

    useEffect(() => {
        const fetchMaintenanceReport = async () => {
            try {
                const response = await axios.get(`${API}maintenance/overview/`, {withCredentials: true});
                setMaintenanceReport(response.data);
            } catch (error: any) {
                console.error("Error fetching maintenance report:", error);
            }
        }
        fetchMaintenanceReport();
    }, []);

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
        setPartPurchaseEventFormData(prevState => ({
            ...prevState,
            part: {
                ...prevState.part,
                id: +id
            }
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
        if (!maintenanceReportDates.start_date) {
            Alert.alert("Error", "You must select a valid start date!")
            return false
        }
        if (!maintenanceReportDates.end_date) {
            Alert.alert("Error", "You must select a valid end date!")
            return false
        }
        if (new Date(maintenanceReportDates.end_date) <= new Date(maintenanceReportDates.start_date)) {
            Alert.alert("Error", "End date must be greater than start date!");
            return false;
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
    const handlePartPurchaseEventFormChange = (name: string, value: string) => {
        setPartPurchaseEventFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleServiceProviderEventFormChange = (name: string, value: string) => {
        setServiceProviderEventFormData((prevState) => {
            if (name === "service_provider") {
                const keyValuePairs = value.split(",")
                const serviceProvider: ServiceProviderType = {name: "", phone_number: "", address: "", service_type: "MECHANIC"}
                keyValuePairs.forEach((pair) => {
                    const [key, value] = pair.split(":")
                    serviceProvider[key as keyof ServiceProviderType] = value as any
                })
                return {
                    ...prevState,
                    service_provider: serviceProvider
                }
            }
            return {
                ...prevState,
                [name]: value,
            }
        })
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
    const removePartPurchaseEventsOnCancel = async () => {

    }
    const handlePartPurchaseEventAddition = () => {
        setMaintenanceReportFormData(prevState => ({
            ...prevState,
            part_purchase_events: [...prevState.part_purchase_events, partPurchaseEventFormData]
        }))
    }
    const handleServiceProviderEventAddition = (index: number | undefined) => {
        if (index === undefined) {
            setMaintenanceReportFormData(prevState => ({
                ...prevState,
                service_provider_events: [...prevState.service_provider_events, serviceProviderEventFormData]
            }))
        } else {
            setMaintenanceReportFormData(prevState => ({
                ...prevState,
                service_provider_events: [
                    ...prevState.service_provider_events.slice(0, index),
                    serviceProviderEventFormData,
                    ...prevState.service_provider_events.slice(index + 1)
                ]
            }))
            setIndexOfServiceProviderEventToEdit(undefined);
            setIsServiceProviderEventFormDataEdition(false);
            setServiceProviderEventFormData(ServiceProviderEventFormInitialState);
        }
        setShowServiceProviderEventForm(false);
    }
    const handleServiceProviderEventDeletion = (index: number) => {
        setMaintenanceReportFormData(prevState => ({
            ...prevState,
            service_provider_events: [
                ...prevState.service_provider_events.slice(0, index),
                ...prevState.service_provider_events.slice(index + 1)
            ]
        }))
        setServiceProviderEventFormData(ServiceProviderEventFormInitialState);
        setIsServiceProviderEventFormDataEdition(false);
    }
    const handleServiceProviderEventEdition = (index: number) => {
        setServiceProviderEventFormData(maintenanceReportFormData.service_provider_events[index])
        setShowServiceProviderEventForm(true);
        setIsServiceProviderEventFormDataEdition(true);
        setIndexOfServiceProviderEventToEdit(index);
    }

    const handleEventsDateChange = (name: string) => (_: DateTimePickerEvent, date?: Date) => {
        setEventsDates(prevState => ({
            ...prevState,
            [name]: date
        }))
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
                                    {/*{maintenanceReport.part_purchase_events?.map((obj, idx) => (<PartPurchaseEventViewer*/}
                                    {/*    name={obj.part_details.name}*/}
                                    {/*    provider={obj.provider_details.name}*/}
                                    {/*    cost={obj.cost}*/}
                                    {/*    purchase_date={obj.purchase_date}*/}
                                    {/*    key={idx}/>)) || []}*/}
                                </View>
                                <ThemedButton title={"Add New Part"}
                                              handlePress={handleNewPartAddition}
                                              containerStyles={"bg-secondary w-full p-5 rounded mt-3"}
                                              textStyles={"text-white font-semibold text-base"}
                                />
                                <ThemedButton title={"Add New Service Provider"}
                                              handlePress={handleNewServiceProviderAddition}
                                              containerStyles={"bg-secondary w-full p-5 rounded mt-3"}
                                              textStyles={"text-white font-semibold text-base"}
                                />
                                <ThemedButton title={"Add New Parts Provider"}
                                              handlePress={handleNewPartsProviderAddition}
                                              containerStyles={"bg-secondary w-full p-5 rounded mt-3"}
                                              textStyles={"text-white font-semibold text-base"}
                                />
                                <ThemedButton title={"Record maintenance"}
                                              handlePress={startRecordingMaintenance}
                                              containerStyles={"bg-primary w-full p-5 rounded mt-3"}
                                              textStyles={"text-white font-semibold text-base"}/>
                                <ThemedButton title={"Cancel"}
                                              handlePress={cancelRecordingMaintenance}
                                              containerStyles={"bg-default w-full p-5 rounded mt-3"}
                                              textStyles={"text-white font-semibold text-base"}
                                />
                            </View>
                        </View>
                        :
                        <MaintenanceReportForm eventsDates={eventsDates}
                                               handleDateChange={handleDateChange}
                                               handleEventsDateChange={handleEventsDateChange}
                                               handleMaintenanceReportCancellation={handleMaintenanceReportCancellation}
                                               handleMaintenanceReportFormChange={handleMaintenanceReportFormChange}
                                               handleMaintenanceReportSubmission={handleMaintenanceReportSubmission}
                                               handlePartInputChange={handlePartInputChange}
                                               handlePartPurchaseEventAddition={handlePartPurchaseEventAddition}
                                               handlePartPurchaseFormChange={handlePartPurchaseEventFormChange}
                                               handleServiceProviderEventAddition={handleServiceProviderEventAddition}
                                               handleServiceProviderEventEdition={handleServiceProviderEventEdition}
                                               handleServiceProviderEventFormChange={handleServiceProviderEventFormChange}
                                               indexOfServiceProviderEventToEdit={indexOfServiceProviderEventToEdit}
                                               isPartSelected={isPartSelected}
                                               isServiceProviderEventFormDataEdition={isServiceProviderEventFormDataEdition}
                                               maintenanceReportDates={maintenanceReportDates}
                                               maintenanceReportFormData={maintenanceReportFormData}
                                               partPurchaseFormData={partPurchaseEventFormData}
                                               searchTerm={searchTerm}
                                               selectPart={selectPart}
                                               serviceProviderEventFormData={serviceProviderEventFormData}
                                               setIsPartSelected={setIsPartSelected}
                                               setMaintenanceReportFormData={setMaintenanceReportFormData}
                                               setPartPurchaseFormData={setPartPurchaseEventFormData}
                                               setSearchTerm={setSearchTerm}
                                               setShowDeleteFeaturesForPartPurchaseEvent={setShowDeleteFeaturesForPartPurchaseEvent}
                                               setShowServiceProviderEventForm={setShowServiceProviderEventForm}
                                               showDeleteFeaturesForPartPurchaseEvent={showDeleteFeaturesForPartPurchaseEvent}
                                               showServiceProviderEventForm={showServiceProviderEventForm}
                                               handleServiceProviderEventDeletion={handleServiceProviderEventDeletion}
                        />}
            </ScrollView>
        </SafeAreaView>
    );
};
export default MaintenanceReport;
