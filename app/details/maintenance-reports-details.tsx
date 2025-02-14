import {SafeAreaView, ScrollView, View} from "react-native";
import ReportsCalendar from "../../components/ReportsCalendar";
import {ThemedButton} from "@/components";
import {router} from "expo-router";
import {useGlobalContext} from "@/context/GlobalProvider";
import {DateData} from "react-native-calendars";
import {useEffect, useState} from "react";
import {API} from "@/constants/endpoints";
import axios from "axios";
import {MaintenanceReportWithStringsType} from "@/types/maintenance";

const MaintenanceReportsDetails = () => {
    const {vehicle} = useGlobalContext();
    const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [maintenanceReports, setMaintenanceReports] = useState<MaintenanceReportWithStringsType[]>([])
    const [displayLoadingIndicator, setDisplayLoadingIndicator] = useState(false)


    useEffect(() => {
        const fetchMaintenanceReports = async () => {
            setDisplayLoadingIndicator(true);
            try {
                const url = `${API}maintenance/reports/?vehicle_id=${vehicle.id}&year=${year}&month=${month}`
                const options = {headers: {'Content-Type': "application/json"}, withCredentials: true};
                const response = await axios.get(url, options)
                console.log(month, year, response.data.results)
                setMaintenanceReports(response.data.results);
            } catch (error: any) {
                console.log(error.response.data)
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
    const onDayPressed = () => {
        console.log("Day pressed");
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View className={"w-full justify-center items-center h-full px-4"}>
                    <View className={"w-[94%] bg-white rounded p-3"}>
                        <ReportsCalendar maintenanceReports={maintenanceReports}
                                         onMonthChange={onMonthChange}
                                         onDayPressed={onDayPressed}
                                         displayLoadingIndicator={displayLoadingIndicator}

                        />
                        <ThemedButton title={"Cancel"}

                                      handlePress={handleLeavingMaintenanceReportsCalendar}
                                      containerStyles={"bg-default p-5 rounded mt-3"}
                                      textStyles={"text-white font-semibold text-base"}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MaintenanceReportsDetails;
