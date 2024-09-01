import React from 'react';
import {Picker} from "@react-native-picker/picker";
import {PickerItemType} from "@/types/types";

interface CustomPickerProps {
    name: string
    value: string
    items: PickerItemType[]
    handlePickerChange: (value: number | null | string, name: string) => void
}

const CustomPicker = ({name, value, items, handlePickerChange}: CustomPickerProps) => {
    return (
        <Picker onValueChange={(value) => handlePickerChange(value, name)} selectedValue={value}>
            {items.map((item, idx) => {
                return (
                    <Picker.Item label={item.label} value={item.value} key={idx}/>
                )
            })}
        </Picker>
    );
};
export default CustomPicker;
