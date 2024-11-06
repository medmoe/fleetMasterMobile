import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {useGlobalContext} from "@/context/GlobalProvider";
import PartPurchaseForm from "@/components/forms/PartPurchaseForm";
import axios from "axios";
import {API} from "@/constants/endpoints";
import MaintenanceForm from "@/components/forms/MaintenanceForm";
import {router} from "expo-router";
import {MaintenanceReportType, PartPurchaseEventType} from "@/types/maintenance";
import {getLocalDateString, isPositiveInteger} from "@/utils/helpers";
import Spinner from "../Spinner";


interface MaintenanceFormProps {
    searchTerm: string
    selectPart: (name: string, value: string) => void
    setIsPartSelected: (value: boolean) => void
    isPartSelected: boolean
    handleDateChange: (name: string) => (_: DateTimePickerEvent, date: Date | undefined) => void
    handleMaintenanceReportFormChange: (name: string, value: string) => void
    handleMaintenanceReportSubmission: () => void
    handleMaintenanceReportCancellation: () => void
    handlePartPurchaseFormChange: (name: string, value: string) => void
    handlePartInputChange: (name: string, value: string) => void
    partPurchaseFormData: PartPurchaseEventType
    setPartPurchaseFormData: (newState: PartPurchaseEventType) => void
    setSearchTerm: (newState: string) => void
    maintenanceReportDates: { [key in "start_date" | "end_date" | "purchase_date"]: Date }
    maintenanceReportFormData: MaintenanceReportType
    setMaintenanceReportFormData: React.Dispatch<React.SetStateAction<MaintenanceReportType>>
}


const MaintenanceReportForm = ({
                                   selectPart,
                                   searchTerm,
                                   setIsPartSelected,
                                   isPartSelected,
                                   handleDateChange,
                                   handleMaintenanceReportFormChange,
                                   handleMaintenanceReportSubmission,
                                   handleMaintenanceReportCancellation,
                                   handlePartPurchaseFormChange,
                                   partPurchaseFormData,
                                   handlePartInputChange,
                                   setPartPurchaseFormData,
                                   setSearchTerm,
                                   maintenanceReportDates,
                                   maintenanceReportFormData,
                                   setMaintenanceReportFormData
                               }: MaintenanceFormProps) => {
    const {generalData} = useGlobalContext();
    const [showPartPurchaseEventForm, setShowPartPurchaseEventForm] = useState(false);
    const [showDeleteFeatures, setShowDeleteFeatures] = useState(false);
    const [partPurchaseEventId, setPartPurchaseEventId] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false);
    const [partPurchaseEvents, setPartPurchaseEvents] = useState<PartPurchaseEventType[]>([])
    const options = {headers: {'Content-Type': 'application/json'}, withCredentials: true};
    const handlePartPurchaseEventEdition = (partPurchaseEvent: PartPurchaseEventType) => {
        setShowPartPurchaseEventForm(true)
        setPartPurchaseFormData(partPurchaseEvent);
        setIsUpdate(true);
    }
    const handlePartPurchaseEventOnLongPress = (partPurchaseEventId?: string) => {
        if (!showDeleteFeatures) {
            setShowDeleteFeatures(true);
            setPartPurchaseEventId(partPurchaseEventId || "")
        } else {
            setShowDeleteFeatures(false);
            setPartPurchaseEventId("");
        }
    }
    const validatePartPurchaseEventData = () => {
        // Validating and formatting data
        if (!partPurchaseFormData.part) {
            Alert.alert("Error", "Please select an available part!")
            return
        }
        if (!partPurchaseFormData.provider) {
            Alert.alert("Error", "Please select a parts provider!")
            return
        }
        if (!isPositiveInteger(partPurchaseFormData.cost)) {
            Alert.alert("Error", "Please enter a valid cost!")
            return
        }
        // convert Date to string format
        if (!maintenanceReportDates.purchase_date) {
            Alert.alert("Error", "Please select a purchase date")
            return
        }
    }
    const handlePartPurchaseEventSubmission = async () => {
        setIsLoading(true)
        try {
            validatePartPurchaseEventData()
            partPurchaseFormData.purchase_date = getLocalDateString(maintenanceReportDates.purchase_date)
            const url = !isUpdate ? `${API}maintenance/part-purchase-events/` : `${API}maintenance/part-purchase-events/${partPurchaseFormData.id}/`;
            const response = !isUpdate ? await axios.post(url, partPurchaseFormData, options) : await axios.put(url, partPurchaseFormData, options)
            const filteredPartPurchaseEvents = partPurchaseEvents.filter((partPurchaseEvent) => partPurchaseEvent.id !== partPurchaseFormData.id)
            setPartPurchaseEvents([...filteredPartPurchaseEvents, response.data])
            setShowPartPurchaseEventForm(false)
            setMaintenanceReportFormData(prevState => ({
                ...prevState,
                parts: [...filteredPartPurchaseEvents, response.data].map((partPurchaseEvent) => partPurchaseEvent.id)
            }))
            setPartPurchaseFormData({
                part: "",
                provider: generalData.part_providers[0]?.id || "",
                purchase_date: getLocalDateString(new Date()),
                cost: "0"
            })
            setSearchTerm("");
        } catch (error: any) {
            console.log(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    const handlePartPurchaseEventCreation = () => {
        setShowPartPurchaseEventForm(true)
        setIsUpdate(false);
    }
    const handlePartPurchaseEventCancellation = () => {
        if (showDeleteFeatures) {
            setShowDeleteFeatures(false);
            setPartPurchaseEventId("");
        } else {
            setShowPartPurchaseEventForm(false)
        }
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
            setShowDeleteFeatures(false)
            const filteredPartPurchaseEvents = partPurchaseEvents.filter((partPurchaseEvent) => partPurchaseEvent.id?.toString() !== partPurchaseEventId)
            setPartPurchaseEvents(filteredPartPurchaseEvents)
            const partPurchaseEventsWithIds = filteredPartPurchaseEvents.filter((partPurchaseEvent) => partPurchaseEvent.id !== undefined)
            setMaintenanceReportFormData(prevState => ({
                ...prevState,
                parts: partPurchaseEventsWithIds.map((partPurchaseEvent) => partPurchaseEvent.id as string)
            }))

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

                showPartPurchaseEventForm ? <PartPurchaseForm partPurchaseFormData={partPurchaseFormData}
                                                              handlePartPurchaseFormChange={handlePartPurchaseFormChange}
                                                              handlePartInputChange={handlePartInputChange}
                                                              searchTerm={searchTerm} selectPart={selectPart}
                                                              setIsPartSelected={setIsPartSelected}
                                                              isPartSelected={isPartSelected}
                                                              handleDateChange={handleDateChange}
                                                              handlePartPurchaseEventCancellation={handlePartPurchaseEventCancellation}
                                                              handlePartPurchaseEventSubmission={handlePartPurchaseEventSubmission}
                                                              maintenanceReportDates={maintenanceReportDates}
                    /> :
                    <MaintenanceForm handlePartPurchaseEventEdition={handlePartPurchaseEventEdition}
                                     handlePartPurchaseEventCreation={handlePartPurchaseEventCreation}
                                     handleDateChange={handleDateChange}
                                     handleMaintenanceReportFormChange={handleMaintenanceReportFormChange}
                                     handleMaintenanceReportSubmission={handleMaintenanceReportSubmission}
                                     handleMaintenanceReportCancellation={handleMaintenanceReportCancellation}
                                     handlePartPurchaseEventDeletion={handlePartPurchaseEventDeletion}
                                     handlePartPurchaseEventOnLongPress={handlePartPurchaseEventOnLongPress}
                                     partPurchaseEventId={partPurchaseEventId}
                                     showDeleteFeatures={showDeleteFeatures}
                                     partPurchaseEvents={partPurchaseEvents}
                                     maintenanceReportFormData={maintenanceReportFormData}
                                     maintenanceReportDates={maintenanceReportDates}
                    />
            }
        </View>
    );
};

export default MaintenanceReportForm;
