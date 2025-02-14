import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {Calendar, DateData, LocaleConfig} from 'react-native-calendars';
import {MaintenanceReportWithStringsType} from "@/types/maintenance";

interface ReportsCalendarProps {
    maintenanceReports: MaintenanceReportWithStringsType[]
    onMonthChange: (month: DateData) => void
    onDayPressed: () => void
    displayLoadingIndicator: boolean
}

interface MarkedDates {
    [date: string]: {
        marked: boolean;
        dotColor: string;
        activeOpacity: number;
        count?: number; // Optional property
    };
}


LocaleConfig.locales['en'] = {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
}
LocaleConfig.defaultLocale = 'en';

const ReportsCalendar = ({maintenanceReports, onDayPressed, onMonthChange, displayLoadingIndicator}: ReportsCalendarProps) => {
    console.log(maintenanceReports);
    const markedDates: MarkedDates = {};
    maintenanceReports.forEach(report => {
        markedDates[report.start_date] = {marked: true, dotColor: 'red', activeOpacity: 0.8, count: 1};
    })
    return (
        <View className={"flex-1"}>
            <Calendar markingType={"dot"}
                      displayLoadingIndicator={displayLoadingIndicator}
                      markedDates={markedDates}
                      onMonthChange={(month) => onMonthChange(month)}
                      hideExtraDays={true}
                      dayComponent={({date, state, marking}) => {
                          return (
                              <Pressable className={marking?.marked? "p-3 bg-red-300 rounded-[100%]" : "p-3"} onPress={onDayPressed}>
                                  <Text className={state === "disabled"? "grey" : "black"}>{date?.day}</Text>
                              </Pressable>
                          )
                      }}
            />

        </View>
    );
}

export default ReportsCalendar;