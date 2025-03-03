import {MaintenanceReportType, ServiceProviderEventType, ServiceProviderType} from "@/types/maintenance";
import React, {useState} from "react";
import {serviceProviderEventFormInitialState} from "@/hooks/initialStates";
import {Alert} from "react-native";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {getLocalDateString} from "@/utils/helpers";
import {router} from "expo-router";


export const useServiceProviderEvent = (maintenanceReportFormData: MaintenanceReportType, setMaintenanceReportFormData: React.Dispatch<React.SetStateAction<MaintenanceReportType>>) => {
    const [serviceProviderEventFormData, setServiceProviderEventFormData] = useState<ServiceProviderEventType>(serviceProviderEventFormInitialState)
    const [showServiceProviderEventForm, setShowServiceProviderEventForm] = useState(false);
    const [isServiceProviderEventFormDataEdition, setIsServiceProviderEventFormDataEdition] = useState(false);
    const [indexOfServiceProviderEventToEdit, setIndexOfServiceProviderEventToEdit] = useState<number | undefined>();
    const [serviceDate, setServiceDate] = useState(new Date())
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
    const handleValidatingServiceProviderEventFormData = (serviceProviderEventFormData: ServiceProviderEventType): boolean => {
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
        if (!handleValidatingServiceProviderEventFormData(serviceProviderEventFormData)) {
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
        setServiceProviderEventFormData(serviceProviderEventFormInitialState);
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
        setServiceProviderEventFormData(serviceProviderEventFormInitialState);
        setIsServiceProviderEventFormDataEdition(false);
    }
    const handleServiceProviderEventEdition = (index: number) => {
        setServiceProviderEventFormData(maintenanceReportFormData.service_provider_events[index])
        setShowServiceProviderEventForm(true);
        setIsServiceProviderEventFormDataEdition(true);
        setIndexOfServiceProviderEventToEdit(index);
    }
    const handleServiceDateChange = (name: string) => (_: DateTimePickerEvent, date?: Date) => {
        setServiceDate(date || new Date())
        setServiceProviderEventFormData(prevState => ({
            ...prevState,
            service_date: getLocalDateString(date)
        }))
    }
    const handleNewServiceProviderAddition = () => {
        router.replace('/forms/service-provider')
    }

    return {
        // states
        showServiceProviderEventForm,
        serviceProviderEventFormData,
        indexOfServiceProviderEventToEdit,
        isServiceProviderEventFormDataEdition,
        serviceDate,

        // handlers
        handleServiceProviderEventAddition,
        handleServiceProviderEventDeletion,
        handleServiceProviderEventEdition,
        handleServiceProviderEventFormChange,
        handleServiceDateChange,
        handleNewServiceProviderAddition,
        setShowServiceProviderEventForm,
    }


}