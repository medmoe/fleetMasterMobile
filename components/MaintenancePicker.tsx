import React from 'react';
import {Text, View} from 'react-native';
import CustomPicker from "@/components/CustomPicker";

interface MaintenancePickerProps {
    containerStyles: string
    title: string
    name: string
    value: string
    items: any[]
    handleItemChange: (name: string, value: string) => void
}

const MaintenancePicker = ({containerStyles, title, name, value, items, handleItemChange}: MaintenancePickerProps) => {
    return (
        <View className={`${containerStyles}`}>
            <Text className={"text-txt text-sm font-open-sans"}>{title}</Text>
            <CustomPicker name={name} value={value} items={items} handleChange={handleItemChange}/>
        </View>
    );
};

export default MaintenancePicker;
