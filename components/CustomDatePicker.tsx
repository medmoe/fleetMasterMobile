import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {icons} from "@/constants/icons";
import DateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";

interface CustomDatePickerProps {
    date: Date
    handleChange: (name: string) => (_ : DateTimePickerEvent, date: Date | undefined) => void
    label: string
    name: string
}

const CustomDatePicker = ({date, handleChange, label, name}: CustomDatePickerProps) => {
    return (
        <View className={"justify-center p-4"}>
            <Text className={"text-txt font-open-sans text-sm"}>{label}</Text>
            <View className={"mt-3 justify-start items-center flex-row"}>
                <Image source={icons.calendar} resizeMode={"contain"} className={"w-[25px] h-[25px] mr-[5px]"}/>
                <DateTimePicker value={date} mode={"date"} display={"default"}
                                onChange={handleChange(name)}/>
            </View>
        </View>
    );
};
export default CustomDatePicker;
