import React from 'react';
import {View, Text} from 'react-native'
import {PickerItemType} from "@/types/types";
import {RadioButton} from "react-native-paper";

interface CustomPickerProps {
    name: string
    value: string
    items: PickerItemType[]
    handleChange: (name: string, value: string) => void
}

const CustomPicker = ({name, value, items, handleChange}: CustomPickerProps) => {
    return (
        <View className={"border-2 border-default rounded mt-3 mb-3"}>
            <RadioButton.Group onValueChange={(value) => handleChange(name, value)} value={value}>
                {items.map((item, idx) => <RadioButton.Item label={item.label} value={item.value} key={idx}/>)}
            </RadioButton.Group>
        </View>

    );
};
export default CustomPicker;