import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomPicker from "@/components/CustomPicker";
import ThemedButton from "@/components/ThemedButton";

interface MaintenancePickerProps {
    containerStyles: string
    title: string
    name: string
    value: string
    items: any[]
    handleChange: () => void
    buttonTitle: string
    handleButtonPress: () => void
}

const MaintenancePicker = ({containerStyles, title, name, value, items, handleButtonPress, handleChange, buttonTitle}: MaintenancePickerProps) => {
    return (
        <View className={`${containerStyles}`}>
            <Text className={"text-txt text-sm font-open-sans"}>{title}</Text>
            <CustomPicker name={name} value={value} items={items} handleChange={handleChange} />
            <ThemedButton title={buttonTitle} handlePress={handleButtonPress} containerStyles={"bg-secondary w-full p-5 rounded-[50%]"} textStyles={"text-white font-semibold text-base"}/>
        </View>
    );
};

export default MaintenancePicker;
