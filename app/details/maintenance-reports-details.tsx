import {ActivityIndicator, Alert, SafeAreaView, ScrollView, Text, View} from "react-native";
import ReportsCalendar from "../../components/ReportsCalendar";
import {ErrorNotificationBar, MaintenanceReportCard, ThemedButton} from "@/components";
import {router} from "expo-router";
import {useGlobalContext} from "@/context/GlobalProvider";
import {DateData} from "react-native-calendars";
import {useEffect, useState} from "react";
import {API} from "@/constants/endpoints";
import axios from "axios";
import {MaintenanceReportWithStringsType, ServiceProviderEventType} from "@/types/maintenance";
import MaintenanceReport from "@/app/maintenance/maintenance-report";
import ServiceProviderEventForm from "@/components/forms/ServiceProviderEventForm";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {getLocalDateString} from "@/utils/helpers";

const MaintenanceReportsDetails = () => {
    const {vehicle} = useGlobalContext();
    const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [currentDate, setCurrentDate] = useState(`${year}-${month}-01`)
    const [maintenanceReports, setMaintenanceReports] = useState<MaintenanceReportWithStringsType[]>([])
    const [displayLoadingIndicator, setDisplayLoadingIndicator] = useState(false)
    const [showSelectedReports, setShowSelectedReports] = useState(false)
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedReports, setSelectedReports] = useState<[MaintenanceReportWithStringsType, boolean][]>([])
    const [showMaintenanceReport, setShowMaintenanceReport] = useState(false)
    const [maintenanceReportToEdit, setMaintenanceReportToEdit] = useState<MaintenanceReportWithStringsType | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [showServiceProviderEventForm, setShowServiceProviderEventForm] = useState(false);
    const {generalData} = useGlobalContext();
    const [eventsDates, setEventsDates] = useState({
        "purchase_date": new Date(),
        "service_date": new Date(),
    })
    const [serviceProviderEventFormData, setServiceProviderEventFormData] = useState<ServiceProviderEventType>({
            service_provider: {
                name: "",
                phone_number: "",
                address: "",
                service_type: "MECHANIC"
            },
            service_date: getLocalDateString(new Date()),
            cost: "0",
            description: ""
        }
    )
    useEffect(() => {
        const fetchMaintenanceReports = async () => {
            setDisplayLoadingIndicator(true);
            try {
                const url = `${API}maintenance/reports/?vehicle_id=${vehicle.id}&year=${year}&month=${month}`
                const options = {headers: {'Content-Type': "application/json"}, withCredentials: true};
                const response = await axios.get(url, options)
                setMaintenanceReports(response.data.results);
            } catch (error: any) {
                if (error.response.status === 401) {
                    router.replace("/");
                }
                setIsErrorModalVisible(true);
                setErrorMessage("Could not fetch maintenance reports!");
                console.log(error.response.data);
            } finally {
                setDisplayLoadingIndicator(false)
            }
        }
        fetchMaintenanceReports();
    }, [month]);

    const handleLeavingMaintenanceReportsCalendar = () => {
        router.replace("/maintenance/maintenance-report");
    }
    const onMonthChange = (month: DateData) => {
        setMonth(month.month.toString());
        setYear(month.year.toString());
    }
    const onDayPressed = (date: DateData) => {
        setShowSelectedReports(true);
        setSelectedReports(getReports(date.dateString))
    }
    const handleMaintenanceReportViewCancellation = () => {
        setShowSelectedReports(false);
        setCurrentDate(`${year}-${month}-01`);
    }
    const getReports = (date: string): [MaintenanceReportWithStringsType, boolean][] => {
        let left = 0;
        let right = maintenanceReports.length - 1;
        let anyMatchIndex = -1
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const midDate = maintenanceReports[mid].start_date
            const comparison = date.localeCompare(midDate);
            if (comparison === 0) {
                anyMatchIndex = mid;
                break;
            } else if (comparison < 0) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        if (anyMatchIndex === -1) {
            return [];
        }
        let start = anyMatchIndex;
        while (start >= 0 && maintenanceReports[start].start_date === date) {
            start--;
        }
        let end = anyMatchIndex;
        while (end < maintenanceReports.length && maintenanceReports[end].start_date === date) {
            end++;
        }
        return maintenanceReports.slice(start + 1, end).map(report => [report, false]);
    }
    const handleDismissFetchingReports = () => {
        setIsErrorModalVisible(false);
    }
    const handleCollapse = (id?: string) => {
        console.log("collapse pressed");
        setSelectedReports(selectedReports.map(([report, expanded]) => [report, id && report.id === id ? !expanded : expanded]));
    }
    const handleMaintenanceReportEdition = (id?: string) => {
        setShowMaintenanceReport(true);
        const reportToEdit: [MaintenanceReportWithStringsType, boolean] | undefined = selectedReports.find(([report]) => report.id === id);
        if (reportToEdit) {
            setMaintenanceReportToEdit(reportToEdit[0]);
        }
    }
    const handleMaintenanceReportDeletion = (id?: string) => {
        const proceedWithReportDeletion = async () => {
            setIsLoading(true);
            try {
                const url = `${API}maintenance/reports/${id}/`
                const options = {headers: {"Content-Type": "application/json"}, withCredentials: true}
                await axios.delete(url, options)
                setMaintenanceReports(maintenanceReports.filter(report => report.id !== id));
                setShowSelectedReports(false);
            } catch (error: any) {
                if (error.response.status === 401) {
                    router.replace("/");
                } else {
                    setIsErrorModalVisible(true);
                    setErrorMessage("Error deleting report !");
                    console.error("Error deleting report:", error);
                }
            } finally {
                setIsLoading(false);
            }
        }
        Alert.alert("Delete report", "Are you sure you want to delete this report? This action cannot be undone.", [
                {
                    text: "Cancel",
                    onPress: () => {
                    },
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => proceedWithReportDeletion(),
                    style: "destructive"
                }
            ],
            {cancelable: true})
    }
    const handleServiceProviderEventEdition = (service_provider_event_id?: string, maintenance_report_id?: string) => {
        setShowServiceProviderEventForm(true)
        const report = selectedReports.find(([report]) => report.id === maintenance_report_id);
        if (report) {
            const [reportToEdit, _] = report
            const serviceEventToEdit = reportToEdit.service_provider_events.find(event => event.id === service_provider_event_id)
            if (serviceEventToEdit) {
                if (serviceEventToEdit.service_provider_details) {
                    setServiceProviderEventFormData({
                        id: serviceEventToEdit.id,
                        service_provider: serviceEventToEdit.service_provider_details,
                        service_date: serviceEventToEdit?.service_date,
                        cost: serviceEventToEdit?.cost,
                        description: serviceEventToEdit?.description
                    });
                }
            }
        }
    }
    const handleServiceProviderEventDeletion = (service_provider_event_id?: string, maintenance_report_id?: string) => {
        const proceedWithServiceProviderEventDeletion = async () => {
            setIsLoading(true);
            try {
                const url = `${API}maintenance/service-provider-events/${service_provider_event_id}/`
                const options = {headers: {"Content-Type": "application/json"}, withCredentials: true}
                await axios.delete(url, options)
                setSelectedReports(selectedReports.map(([report, expanded]) => {
                    if (report.id === maintenance_report_id) {
                        report.service_provider_events = report.service_provider_events.filter(event => event.id !== service_provider_event_id);
                    }
                    return [report, expanded];
                }))
            } catch (error: any) {
                if (error.response.status === 401) {
                    router.replace("/");
                } else {
                    setIsErrorModalVisible(true);
                    setErrorMessage(error.response.data.error ? error.response.data.error : "Error deleting service provider event !");
                    console.error("Error deleting service provider event:", error);
                }
            } finally {
                setIsLoading(false);
            }
        }
        Alert.alert("Delete service provider event", "Are you sure you want to delete this service provider event? This action cannot be undone.", [
                {
                    text: "Cancel",
                    onPress: () => {
                    },
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => proceedWithServiceProviderEventDeletion(),
                    style: "destructive"
                }
            ],
            {cancelable: true})
    }
    const handleEventsDateChange = (name: string) => (_: DateTimePickerEvent, date?: Date) => {
        setEventsDates(prevState => ({
            ...prevState,
            [name]: date
        }))
    }
    const handleServiceProviderEventFormChange = (name: string, value: string) => {
        setServiceProviderEventFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleServiceProviderEventEditionCancellation = () => {
        setShowServiceProviderEventForm(false);
    }
    const formatServiceProviderEventFormData = () => {
        return {
            ...serviceProviderEventFormData,
            service_provider: serviceProviderEventFormData.service_provider.id,
            service_date: getLocalDateString(eventsDates.service_date),
        }
    }
    const handleServiceProviderEventUpdateSubmission = async () => {
        setIsLoading(true);
        try {
            const url = `${API}maintenance/service-provider-events/${serviceProviderEventFormData.id}/`
            const options = {headers: {"Content-Type": "application/json"}, withCredentials: true}
            const response = await axios.put(url, formatServiceProviderEventFormData(), options)
            setMaintenanceReports(maintenanceReports.map((report) => {
                if (report.id === response.data.maintenance_report) {
                    return {
                        ...report,
                        service_provider_events: report.service_provider_events.map(event => {
                            if (event.id === response.data.id) {
                                return response.data
                            }
                            return event
                        })
                    }
                } else {
                    return report;
                }
            }))
            setSelectedReports(selectedReports.map(([report, expanded]) => {
                if (report.id === response.data.maintenance_report) {
                    return [{
                        ...report,
                        service_provider_events: report.service_provider_events.map(event => {
                            if (event.id === response.data.id) {
                                return response.data
                            }
                            return event
                        })
                    }, expanded]
                } else {
                    return [report, expanded];
                }
            }))
            setShowServiceProviderEventForm(false);
        } catch (error: any) {
            if (error.response.status === 401) {
                router.replace("/");
            } else {
                setIsErrorModalVisible(true);
                setErrorMessage("Error updating service provider event !");
                console.error("Error updating service provider event:", error);
            }
        } finally {
            setIsLoading(false);
        }
    }
    const renderContent = () => {
        if (showServiceProviderEventForm) {
            return (
                <ServiceProviderEventForm
                    serviceProviders={generalData.service_providers}
                    service_date={eventsDates.service_date}
                    handleEventsDateChange={handleEventsDateChange}
                    serviceProviderEventFormData={serviceProviderEventFormData}
                    handleServiceProviderEventFormChange={handleServiceProviderEventFormChange}
                    handleServiceProviderEventAddition={handleServiceProviderEventUpdateSubmission}
                    handleServiceProviderEventCancellation={handleServiceProviderEventEditionCancellation}
                    isServiceProviderEventFormDataEdition={true}
                />
            )
        } else if (showMaintenanceReport) {
            return (
                <MaintenanceReport maintenanceReportFormData={maintenanceReportToEdit}
                                   isMaintenanceReportPutRequest={true}
                                   showMaintenanceForm={true}
                />
            )
        } else if (showSelectedReports) {
            return renderReportsList()
        } else {
            return renderCalendar();
        }
    }
    const renderReportsList = () => {
        return (
            <View className={"w-full justify-center items-center"}>
                <View className={"w-[94%] bg-white rounded p-5"}>
                    {isLoading && <ActivityIndicator size={"large"} color={"#3f51b5"}/>}
                    <View>
                        <Text className={"font-semibold text-base text-txt"}>Report's List</Text>
                    </View>
                    <View className={"mt-5"}>
                        <Text className={"font-open-sans text-txt"}>{`Here is the list of the reports submitted`}</Text>
                    </View>
                    <View>
                        {selectedReports.map(([report, expanded], idx) => {
                            return (
                                <MaintenanceReportCard maintenanceReport={report}
                                                       key={idx}
                                                       handleCollapse={handleCollapse}
                                                       expanded={expanded}
                                                       handleMaintenanceReportDeletion={handleMaintenanceReportDeletion}
                                                       handleMaintenanceReportEdition={handleMaintenanceReportEdition}
                                                       handleServiceProviderEventEdition={handleServiceProviderEventEdition}
                                                       handleServiceProviderEventDeletion={handleServiceProviderEventDeletion}
                                />
                            )
                        })}
                    </View>
                    <ThemedButton title={"Cancel"} handlePress={handleMaintenanceReportViewCancellation}
                                  containerStyles={"bg-default p-5 rounded mt-3"}
                                  textStyles={"text-white font-semibold text-base"}
                    />
                </View>
                <ErrorNotificationBar isVisible={isErrorModalVisible}
                                      errorMessage={errorMessage}
                                      onDismiss={handleDismissFetchingReports}
                />
            </View>
        )
    }
    const renderCalendar = () => {
        return (
            <View className={"w-full justify-center items-center h-full px-4"}>
                <View className={"w-[94%] bg-white rounded p-3"}>
                    <ReportsCalendar maintenanceReports={maintenanceReports}
                                     onMonthChange={onMonthChange}
                                     onDayPressed={onDayPressed}
                                     displayLoadingIndicator={displayLoadingIndicator}
                                     current={currentDate}

                    />
                    <ThemedButton title={"Cancel"}
                                  handlePress={handleLeavingMaintenanceReportsCalendar}
                                  containerStyles={"bg-default p-5 rounded mt-3"}
                                  textStyles={"text-white font-semibold text-base"}
                    />
                </View>
            </View>
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
