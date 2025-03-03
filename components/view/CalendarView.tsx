import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {MaintenanceReportWithStringsType} from "@/types/maintenance";
import {DateData} from "react-native-calendars";
import ReportsCalendar from "@/components/ReportsCalendar";
import ThemedButton from "@/components/ThemedButton";

interface CalendarViewProps {
    maintenanceReports: MaintenanceReportWithStringsType[];
    onMonthChange: (month: DateData) => void;
    onDayPressed: (date: DateData) => void;
    isLoading: boolean;
    currentDate: string;
    onCancel: () => void;
}

const CalendarView = ({
                                 maintenanceReports,
                                 onMonthChange,
                                 onDayPressed,
                                 isLoading,
                                 currentDate,
                                 onCancel
                             }: CalendarViewProps) => {
    return (
        <View className={"w-full justify-center items-center h-full px-4"}>
            <View className={"w-[94%] bg-white rounded p-3"}>
                {isLoading && <ActivityIndicator size={"large"} color={"#3f51b5"}/>}
                <ReportsCalendar maintenanceReports={maintenanceReports}
                                 onMonthChange={onMonthChange}
                                 onDayPressed={onDayPressed}
                                 displayLoadingIndicator={isLoading}
                                 current={currentDate}
                />
                <ThemedButton title={"Cancel"}
                              handlePress={onCancel}
                              containerStyles={"bg-default p-5 rounded mt-3"}
                              textStyles={"text-white font-semibold text-base"}
                />
            </View>
        </View>
    )

}

export default CalendarView;