import {SafeAreaView, ScrollView, Text, View} from "react-native";
import ReportsCalendar from "../../components/ReportsCalendar";
import {ErrorNotificationBar, MaintenanceReportCard, ThemedButton} from "@/components";
import {router} from "expo-router";
import {useGlobalContext} from "@/context/GlobalProvider";
import {DateData} from "react-native-calendars";
import {useEffect, useState} from "react";
import {API} from "@/constants/endpoints";
import axios from "axios";
import {MaintenanceReportWithStringsType} from "@/types/maintenance";
import MaintenanceReport from "@/app/maintenance/maintenance-report";

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
        const reportToEdit: [MaintenanceReportWithStringsType, boolean] | undefined = selectedReports.find(([report, expanded]) => report.id === id);
        if (reportToEdit) {
            setMaintenanceReportToEdit(reportToEdit[0]);
        }
    }
    return (
        <SafeAreaView>
            <ScrollView>
                {showMaintenanceReport ? <MaintenanceReport maintenanceReportFormData={maintenanceReportToEdit}
                                                            isMaintenanceReportPutRequest={true}
                                                            showMaintenanceForm={true}
                    /> :
                    showSelectedReports ?
                        <View className={"w-full justify-center items-center"}>
                            <View className={"w-[94%] bg-white rounded p-5"}>
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
                                                                   handleMaintenanceReportDeletion={() => console.log("trash pressed")}
                                                                   handleMaintenanceReportEdition={handleMaintenanceReportEdition}
                                            />
                                        )
                                    })}
                                </View>
                                <ThemedButton title={"Cancel"} handlePress={handleMaintenanceReportViewCancellation}
                                              containerStyles={"bg-default p-5 rounded mt-3"}
                                              textStyles={"text-white font-semibold text-base"}
                                />
                            </View>
                        </View>
                        :
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
                            <ErrorNotificationBar isVisible={isErrorModalVisible}
                                                  errorMessage={errorMessage}
                                                  onDismiss={handleDismissFetchingReports}
                            />
                        </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default MaintenanceReportsDetails;
