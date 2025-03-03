import React, {useState} from "react";
import {MaintenanceReportType, PartProviderType, PartPurchaseEventType} from "@/types/maintenance";
import {partPurchaseEventFormInitialState} from "@/hooks/initialStates";
import {Alert} from "react-native";
import {router} from "expo-router";
import {getLocalDateString} from "@/utils/helpers";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";


export const usePartPurchaseEvent = (maintenanceReportFormData: MaintenanceReportType, setMaintenanceReportFormData: React.Dispatch<React.SetStateAction<MaintenanceReportType>>) => {
    const [partPurchaseEventFormData, setPartPurchaseEventFormData] = useState<PartPurchaseEventType>(partPurchaseEventFormInitialState);
    const [searchTerm, setSearchTerm] = useState("")
    const [isPartSelected, setIsPartSelected] = useState(false)
    const [showPartPurchaseEventForm, setShowPartPurchaseEventForm] = useState(false);
    const [isPartPurchaseEventFormDataEdition, setIsPartPurchaseEventFormDataEdition] = useState(false);
    const [indexOfPartPurchaseEventToEdit, setIndexOfPartPurchaseEventToEdit] = useState<number | undefined>();
    const [purchaseDate, setPurchaseDate] = useState(new Date())

    // Part purchase event handlers
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
    const handleSelectingPart = (name: string, id: string) => {
        setSearchTerm(name);
        setPartPurchaseEventFormData(prevState => ({
            ...prevState,
            part: {
                ...prevState.part,
                id: id,
                name: name
            }
        }))
        setIsPartSelected(true);
        console.log(searchTerm);
    }
    const handlePartInputChange = (name: string, value: string) => {
        setSearchTerm(value);
    }
    const handleValidatingPartPurchaseEventFormData = (formattedPartPurchaseEventFormData: PartPurchaseEventType) => {
        const {part, provider, purchase_date, cost} = formattedPartPurchaseEventFormData
        if (!part.name) {
            Alert.alert("Error", "You must select an available part!")
            return false
        }
        if (!provider.name) {
            Alert.alert("Error", "You must select a provider!")
            return false
        }
        if (!purchase_date) {
            Alert.alert("Error", "You must select a purchase date!");
            return false
        }
        return true;
    }
    const handlePartPurchaseEventAddition = (index: number | undefined) => {
        if (!handleValidatingPartPurchaseEventFormData(partPurchaseEventFormData)) {
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
    const handlePartPurchaseEventEdition = (index: number) => {
        setPartPurchaseEventFormData(maintenanceReportFormData.part_purchase_events[index])
        setShowPartPurchaseEventForm(true);
        setIsPartPurchaseEventFormDataEdition(true);
        setIndexOfPartPurchaseEventToEdit(index);
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
    const handleNewPartAddition = () => {
        router.replace('/forms/part');
    }
    const handleNewPartsProviderAddition = () => {
        router.replace('/forms/part-provider')
    }
    const handlePurchaseDateChange = (name: string) => (_: DateTimePickerEvent, date?: Date) => {
        setPurchaseDate(date || new Date())
        setPartPurchaseEventFormData(prevState => ({
            ...prevState,
            purchase_date: getLocalDateString(date)
        }))
    }
    return {
        // states
        isPartPurchaseEventFormDataEdition,
        isPartSelected,
        showPartPurchaseEventForm,
        partPurchaseEventFormData,
        indexOfPartPurchaseEventToEdit,
        purchaseDate,
        searchTerm,

        // handlers
        setIsPartSelected,
        setShowPartPurchaseEventForm,
        handleNewPartAddition,
        handleNewPartsProviderAddition,
        handlePartInputChange,
        handlePartPurchaseEventAddition,
        handlePartPurchaseEventDeletion,
        handlePartPurchaseEventEdition,
        handlePartPurchaseEventFormChange,
        handleSelectingPart,
        handlePurchaseDateChange,
    }
}
