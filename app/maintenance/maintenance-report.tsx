import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ImageSourcePropType, Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {ListItemDetail, MaintenanceReportForm, RangeCard, Spinner, StatCard, ThemedButton} from "@/components";

import {useGlobalContext} from "@/context/GlobalProvider";
import {vehicleStatusMapping} from "@/constants/forms/vehicle";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {icons} from "@/constants/icons";
import axios from "axios";
import {API} from "@/constants/endpoints";
import {
    MaintenanceOverviewType,
    MaintenanceReportType,
    MaintenanceReportWithStringsType,
    MaintenanceSummaryType,
    PartProviderType,
    PartPurchaseEventType,
    ServiceProviderEventType,
    ServiceProviderType
} from "@/types/maintenance";
import {router} from "expo-router";
import {getLocalDateString, isPositiveInteger} from "@/utils/helpers";
import FontAwesome from "@expo/vector-icons/FontAwesome";


const MaintenanceReport = () => {
    const {vehicle, setMaintenanceReports, maintenanceReports} = useGlobalContext();
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
        purchase_date: getLocalDateString(new Date()),
        cost: "0",
    }
    const ServiceProviderEventFormInitialState: ServiceProviderEventType = {
        service_provider: {
            name: "",
            phone_number: "",
            address: "",
            service_type: "MECHANIC"
        },
        service_date: getLocalDateString(new Date()),
        cost: "0",
        description: ""
    }
    const [partPurchaseEventFormData, setPartPurchaseEventFormData] = useState<PartPurchaseEventType>(partPurchaseEventFormInitialState);
    const [showPartPurchaseEventForm, setShowPartPurchaseEventForm] = useState(false);
    const [isPartPurchaseEventFormDataEdition, setIsPartPurchaseEventFormDataEdition] = useState(false);
    const [indexOfPartPurchaseEventToEdit, setIndexOfPartPurchaseEventToEdit] = useState<number | undefined>();
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
        vehicle: vehicle.id,
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
                id: id,
                name: name
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
    const validateMaintenanceReportData = (formatedMaintenanceReportFormData: MaintenanceReportWithStringsType) => {
        // validate Data
        if (!formatedMaintenanceReportFormData.vehicle) {
            Alert.alert("Error", "You must select a vehicle!")
            return false
        }
        if (!formatedMaintenanceReportFormData.start_date) {
            Alert.alert("Error", "You must select a valid start date!")
            return false
        }
        if (!formatedMaintenanceReportFormData.end_date) {
            Alert.alert("Error", "You must select a valid end date!")
            return false
        }
        if (new Date(formatedMaintenanceReportFormData.end_date) < new Date(formatedMaintenanceReportFormData.start_date)) {
            Alert.alert("Error", "End date must be greater than start date!");
            return false;
        }
        if (!isPositiveInteger(formatedMaintenanceReportFormData.mileage)) {
            Alert.alert("Error", "You must select a valid mileage!")
            return false
        }
        if (formatedMaintenanceReportFormData.service_provider_events.length === 0) {
            Alert.alert("Error", "You must create a service provider event")
            return false
        }
        return true
    }
    const formatMaintenanceReportFormData = (): MaintenanceReportWithStringsType => {
        setMaintenanceReportFormData(prevState => ({
            ...prevState,
            start_date: getLocalDateString(maintenanceReportDates.start_date),
            end_date: getLocalDateString(maintenanceReportDates.end_date),
        }))
        return {
            ...maintenanceReportFormData,
            part_purchase_events: maintenanceReportFormData.part_purchase_events.map((partPurchaseEvent) => {
                if (!partPurchaseEvent.part.id || !partPurchaseEvent.provider.id) {
                    throw new Error("Either Part or Provider are not given!")
                }
                return {
                    ...partPurchaseEvent,
                    part: partPurchaseEvent.part.id,
                    provider: partPurchaseEvent.provider.id
                }
            }),
            service_provider_events: maintenanceReportFormData.service_provider_events.map((serviceProviderEvent) => {
                if (!serviceProviderEvent.service_provider.id) {
                    throw new Error("Service Provider is not given!")
                }
                return {
                    ...serviceProviderEvent,
                    service_provider: serviceProviderEvent.service_provider.id
                }
            }),
        }
    }
    const handleMaintenanceReportSubmission = async () => {
        setIsLoading(true)
        try {
            const formatedMaintenanceReportFormData = formatMaintenanceReportFormData();
            if (!validateMaintenanceReportData(formatedMaintenanceReportFormData)) {
                return
            }
            const url = `${API}maintenance/reports/`
            const options = {headers: {"Content-Type": "application/json"}, withCredentials: true}
            const response = await axios.post(url, formatedMaintenanceReportFormData, options)
            setShowMaintenanceForm(false);
            setMaintenanceReports([...maintenanceReports, response.data])

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
        setPartPurchaseEventFormData((prevState) => {
            if (name === "provider") {
                const keyValuePairs = value.split(",")
                const partProvider: PartProviderType = {name: "", address: "", phone_number: ""}
                keyValuePairs.forEach((pair) => {
                    const [key, value] = pair.split(":")
                    partProvider[key as keyof PartProviderType] = value
                })
                return {
                    ...prevState,
                    provider: partProvider
                }
            }
            return {
                ...prevState,
                [name]: value,
            }
        })
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
    const handlePartInputChange = (_: string, value: string) => {
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
    const validatePartPurchaseEventFormData = (partPurchaseEventFormData: PartPurchaseEventType): boolean => {
        const {part, provider, purchase_date} = partPurchaseEventFormData;
        if (!part.name) {
            Alert.alert("Error", "You must select an available part!")
            return false
        }
        if (!provider.name) {
            Alert.alert("Error", "You must select a provider!")
            return false
        }
        if (!purchase_date) {
            Alert.alert("Error", "You must select a purchase date!")
            return false
        }
        return true;
    }
    const handlePartPurchaseEventAddition = (index: number | undefined) => {
        if (!validatePartPurchaseEventFormData(partPurchaseEventFormData)) {
            return
        }
        if (index === undefined) {
            setMaintenanceReportFormData(prevState => ({
                ...prevState,
                part_purchase_events: [...prevState.part_purchase_events, partPurchaseEventFormData]
            }))
        } else {
            setMaintenanceReportFormData(prevState => ({
                ...prevState,
                part_purchase_events: [
                    ...prevState.part_purchase_events.slice(0, index),
                    partPurchaseEventFormData,
                    ...prevState.part_purchase_events.slice(index + 1)
                ]
            }))
            setIndexOfPartPurchaseEventToEdit(undefined);
            setIsPartPurchaseEventFormDataEdition(false);
        }
        setShowPartPurchaseEventForm(false)
        setPartPurchaseEventFormData(partPurchaseEventFormInitialState);
        setSearchTerm("");
    }
    const handlePartPurchaseEventDeletion = (index: number) => {
        setMaintenanceReportFormData(prevState => ({
            ...prevState,
            part_purchase_events: [
                ...prevState.part_purchase_events.slice(0, index),
                ...prevState.part_purchase_events.slice(index + 1)
            ]
        }))
    }
    const handlePartPurchaseEventEdition = (index: number) => {
        setPartPurchaseEventFormData(maintenanceReportFormData.part_purchase_events[index])
        setShowPartPurchaseEventForm(true);
        setIsPartPurchaseEventFormDataEdition(true);
        setIndexOfPartPurchaseEventToEdit(index);
    }
    const validateServiceProviderEventFormData = (serviceProviderEventFormData: ServiceProviderEventType): boolean => {
        const {service_provider, service_date} = serviceProviderEventFormData;
        if (!service_provider.name) {
            Alert.alert("Error", "You must select a service provider!")
            return false
        }
        if (!service_date) {
            Alert.alert("Error", "You must select a service date!")
            return false
        }
        return true;
    }
    const handleServiceProviderEventAddition = (index: number | undefined) => {
        if (!validateServiceProviderEventFormData(serviceProviderEventFormData)) {
            return;
        }
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
        }
        setServiceProviderEventFormData(ServiceProviderEventFormInitialState);
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
        if (name === "service_date") {
            setServiceProviderEventFormData(prevState => ({
                ...prevState,
                service_date: getLocalDateString(date)
            }))
        } else if (name === "purchase_date") {
            setPartPurchaseEventFormData(prevState => ({
                ...prevState,
                purchase_date: getLocalDateString(date)
            }))
        }
    }
    const showMaintenanceReports = () => {
        router.replace('/details/maintenance-reports-details');
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
                                        <View className={"flex-1 flex-row"}>
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
                                            <View className={"justify-center items-center ml-4"}>
                                                <Pressable onPress={showMaintenanceReports}
                                                           className={"p-4 bg-secondary-100 rounded-lg shadow-md"}>
                                                    <FontAwesome name={'files-o'} size={48} color={"#ef6c00"}/>
                                                    <Text className={"text-secondary-800 font-semibold text-base mt-2"}>Reports</Text>
                                                </Pressable>
                                            </View>
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
                                <ThemedButton title={"Add New Part"}
                                              handlePress={handleNewPartAddition}
                                              containerStyles={"bg-secondary-500 w-full p-5 rounded mt-3"}
                                              textStyles={"text-white font-semibold text-base"}
                                />
                                <ThemedButton title={"Add New Service Provider"}
                                              handlePress={handleNewServiceProviderAddition}
                                              containerStyles={"bg-secondary-500 w-full p-5 rounded mt-3"}
                                              textStyles={"text-white font-semibold text-base"}
                                />
                                <ThemedButton title={"Add New Parts Provider"}
                                              handlePress={handleNewPartsProviderAddition}
                                              containerStyles={"bg-secondary-500 w-full p-5 rounded mt-3"}
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
                        <MaintenanceReportForm
                            eventsDates={eventsDates}
                            handleDateChange={handleDateChange}
                            handleEventsDateChange={handleEventsDateChange}
                            handleMaintenanceReportCancellation={handleMaintenanceReportCancellation}
                            handleMaintenanceReportFormChange={handleMaintenanceReportFormChange}
                            handleMaintenanceReportSubmission={handleMaintenanceReportSubmission}
                            handlePartInputChange={handlePartInputChange}
                            handlePartPurchaseEventAddition={handlePartPurchaseEventAddition}
                            handlePartPurchaseEventDeletion={handlePartPurchaseEventDeletion}
                            handlePartPurchaseEventEdition={handlePartPurchaseEventEdition}
                            handlePartPurchaseEventFormChange={handlePartPurchaseEventFormChange}
                            handleServiceProviderEventAddition={handleServiceProviderEventAddition}
                            handleServiceProviderEventDeletion={handleServiceProviderEventDeletion}
                            handleServiceProviderEventEdition={handleServiceProviderEventEdition}
                            handleServiceProviderEventFormChange={handleServiceProviderEventFormChange}
                            indexOfPartPurchaseEventToEdit={indexOfPartPurchaseEventToEdit}
                            indexOfServiceProviderEventToEdit={indexOfServiceProviderEventToEdit}
                            isPartPurchaseEventFormDataEdition={isPartPurchaseEventFormDataEdition}
                            isPartSelected={isPartSelected}
                            isServiceProviderEventFormDataEdition={isServiceProviderEventFormDataEdition}
                            maintenanceReportDates={maintenanceReportDates}
                            maintenanceReportFormData={maintenanceReportFormData}
                            partPurchaseFormData={partPurchaseEventFormData}
                            searchTerm={searchTerm}
                            selectPart={selectPart}
                            serviceProviderEventFormData={serviceProviderEventFormData}
                            setIsPartSelected={setIsPartSelected}
                            setShowPartPurchaseEventForm={setShowPartPurchaseEventForm}
                            setShowServiceProviderEventForm={setShowServiceProviderEventForm}
                            showPartPurchaseEventForm={showPartPurchaseEventForm}
                            showServiceProviderEventForm={showServiceProviderEventForm}
                        />}
            </ScrollView>
        </SafeAreaView>
    );
};
export default MaintenanceReport;
