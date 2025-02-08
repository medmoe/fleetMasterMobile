import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {useGlobalContext} from "@/context/GlobalProvider";
import PartPurchaseEventForm from "@/components/forms/PartPurchaseEventForm";
import axios from "axios";
import {API} from "@/constants/endpoints";
import MaintenanceForm from "@/components/forms/MaintenanceForm";
import {router} from "expo-router";
import {DetailedPartPurchaseEventType, MaintenanceReportType, PartPurchaseEventType, ServiceProviderEventType} from "@/types/maintenance";
import {isPositiveInteger} from "@/utils/helpers";
import Spinner from "../Spinner";
import ServiceProviderEventForm from "@/components/forms/ServiceProviderEventForm";


interface MaintenanceFormProps {
    eventsDates: { [key in "purchase_date" | "service_date"]: Date }
    handleDateChange: (name: string) => (_: DateTimePickerEvent, date: Date | undefined) => void
    handleEventsDateChange: (name: string) => (_: DateTimePickerEvent, date: Date | undefined) => void
    handleMaintenanceReportCancellation: () => void
    handleMaintenanceReportFormChange: (name: string, value: string) => void
    handleMaintenanceReportSubmission: () => void
    handlePartInputChange: (name: string, value: string) => void
    handlePartPurchaseEventAddition: () => void
    handlePartPurchaseFormChange: (name: string, value: string) => void
    handleServiceProviderEventAddition: () => void
    handleServiceProviderEventFormChange: (name: string, value: string) => void
    isPartSelected: boolean
    maintenanceReportDates: { [key in "start_date" | "end_date" | "purchase_date"]: Date }
    maintenanceReportFormData: MaintenanceReportType
    partPurchaseFormData: PartPurchaseEventType
    searchTerm: string
    selectPart: (name: string, value: string) => void
    serviceProviderEventFormData: ServiceProviderEventType
    setIsPartSelected: (value: boolean) => void
    setMaintenanceReportFormData: React.Dispatch<React.SetStateAction<MaintenanceReportType>>
    setPartPurchaseFormData: (newState: PartPurchaseEventType) => void
    setSearchTerm: (newState: string) => void
    setShowDeleteFeaturesForPartPurchaseEvent: (value: boolean) => void
    showDeleteFeaturesForPartPurchaseEvent: boolean
    setShowServiceProviderEventForm: (value: boolean) => void
    showServiceProviderEventForm: boolean
}


const MaintenanceReportForm = ({
                                   eventsDates,
                                   handleDateChange,
                                   handleEventsDateChange,
                                   handleMaintenanceReportCancellation,
                                   handleMaintenanceReportFormChange,
                                   handleMaintenanceReportSubmission,
                                   handlePartInputChange,
                                   handlePartPurchaseEventAddition,
                                   handlePartPurchaseFormChange,
                                   handleServiceProviderEventAddition,
                                   handleServiceProviderEventFormChange,
                                   isPartSelected,
                                   maintenanceReportDates,
                                   maintenanceReportFormData,
                                   partPurchaseFormData,
                                   searchTerm,
                                   selectPart,
                                   serviceProviderEventFormData,
                                   setIsPartSelected,
                                   setMaintenanceReportFormData,
                                   setPartPurchaseFormData,
                                   setSearchTerm,
                                   setShowDeleteFeaturesForPartPurchaseEvent,
                                   setShowServiceProviderEventForm,
                                   showDeleteFeaturesForPartPurchaseEvent,
                                   showServiceProviderEventForm,
                               }: MaintenanceFormProps) => {
    const {generalData} = useGlobalContext();
    const [showPartPurchaseEventForm, setShowPartPurchaseEventForm] = useState(false);

    const [partPurchaseEventId, setPartPurchaseEventId] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false);
    const [partPurchaseEvents, setPartPurchaseEvents] = useState<DetailedPartPurchaseEventType[]>([])
    const options = {headers: {'Content-Type': 'application/json'}, withCredentials: true};
    const handlePartPurchaseEventEdition = (partPurchaseEvent: PartPurchaseEventType) => {
        if (showDeleteFeaturesForPartPurchaseEvent) {
            setShowDeleteFeaturesForPartPurchaseEvent(false)
        } else {
            setShowPartPurchaseEventForm(true)
            setPartPurchaseFormData(partPurchaseEvent);
            setIsUpdate(true);
        }
    }
    const handlePartPurchaseEventOnLongPress = (partPurchaseEventId?: string) => {
        setShowDeleteFeaturesForPartPurchaseEvent(true);
        setPartPurchaseEventId(partPurchaseEventId || "")
    }
    const validatePartPurchaseEventData = () => {
        // Validating and formatting data
        if (!partPurchaseFormData.part) {
            Alert.alert("Error", "Please select an available part!")
            return false
        }
        if (!partPurchaseFormData.provider) {
            Alert.alert("Error", "Please select a parts provider!")
            return false
        }
        if (!isPositiveInteger(partPurchaseFormData.cost)) {
            Alert.alert("Error", "Please enter a valid cost!")
            return false
        }
        // convert Date to string format
        if (!maintenanceReportDates.purchase_date) {
            Alert.alert("Error", "Please select a purchase date")
            return false
        }
        return true
    }
    // const handlePartPurchaseEventSubmission = async () => {
    //     setIsLoading(true)
    //     try {
    //         if (!validatePartPurchaseEventData()) {
    //             return;
    //         }
    //         partPurchaseFormData.purchase_date = getLocalDateString(maintenanceReportDates.purchase_date)
    //         const url = !isUpdate ? `${API}maintenance/part-purchase-events/` : `${API}maintenance/part-purchase-events/${partPurchaseFormData.id}/`;
    //         const response = !isUpdate ? await axios.post(url, partPurchaseFormData, options) : await axios.put(url, partPurchaseFormData, options)
    //         const filteredPartPurchaseEvents = partPurchaseEvents.filter((partPurchaseEvent) => partPurchaseEvent.id !== partPurchaseFormData.id)
    //         setPartPurchaseEvents([...filteredPartPurchaseEvents, response.data])
    //         setShowPartPurchaseEventForm(false)
    //         setMaintenanceReportFormData(prevState => ({
    //             ...prevState,
    //             parts: [...filteredPartPurchaseEvents, response.data].map((partPurchaseEvent) => partPurchaseEvent.id)
    //         }))
    //         setPartPurchaseFormData({
    //             part: "",
    //             provider: generalData.part_providers[0]?.id || "",
    //             purchase_date: getLocalDateString(new Date()),
    //             cost: "0"
    //         })
    //         setSearchTerm("");
    //     } catch (error: any) {
    //         console.log(error.response.data)
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    const handlePartPurchaseEventCreation = () => {
        setShowPartPurchaseEventForm(true)
        setIsUpdate(false);
    }
    const handleServiceProviderEventCreation = () => {
        setShowServiceProviderEventForm(true)
        setShowPartPurchaseEventForm(false)
    }
    const handlePartPurchaseEventCancellation = () => {
        setShowPartPurchaseEventForm(false)
    }
    const handleServiceProviderEventCancellation = () => {
        setShowServiceProviderEventForm(false)
    }
    const handlePartPurchaseEventDeletion = async () => {
        setIsLoading(true)
        try {
            if (!partPurchaseEventId) {
                Alert.alert("Error", "No part purchase event selected.")
                return
            }
            const url = `${API}maintenance/part-purchase-events/${partPurchaseEventId}/`
            await axios.delete(url, options)
            const filteredPartPurchaseEvents = partPurchaseEvents.filter((partPurchaseEvent) => partPurchaseEvent.id?.toString() !== partPurchaseEventId)
            setPartPurchaseEvents(filteredPartPurchaseEvents)
            const partPurchaseEventsWithIds = filteredPartPurchaseEvents.filter((partPurchaseEvent) => partPurchaseEvent.id !== undefined)
            setMaintenanceReportFormData(prevState => ({
                ...prevState,
                parts: partPurchaseEventsWithIds.map((partPurchaseEvent) => partPurchaseEvent.id as string)
            }))
            setShowDeleteFeaturesForPartPurchaseEvent(false);

        } catch (error: any) {
            if (error.response.status === 401) {
                Alert.alert("Authentication Error", "You are not allowed to perform this action!")
                router.replace("/")
            }
        } finally {
            setIsLoading(false);

        }
    }
    return (
        <View>
            {isLoading ? <View className={"w-full justify-center items-center h-full px-4"}><Spinner
                    isVisible={isLoading}/></View> :

                showPartPurchaseEventForm ? <PartPurchaseEventForm partPurchaseFormData={partPurchaseFormData}
                                                                   handlePartPurchaseFormChange={handlePartPurchaseFormChange}
                                                                   handlePartInputChange={handlePartInputChange}
                                                                   searchTerm={searchTerm}
                                                                   selectPart={selectPart}
                                                                   setIsPartSelected={setIsPartSelected}
                                                                   isPartSelected={isPartSelected}
                                                                   handleDateChange={handleDateChange}
                                                                   handlePartPurchaseEventCancellation={handlePartPurchaseEventCancellation}
                                                                   handlePartPurchaseEventAddition={handlePartPurchaseEventAddition}
                                                                   maintenanceReportDates={maintenanceReportDates}
                    />
                    : showServiceProviderEventForm ? <ServiceProviderEventForm serviceProviders={generalData.service_providers}
                                                                               service_date={eventsDates.service_date}
                                                                               handleChange={handleEventsDateChange}
                                                                               serviceProviderEventFormData={serviceProviderEventFormData}
                                                                               handleServiceProviderEventFormChange={handleServiceProviderEventFormChange}
                                                                               handleServiceProviderEventAddition={handleServiceProviderEventAddition}
                                                                               handleServiceProviderEventCancellation={handleServiceProviderEventCancellation}
                        /> :
                        <MaintenanceForm handlePartPurchaseEventEdition={handlePartPurchaseEventEdition}
                                         handleServiceProviderEventCreation={handleServiceProviderEventCreation}
                                         handlePartPurchaseEventCreation={handlePartPurchaseEventCreation}
                                         handleDateChange={handleDateChange}
                                         handleMaintenanceReportFormChange={handleMaintenanceReportFormChange}
                                         handleMaintenanceReportSubmission={handleMaintenanceReportSubmission}
                                         handleMaintenanceReportCancellation={handleMaintenanceReportCancellation}
                                         handlePartPurchaseEventDeletion={handlePartPurchaseEventDeletion}
                                         handlePartPurchaseEventOnLongPress={handlePartPurchaseEventOnLongPress}
                                         partPurchaseEventId={partPurchaseEventId}
                                         showDeleteFeatures={showDeleteFeaturesForPartPurchaseEvent}
                                         partPurchaseEvents={partPurchaseEvents}
                                         maintenanceReportFormData={maintenanceReportFormData}
                                         maintenanceReportDates={maintenanceReportDates}
                        />
            }
        </View>
    );
};

export default MaintenanceReportForm;
