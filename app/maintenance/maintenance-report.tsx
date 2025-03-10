import React, {useEffect} from 'react';
import {ActivityIndicator, Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {ErrorNotificationBar, ListItemDetail, MaintenanceReportForm, RangeCard, Spinner, StatCard, ThemedButton} from "@/components";
import {useGlobalContext} from "@/context/GlobalProvider";
import {MaintenanceReportWithStringsType} from "@/types/maintenance";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useMaintenanceReport, usePartPurchaseEvent, useServiceProviderEvent} from "@/hooks";
import {filterReports, getMaintenanceStatData, transformMaintenanceStatData} from "@/utils/maintenance";
import SimpleChart from "@/components/charts/SimpleChart";

export interface MaintenanceReportProps {
    maintenanceReportFormData?: MaintenanceReportWithStringsType;
    isMaintenanceReportPutRequest?: boolean
    showMaintenanceForm?: boolean
}

const MaintenanceReport = ({...props}: MaintenanceReportProps) => {
    const {vehicle, maintenanceReports, setMaintenanceReports} = useGlobalContext();
    const {
        searchingFilterLabels,
        isMaintenanceReportPutRequest,
        maintenanceReportDates,
        activeFilter,
        showMaintenanceForm,
        isLoading,
        maintenanceReportFormData,
        selectedReports,
        errorState,
        periodicalReports,
        setView,
        fetchMaintenanceReports,
        isLoadingStatData,
        setIsLoadingStatData,
        setIsLoading,
        setErrorState,
        setSelectedReports,
        setPeriodicalReports,
        handleFilterRangeChange,
        setMaintenanceReportFormData,
        handleStartingRecordingMaintenance,
        handleCancelingRecordingMaintenance,
        handleErrorNotificationDismissal,
        handleDateChange,
        handleMaintenanceReportFormChange,
        handleMaintenanceReportSubmission,
        handleMaintenanceReportCancellation,
        handleShowingMaintenanceReports,
    } = useMaintenanceReport(vehicle, maintenanceReports, setMaintenanceReports, props);
    const {
        showPartPurchaseEventForm,
        isPartPurchaseEventFormDataEdition,
        indexOfPartPurchaseEventToEdit,
        isPartSelected,
        partPurchaseEventFormData,
        purchaseDate,
        searchTerm,
        handleNewPartAddition,
        handleNewPartsProviderAddition,
        handleSelectingPart,
        handlePartPurchaseEventAddition,
        handlePartInputChange,
        handlePurchaseDateChange,
        setShowPartPurchaseEventForm,
        setIsPartSelected,
        handlePartPurchaseEventEditionWithReport,
        handlePartPurchaseEventDeletionWithReport,
        handlePartPurchaseEventFormChange
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
    );
    const {
        showServiceProviderEventForm,
        isServiceProviderEventFormDataEdition,
        indexOfServiceProviderEventToEdit,
        serviceProviderEventFormData,
        serviceDate,
        handleNewServiceProviderAddition,
        handleServiceProviderEventAddition,
        handleServiceProviderEventFormChange,
        handleServiceDateChange,
        setShowServiceProviderEventForm,
        handleServiceProviderEventDeletionWithReport,
        handleServiceProviderEventEditionWithReport
    } = useServiceProviderEvent(
        maintenanceReportFormData,
        setMaintenanceReportFormData,
        maintenanceReports,
        setMaintenanceReports,
        selectedReports,
        setSelectedReports,
        setErrorState,
        setIsLoading,
        setView
    );
    const pairStatData = transformMaintenanceStatData(getMaintenanceStatData(periodicalReports));
    const buttons = [
        {title: "Add New Part", handlePress: handleNewPartAddition, color: "bg-secondary-500"},
        {title: "Add New Parts Provider", handlePress: handleNewPartsProviderAddition, color: "bg-secondary-500"},
        {title: "Add New Service Provider", handlePress: handleNewServiceProviderAddition, color: "bg-secondary-500"},
        {title: "Record Maintenance", handlePress: handleStartingRecordingMaintenance, color: "bg-primary-500"},
        {title: "Cancel", handlePress: handleCancelingRecordingMaintenance, color: "bg-default"},
    ]
    useEffect(() => {
        fetchMaintenanceReports();
    }, []);
    useEffect(() => {
        if (maintenanceReports.length > 0) {
            setPeriodicalReports(filterReports(maintenanceReports, "1Y"))
            setIsLoadingStatData(false);
        }
    }, [maintenanceReports]);
    return (
        <SafeAreaView>
            <ScrollView>
                {isLoading ?
                    <View className={"w-full justify-center items-center px-4"}><Spinner isVisible={isLoading}/></View> :
                    !showMaintenanceForm ?
                        <View className={"w-full justify-center items-center"}>
                            <View className={"w-[94%] bg-white rounded p-3"}>
                                <View className={"w-full bg-white rounded shadow p-2"}>
                                    <View className={"flex-row"}>
                                        <View className={"flex-1 flex-row"}>
                                            <View className={"flex-1"}>
                                                <Text className={"font-semibold text-base text-txt"}>Vehicle's
                                                    information</Text>
                                                <ListItemDetail label={"Vehicle's name"}
                                                                value={`${vehicle.make} ${vehicle.model} ${vehicle.year}`}
                                                                textStyle={"text-txt"}/>
                                                <ListItemDetail label={"Purchase date"} value={vehicle.purchase_date}
                                                                textStyle={"text-txt"}/>
                                                <ListItemDetail label={"Mileage"} value={vehicle.mileage}
                                                                textStyle={"text-txt"}/>
                                                <ListItemDetail label={"Status"} value={vehicle.status} textStyle={"text-txt"}/>
                                            </View>
                                            <View className={"justify-center items-center ml-4"}>
                                                <Pressable onPress={handleShowingMaintenanceReports}
                                                           className={"p-4 bg-secondary-100 rounded-lg shadow-md"}>
                                                    <FontAwesome name={'files-o'} size={48} color={"#ef6c00"}/>
                                                    <Text className={"text-secondary-800 font-semibold text-base mt-2"}>Reports</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View className={"mt-[20px] flex-row"}>
                                    {searchingFilterLabels.map((label, idx) => {
                                        return <RangeCard title={label} handlePress={handleFilterRangeChange}
                                                          isActive={activeFilter === idx} key={idx}/>
                                    })}
                                </View>
                                {isLoadingStatData ? <ActivityIndicator size={"large"} color={"#ef6c00"}/> :
                                    <View className={"flex-col"}>
                                        {pairStatData.map(([item1, item2], idx) => {
                                            const [label1, value1, percentage1, color1, icon1] = item1
                                            const [label2, value2, percentage2, color2, icon2] = item2
                                            return (
                                                <View className={"mt-[20px] flex-row"} key={idx}>
                                                    <StatCard label={label1}
                                                              result={value1}
                                                              percentage={percentage1}
                                                              color={color1}
                                                              icon={icon1}
                                                              containerStyles={"mr-[5px] w-[48%] h-full"}
                                                    />
                                                    <StatCard label={label2}
                                                              result={value2}
                                                              percentage={percentage2}
                                                              color={color2}
                                                              icon={icon2}
                                                              containerStyles={"w-[48%] h-full"}
                                                    />
                                                </View>
                                            )
                                        })}
                                    </View>}
                                {buttons.map(({title, handlePress, color}, idx) => {
                                    return (
                                        <ThemedButton title={title}
                                                      handlePress={handlePress}
                                                      containerStyles={`${color} w-full p-5 rounded mt-3`}
                                                      textStyles={"text-white font-semibold text-base"}
                                                      key={idx}
                                        />
                                    )
                                })}
                            </View>
                        </View>
                        :
                        <View>
                            <MaintenanceReportForm
                                purchaseDate={purchaseDate}
                                serviceDate={serviceDate}
                                handlePurchaseDateChange={handlePurchaseDateChange}
                                handleServiceDateChange={handleServiceDateChange}
                                handleDateChange={handleDateChange}
                                handleMaintenanceReportCancellation={handleMaintenanceReportCancellation}
                                handleMaintenanceReportFormChange={handleMaintenanceReportFormChange}
                                handleMaintenanceReportSubmission={handleMaintenanceReportSubmission}
                                handlePartInputChange={handlePartInputChange}
                                handlePartPurchaseEventAddition={handlePartPurchaseEventAddition}
                                handlePartPurchaseEventDeletion={handlePartPurchaseEventDeletionWithReport}
                                handlePartPurchaseEventEdition={handlePartPurchaseEventEditionWithReport}
                                handlePartPurchaseEventFormChange={handlePartPurchaseEventFormChange}
                                handleServiceProviderEventAddition={handleServiceProviderEventAddition}
                                handleServiceProviderEventDeletion={handleServiceProviderEventDeletionWithReport}
                                handleServiceProviderEventEdition={handleServiceProviderEventEditionWithReport}
                                handleServiceProviderEventFormChange={handleServiceProviderEventFormChange}
                                indexOfPartPurchaseEventToEdit={indexOfPartPurchaseEventToEdit}
                                indexOfServiceProviderEventToEdit={indexOfServiceProviderEventToEdit}
                                isPartPurchaseEventFormDataEdition={isPartPurchaseEventFormDataEdition}
                                isPartSelected={isPartSelected}
                                isServiceProviderEventFormDataEdition={isServiceProviderEventFormDataEdition}
                                isUpdate={isMaintenanceReportPutRequest}
                                maintenanceReportDates={maintenanceReportDates}
                                maintenanceReportFormData={maintenanceReportFormData}
                                partPurchaseFormData={partPurchaseEventFormData}
                                searchTerm={searchTerm}
                                handleSelectingPart={handleSelectingPart}
                                serviceProviderEventFormData={serviceProviderEventFormData}
                                setIsPartSelected={setIsPartSelected}
                                setShowPartPurchaseEventForm={setShowPartPurchaseEventForm}
                                setShowServiceProviderEventForm={setShowServiceProviderEventForm}
                                showPartPurchaseEventForm={showPartPurchaseEventForm}
                                showServiceProviderEventForm={showServiceProviderEventForm}
                            />
                        </View>
                }
                <ErrorNotificationBar isVisible={errorState.isErrorModalVisible}
                                      errorMessage={errorState.errorMessage}
                                      onDismiss={handleErrorNotificationDismissal}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
export default MaintenanceReport;
