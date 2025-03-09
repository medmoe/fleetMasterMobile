import {SafeAreaView, ScrollView} from "react-native";
import {CalendarView, ErrorNotificationBar, PartPurchaseEventForm, ReportsListView, ServiceProviderEventForm} from "@/components";
import MaintenanceReport from "@/app/maintenance/maintenance-report";
import {useGlobalContext} from "@/context/GlobalProvider";
import React, {useEffect} from "react";
import {useMaintenanceReport, usePartPurchaseEvent, useServiceProviderEvent} from "@/hooks";

const MaintenanceReportsDetails = () => {
    const {vehicle, generalData, maintenanceReports, setMaintenanceReports} = useGlobalContext()
    const {
        displayLoadingIndicator,
        maintenanceReportFormData,
        selectedReports,
        currentDate,
        maintenanceReportToEdit,
        view: {
            showMaintenanceReport,
            showPartPurchaseEventForm,
            showServiceProviderEventForm,
            showSelectedReports,
        },
        isLoading,
        errorState,
        monthlyReports,
        setView,
        setErrorState,
        setIsLoading,
        onMonthChange,
        onDayPressed,
        handleCollapse,
        handleMaintenanceReportViewCancellation,
        handleMaintenanceReportEdition,
        handleMaintenanceReportDeletion,
        setSelectedReports,
        setMaintenanceReportFormData,
        handleLeavingMaintenanceReportsCalendar,
        setDisplayLoadingIndicator,
    } = useMaintenanceReport(vehicle, maintenanceReports, setMaintenanceReports);
    const {
        serviceDate,
        serviceProviderEventFormData,
        handleServiceProviderEventFormChange,
        handleServiceDateChange,
        handleServiceProviderEventUpdateSubmission,
        handleServiceProviderEventEditionCancellation,
        handleServiceProviderEventEdition,
        handleServiceProviderEventDeletion,
    } = useServiceProviderEvent(
        maintenanceReportFormData,
        setMaintenanceReportFormData,
        maintenanceReports,
        setMaintenanceReports,
        selectedReports,
        setSelectedReports,
        setErrorState,
        setIsLoading,
        setView,
    )
    const {
        isPartSelected,
        partPurchaseEventFormData,
        purchaseDate,
        searchTerm,
        handlePartInputChange,
        handlePartPurchaseEventUpdateSubmission,
        handlePartPurchaseEventEditionCancellation,
        handlePartPurchaseEventFormChange,
        handleSelectingPart,
        setIsPartSelected,
        handlePurchaseDateChange,
        handlePartPurchaseEventDeletion,
        handlePartPurchaseEventEdition,

    } = usePartPurchaseEvent(
        maintenanceReportFormData,
        setMaintenanceReportFormData,
        maintenanceReports,
        setMaintenanceReports,
        selectedReports,
        setSelectedReports,
        setErrorState,
        setIsLoading,
        setView
    )
    useEffect(() => {
        setDisplayLoadingIndicator(false);
    }, [monthlyReports])
    const renderContent = () => {
        if (showServiceProviderEventForm) {
            return (
                <ServiceProviderEventForm
                    serviceProviders={generalData.service_providers}
                    service_date={serviceDate}
                    handleServiceDateChange={handleServiceDateChange}
                    serviceProviderEventFormData={serviceProviderEventFormData}
                    handleServiceProviderEventFormChange={handleServiceProviderEventFormChange}
                    handleServiceProviderEventAddition={handleServiceProviderEventUpdateSubmission}
                    handleServiceProviderEventCancellation={handleServiceProviderEventEditionCancellation}
                    isServiceProviderEventFormDataEdition={true}
                />
            )
        }
        if (showMaintenanceReport) {
            return (
                <MaintenanceReport isMaintenanceReportPutRequest={true}
                                   showMaintenanceForm={true}
                                   maintenanceReportFormData={maintenanceReportToEdit}

                />
            )
        }
        if (showPartPurchaseEventForm) {
            return (
                <PartPurchaseEventForm handlePartInputChange={handlePartInputChange}
                                       handlePartPurchaseEventAddition={handlePartPurchaseEventUpdateSubmission}
                                       handlePartPurchaseEventCancellation={handlePartPurchaseEventEditionCancellation}
                                       handlePartPurchaseEventFormChange={handlePartPurchaseEventFormChange}
                                       isPartSelected={isPartSelected}
                                       partPurchaseFormData={partPurchaseEventFormData}
                                       purchaseDate={purchaseDate}
                                       searchTerm={searchTerm}
                                       selectPart={handleSelectingPart}
                                       setIsPartSelected={setIsPartSelected}
                                       indexOfPartPurchaseEventToEdit={-1}
                                       isPartPurchaseEventFormDataEdition={true}
                                       handlePurchaseDateChange={handlePurchaseDateChange}
                />
            )
        }
        if (showSelectedReports) {
            return (
                <ReportsListView isLoading={isLoading}
                                 selectedReports={selectedReports}
                                 handleCollapse={handleCollapse}
                                 handleMaintenanceReportDeletion={handleMaintenanceReportDeletion}
                                 handleMaintenanceReportEdition={handleMaintenanceReportEdition}
                                 handleServiceProviderEventEdition={handleServiceProviderEventEdition}
                                 handleServiceProviderEventDeletion={handleServiceProviderEventDeletion}
                                 handlePartPurchaseEventDeletion={handlePartPurchaseEventDeletion}
                                 handlePartPurchaseEventEdition={handlePartPurchaseEventEdition}
                                 handleMaintenanceReportViewCancellation={handleMaintenanceReportViewCancellation}
                                 errorState={errorState}
                />
            )
        }
        return (
            <CalendarView maintenanceReports={maintenanceReports}
                          onMonthChange={onMonthChange}
                          onDayPressed={onDayPressed}
                          displayLoadingIndicator={displayLoadingIndicator}
                          currentDate={currentDate}
                          onCancel={handleLeavingMaintenanceReportsCalendar}
            />
        )
    }
    return (
        <SafeAreaView>
            <ScrollView>
                {renderContent()}
                <ErrorNotificationBar isVisible={errorState.isErrorModalVisible}
                                      errorMessage={errorState.errorMessage}
                                      onDismiss={() => setErrorState({isErrorModalVisible: false, errorMessage: ""})}/>
            </ScrollView>
        </SafeAreaView>
    )
}
export default MaintenanceReportsDetails;
