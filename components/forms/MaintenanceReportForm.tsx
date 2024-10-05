import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {useGlobalContext} from "@/context/GlobalProvider";
import {PartPurchaseEventFormType, PartPurchaseEventType, ServiceProviderType} from "@/types/maintenance";
import PartPurchaseForm from "@/components/forms/PartPurchaseForm";
import axios from "axios";
import {API} from "@/constants/endpoints";
import ServiceProviderForm from "@/components/forms/ServiceProviderForm";
import MaintenanceForm from "@/components/forms/MaintenanceForm";


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
    partPurchaseFormData: PartPurchaseEventFormType
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
    const {partPurchaseEvents, setPartPurchaseEvents, generalData, setGeneralData} = useGlobalContext();
    const [showPartPurchaseEventForm, setShowPartPurchaseEventForm] = useState(false);
    const handleEditPartPurchaseEvent = () => {

    }

    const handlePartPurchaseEventSubmission = async () => {
        try {
            // Validating and formatting data
            if (!partPurchaseFormData.cost || !partPurchaseFormData.part || !partPurchaseFormData.provider || !partPurchaseFormData.purchase_date) {
                Alert.alert("Error", "Please fill all fields!.")
                return
            }
            let partPurchaseEventDataToSend: PartPurchaseEventType = {
                ...partPurchaseFormData,
                purchase_date: partPurchaseFormData.purchase_date.toLocaleDateString("en-CA", {year: "numeric", month: "2-digit", day: "2-digit"})
            }
            const response = await axios.post(`${API}maintenance/part-purchase-events/`,
                partPurchaseEventDataToSend,
                {headers: {'Content-Type': 'application/json'}, withCredentials: true})
            setPartPurchaseEvents([...partPurchaseEvents, response.data])
            setShowPartPurchaseEventForm(false)
        } catch (error: any) {
            console.log(error.response.data)
        }
    }

    const handlePartPurchaseEventCreation = () => {
        setShowPartPurchaseEventForm(true)
    }
    const handlePartPurchaseEventCancellation = () => {
        setShowPartPurchaseEventForm(false)
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
                />
            }
        </View>
    );
};

export default MaintenanceReportForm;
