import {SafeAreaView, ScrollView} from "react-native";
import {PartPurchaseEventForm, ServiceProviderEventForm} from "@/components";
import MaintenanceReport from "@/app/maintenance/maintenance-report";
import {useMaintenanceReport} from "@/hooks/useMaintenanceReport";
import {useGlobalContext} from "@/context/GlobalProvider";
import {useServiceProviderEvent} from "@/hooks/useServiceProviderEvent";
import {usePartPurchaseEvent} from "@/hooks/usePartPurchaseEvent";
import ReportsListView from "@/components/view/ReportsListView";
import CalendarView from "@/components/view/CalendarView";

const MaintenanceReportsDetails = () => {
    const {vehicle, generalData} = useGlobalContext()
    const {
        maintenanceReportFormData,
        maintenanceReports,
        selectedReports,
        maintenanceReportToEdit,
        view: {
            showMaintenanceReport,
            showPartPurchaseEventForm,
            showServiceProviderEventForm,
            showSelectedReports,
        },
        isLoading,
        errorState,
        currentDate,
        setErrorState,
        setIsLoading,
        onMonthChange,
        onDayPressed,
        handleCollapse,
        handleMaintenanceReportViewCancellation,
        handleMaintenanceReportEdition,
        handleMaintenanceReportDeletion,
        setMaintenanceReports,
        setSelectedReports,
        setMaintenanceReportFormData,
        handleLeavingMaintenanceReportsCalendar,
    } = useMaintenanceReport(vehicle);
    const {
        serviceDate,
        serviceProviderEventFormData,
        handleServiceProviderEventFormChange,
        handleServiceDateChange,
        handleServiceProviderEventUpdateSubmission,
        handleServiceProviderEventEditionCancellation,
        handleServiceProviderEventEdition,
        handleServiceProviderEventDeletion,
    } = useServiceProviderEvent(maintenanceReportFormData, setMaintenanceReportFormData, maintenanceReports, setMaintenanceReports, selectedReports, setSelectedReports, setErrorState, setIsLoading)
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

    } = usePartPurchaseEvent(maintenanceReportFormData, setMaintenanceReportFormData, maintenanceReports, setMaintenanceReports, selectedReports, setSelectedReports, setErrorState, setIsLoading)


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
                <MaintenanceReport maintenanceReportFormData={maintenanceReportToEdit}
                                   isMaintenanceReportPutRequest={true}
                                   showMaintenanceForm={true}
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
                                 handleDismissFetchingReports={() => console.log("dismiss fetching reports")}
                />
            )
        }
        return (
            <CalendarView maintenanceReports={maintenanceReports} onMonthChange={onMonthChange} onDayPressed={onDayPressed} isLoading={isLoading}
                          currentDate={currentDate} onCancel={handleLeavingMaintenanceReportsCalendar}/>
        )
    }
    return (
        <SafeAreaView>
            <ScrollView>
                {renderContent()}
            </ScrollView>
        </SafeAreaView>
    )
}
export default MaintenanceReportsDetails;
