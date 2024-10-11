import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {useGlobalContext} from "@/context/GlobalProvider";
import PartPurchaseForm from "@/components/forms/PartPurchaseForm";
import axios from "axios";
import {API} from "@/constants/endpoints";
import MaintenanceForm from "@/components/forms/MaintenanceForm";
import {router} from "expo-router";
import {PartPurchaseEventType} from "@/types/maintenance";


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
                               }: MaintenanceFormProps) => {
    const {generalData, setGeneralData} = useGlobalContext();
    const [showPartPurchaseEventForm, setShowPartPurchaseEventForm] = useState(false);
    const [showDeleteFeatures, setShowDeleteFeatures] = useState(false);
    const [partPurchaseEventId, setPartPurchaseEventId] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [partPurchaseEvents, setPartPurchaseEvents] = useState<PartPurchaseEventType[]>([])
    const options = {headers: {'Content-Type': 'application/json'}, withCredentials: true};
    const handleEditPartPurchaseEvent = () => {

    }
    const handlePartPurchaseEventOnLongPress = (partPurchaseEventId?: string) => {
        setShowDeleteFeatures(true);
        setPartPurchaseEventId(partPurchaseEventId || "")
    }

    const handlePartPurchaseEventSubmission = async () => {
        setIsLoading(true)
        try {
            // Validating and formatting data
            if (!partPurchaseFormData.cost || !partPurchaseFormData.part || !partPurchaseFormData.provider || !partPurchaseFormData.purchase_date) {
                Alert.alert("Error", "Please fill all fields!.")
                return
            }
            const url = `${API}maintenance/part-purchase-events/`;
            const response = await axios.post(url, partPurchaseFormData, options)
            setPartPurchaseEvents([...partPurchaseEvents, response.data])
            setShowPartPurchaseEventForm(false)
        } catch (error: any) {
            console.log(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    const handlePartPurchaseEventCreation = () => {
        setShowPartPurchaseEventForm(true)
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
            {
                showPartPurchaseEventForm ? <PartPurchaseForm partPurchaseFormData={partPurchaseFormData}
                                                              handlePartPurchaseFormChange={handlePartPurchaseFormChange}
                                                              handlePartInputChange={handlePartInputChange}
                                                              searchTerm={searchTerm} selectPart={selectPart}
                                                              setIsPartSelected={setIsPartSelected}
                                                              isPartSelected={isPartSelected}
                                                              handleDateChange={handleDateChange}
                                                              handlePartPurchaseEventCancellation={handlePartPurchaseEventCancellation}
                                                              handlePartPurchaseEventSubmission={handlePartPurchaseEventSubmission}
                    /> :
                    <MaintenanceForm handleEditPartPurchaseEvent={handleEditPartPurchaseEvent}
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
                    />
            }
        </View>
    );
};

export default MaintenanceReportForm;
