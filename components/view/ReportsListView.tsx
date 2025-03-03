import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {MaintenanceReportWithStringsType} from "@/types/maintenance";
import MaintenanceReportCard from "@/components/cards/MaintenanceReportCard";
import ThemedButton from "@/components/ThemedButton";
import ErrorNotificationBar from "@/components/ErrorNotificationBar";

interface ReportsListViewProps {
    isLoading: boolean
    selectedReports: [MaintenanceReportWithStringsType, boolean][]
    handleCollapse: (id?: string) => void
    handleMaintenanceReportDeletion: (id?: string) => void
    handleMaintenanceReportEdition: (id?: string) => void
    handleServiceProviderEventEdition: (service_provider_event_id?: string, maintenance_report_id?: string) => void
    handleServiceProviderEventDeletion: (service_provider_event_id?: string, maintenance_report_id?: string) => void
    handlePartPurchaseEventDeletion: (part_purchase_event_id?: string, maintenance_report_id?: string) => void
    handlePartPurchaseEventEdition: (part_purchase_event_id?: string, maintenance_report_id?: string) => void
    handleMaintenanceReportViewCancellation: () => void
    errorState: { isErrorModalVisible: boolean, errorMessage: string }
    handleDismissFetchingReports: () => void
}


const ReportsListView = ({
                             isLoading,
                             selectedReports,
                             handleCollapse,
                             handleMaintenanceReportDeletion,
                             handleMaintenanceReportEdition,
                             handleServiceProviderEventEdition,
                             handleServiceProviderEventDeletion,
                             handlePartPurchaseEventDeletion,
                             handlePartPurchaseEventEdition,
                             handleMaintenanceReportViewCancellation,
                             handleDismissFetchingReports,
                             errorState

                         }: ReportsListViewProps) => {
    return (
        <View className={"w-full justify-center items-center h-full px-4"}>
            <View className={"w-[94%] bg-white rounded p-5"}>
                {isLoading && <ActivityIndicator size={"large"} color={"#3f51b5"}/>}
                <View><Text className={"font-semibold text-base text-txt"}>Report's List</Text></View>
                <View><Text className={"font-open-sans text-txt"}>Here is the list of the reports submitted</Text></View>
                <View>
                    {selectedReports.map(([report, expanded], idx) => {
                        return (
                            <MaintenanceReportCard maintenanceReport={report} handleCollapse={handleCollapse} expanded={expanded}
                                                   handleMaintenanceReportDeletion={handleMaintenanceReportDeletion}
                                                   handleMaintenanceReportEdition={handleMaintenanceReportEdition}
                                                   handleServiceProviderEventEdition={handleServiceProviderEventEdition}
                                                   handleServiceProviderEventDeletion={handleServiceProviderEventDeletion}
                                                   handlePartPurchaseEventDeletion={handlePartPurchaseEventDeletion}
                                                   handlePartPurchaseEventEdition={handlePartPurchaseEventEdition}
                            />
                        )
                    })}
                </View>
                <ThemedButton title={"Cancel"}
                              handlePress={handleMaintenanceReportViewCancellation}
                              containerStyles={"bg-default p-5 rounded mt-3"}/>
            </View>
            <ErrorNotificationBar isVisible={errorState.isErrorModalVisible}
                                  errorMessage={errorState.errorMessage}
                                  onDismiss={handleDismissFetchingReports}/>
        </View>
    )
}

export default ReportsListView;