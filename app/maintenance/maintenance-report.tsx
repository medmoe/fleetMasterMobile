import React, {useEffect} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {ErrorNotificationBar, ListItemDetail, MaintenanceReportForm, RangeCard, Spinner, StatCard, ThemedButton} from "@/components";

import {useGlobalContext} from "@/context/GlobalProvider";
import {MaintenanceReportWithStringsType} from "@/types/maintenance";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useMaintenanceReport} from "@/hooks/useMaintenanceReport";
import {usePartPurchaseEvent} from "@/hooks/usePartPurchaseEvent";
import {useServiceProviderEvent} from "@/hooks/useServiceProviderEvent";
import {getMaintenanceStatData, transformMaintenanceStatData} from "@/utils/helpers";

interface MaintenanceReportProps {
    maintenanceReportFormData?: MaintenanceReportWithStringsType;
    isMaintenanceReportPutRequest?: boolean
    showMaintenanceForm?: boolean
}

const MaintenanceReport = ({...props}: MaintenanceReportProps) => {
    const {vehicle, setMaintenanceReports, maintenanceReports} = useGlobalContext();
    const {
        isVisible,
        errorMessage,
        searchingFilterLabels,
        maintenanceReport,
        isMaintenanceReportPutRequest,
        maintenanceReportDates,
        activeFilter,
        showMaintenanceForm,
        isLoading,
        maintenanceReportFormData,
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
        fetchMaintenanceReport,
    } = useMaintenanceReport(vehicle, maintenanceReports, setMaintenanceReports);
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
        handlePartPurchaseEventDeletion,
        handlePartPurchaseEventFormChange,
        handlePartInputChange,
        handlePurchaseDateChange,
        handlePartPurchaseEventEdition,
        setShowPartPurchaseEventForm,
        setIsPartSelected,
    } = usePartPurchaseEvent(maintenanceReportFormData, setMaintenanceReportFormData);
    const {
        showServiceProviderEventForm,
        isServiceProviderEventFormDataEdition,
        indexOfServiceProviderEventToEdit,
        serviceProviderEventFormData,
        serviceDate,
        handleNewServiceProviderAddition,
        handleServiceProviderEventAddition,
        handleServiceProviderEventDeletion,
        handleServiceProviderEventEdition,
        handleServiceProviderEventFormChange,
        handleServiceDateChange,
        setShowServiceProviderEventForm,
    } = useServiceProviderEvent(maintenanceReportFormData, setMaintenanceReportFormData);
    const pairStatData = transformMaintenanceStatData(getMaintenanceStatData(maintenanceReport));

    const buttons = [
        {title: "Add New Part", handlePress: handleNewPartAddition, color: "bg-secondary-500"},
        {title: "Add New Parts Provider", handlePress: handleNewPartsProviderAddition, color: "bg-secondary-500"},
        {title: "Add New Service Provider", handlePress: handleNewServiceProviderAddition, color: "bg-secondary-500"},
        {title: "Record Maintenance", handlePress: handleStartingRecordingMaintenance, color: "bg-primary-500"},
        {title: "Cancel", handlePress: handleCancelingRecordingMaintenance, color: "bg-default"},
    ]
    useEffect(() => {
        fetchMaintenanceReport();
    }, []);
    return (
        <SafeAreaView>
            <ScrollView>
                {isLoading ?
                    <View className={"w-full justify-center items-center h-full px-4"}><Spinner isVisible={isLoading}/></View> :
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
                                <View className={"flex-col"}>
                                    {pairStatData.map(([[label1, value1, percentage1, color1, icon1], [label2, value2, percentage2, color2, icon2]], idx) => {
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
                                                          containerStyles={"ml-[5px] w-[48%] h-full"}
                                                />
                                            </View>
                                        )
                                    })}
                                </View>
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
                            <ErrorNotificationBar isVisible={isVisible} errorMessage={errorMessage} onDismiss={handleErrorNotificationDismissal}/>
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
                                handlePartPurchaseEventDeletion={handlePartPurchaseEventDeletion}
                                handlePartPurchaseEventEdition={handlePartPurchaseEventEdition}
                                handlePartPurchaseEventFormChange={handlePartPurchaseEventFormChange}
                                handleServiceProviderEventAddition={handleServiceProviderEventAddition}
                                handleServiceProviderEventDeletion={handleServiceProviderEventDeletion}
                                handleServiceProviderEventEdition={handleServiceProviderEventEdition}
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
                            <ErrorNotificationBar isVisible={isVisible} errorMessage={errorMessage} onDismiss={handleErrorNotificationDismissal}/>
                        </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
};
export default MaintenanceReport;
