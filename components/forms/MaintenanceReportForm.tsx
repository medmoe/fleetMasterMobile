import React from 'react';
import {View} from 'react-native';
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {useGlobalContext} from "@/context/GlobalProvider";
import PartPurchaseEventForm from "../forms/PartPurchaseEventForm";
import MaintenanceForm from "../forms/MaintenanceForm";
import {MaintenanceReportType, PartPurchaseEventType, ServiceProviderEventType} from "@/types/maintenance";
import ServiceProviderEventForm from "../forms/ServiceProviderEventForm";


interface MaintenanceFormProps {
    eventsDates: { [key in "purchase_date" | "service_date"]: Date }
    handleDateChange: (name: string) => (_: DateTimePickerEvent, date: Date | undefined) => void
    handleEventsDateChange: (name: string) => (_: DateTimePickerEvent, date: Date | undefined) => void
    handleMaintenanceReportCancellation: () => void
    handleMaintenanceReportFormChange: (name: string, value: string) => void
    handleMaintenanceReportSubmission: () => void
    handlePartInputChange: (name: string, value: string) => void
    handlePartPurchaseEventAddition: (index: number | undefined) => void
    handlePartPurchaseEventDeletion: (index: number) => void
    handlePartPurchaseEventEdition: (index: number) => void
    handlePartPurchaseEventFormChange: (name: string, value: string) => void
    handleServiceProviderEventAddition: (index: number | undefined) => void
    handleServiceProviderEventDeletion: (index: number) => void
    handleServiceProviderEventEdition: (index: number) => void
    handleServiceProviderEventFormChange: (name: string, value: string) => void
    indexOfPartPurchaseEventToEdit: number | undefined
    indexOfServiceProviderEventToEdit: number | undefined
    isPartPurchaseEventFormDataEdition: boolean
    isPartSelected: boolean
    isServiceProviderEventFormDataEdition: boolean
    isUpdate: boolean
    maintenanceReportDates: { [key in "start_date" | "end_date" | "purchase_date"]: Date }
    maintenanceReportFormData: MaintenanceReportType
    partPurchaseFormData: PartPurchaseEventType
    searchTerm: string
    selectPart: (name: string, value: string) => void
    serviceProviderEventFormData: ServiceProviderEventType
    setIsPartSelected: (value: boolean) => void
    setShowPartPurchaseEventForm: (value: boolean) => void
    setShowServiceProviderEventForm: (value: boolean) => void
    showPartPurchaseEventForm: boolean
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
                                   handlePartPurchaseEventDeletion,
                                   handlePartPurchaseEventEdition,
                                   handlePartPurchaseEventFormChange,
                                   handleServiceProviderEventAddition,
                                   handleServiceProviderEventDeletion,
                                   handleServiceProviderEventEdition,
                                   handleServiceProviderEventFormChange,
                                   indexOfPartPurchaseEventToEdit,
                                   indexOfServiceProviderEventToEdit,
                                   isPartPurchaseEventFormDataEdition,
                                   isPartSelected,
                                   isServiceProviderEventFormDataEdition,
                                   isUpdate,
                                   maintenanceReportDates,
                                   maintenanceReportFormData,
                                   partPurchaseFormData,
                                   searchTerm,
                                   selectPart,
                                   serviceProviderEventFormData,
                                   setIsPartSelected,
                                   setShowPartPurchaseEventForm,
                                   setShowServiceProviderEventForm,
                                   showPartPurchaseEventForm,
                                   showServiceProviderEventForm,
                               }: MaintenanceFormProps) => {
    const {generalData} = useGlobalContext();

    const handlePartPurchaseEventCreation = () => {
        setShowPartPurchaseEventForm(true)
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
    return (
        <View>
            {
                showPartPurchaseEventForm ? <PartPurchaseEventForm
                        handleEventsDateChange={handleEventsDateChange}
                        handlePartInputChange={handlePartInputChange}
                        handlePartPurchaseEventAddition={handlePartPurchaseEventAddition}
                        handlePartPurchaseEventCancellation={handlePartPurchaseEventCancellation}
                        handlePartPurchaseEventFormChange={handlePartPurchaseEventFormChange}
                        indexOfPartPurchaseEventToEdit={indexOfPartPurchaseEventToEdit}
                        isPartPurchaseEventFormDataEdition={isPartPurchaseEventFormDataEdition}
                        isPartSelected={isPartSelected}
                        partPurchaseFormData={partPurchaseFormData}
                        purchaseDate={eventsDates.purchase_date}
                        searchTerm={searchTerm}
                        selectPart={selectPart}
                        setIsPartSelected={setIsPartSelected}
                    />
                    : showServiceProviderEventForm ? <ServiceProviderEventForm
                            handleEventsDateChange={handleEventsDateChange}
                            handleServiceProviderEventAddition={handleServiceProviderEventAddition}
                            handleServiceProviderEventCancellation={handleServiceProviderEventCancellation}
                            handleServiceProviderEventFormChange={handleServiceProviderEventFormChange}
                            indexOfServiceProviderEventToEdit={indexOfServiceProviderEventToEdit}
                            isServiceProviderEventFormDataEdition={isServiceProviderEventFormDataEdition}
                            serviceProviderEventFormData={serviceProviderEventFormData}
                            serviceProviders={generalData.service_providers}
                            service_date={eventsDates.service_date}
                        /> :
                        <MaintenanceForm
                            handleDateChange={handleDateChange}
                            handleMaintenanceReportCancellation={handleMaintenanceReportCancellation}
                            handleMaintenanceReportFormChange={handleMaintenanceReportFormChange}
                            handleMaintenanceReportSubmission={handleMaintenanceReportSubmission}
                            handlePartPurchaseEventCreation={handlePartPurchaseEventCreation}
                            handlePartPurchaseEventDeletion={handlePartPurchaseEventDeletion}
                            handlePartPurchaseEventEdition={handlePartPurchaseEventEdition}
                            handleServiceProviderEventCreation={handleServiceProviderEventCreation}
                            handleServiceProviderEventDeletion={handleServiceProviderEventDeletion}
                            handleServiceProviderEventEdition={handleServiceProviderEventEdition}
                            maintenanceReportDates={maintenanceReportDates}
                            maintenanceReportFormData={maintenanceReportFormData}
                            isUpdate={isUpdate}
                        />
            }
        </View>
    );
};

export default MaintenanceReportForm;
