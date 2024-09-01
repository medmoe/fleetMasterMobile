import React from 'react';
import {Picker} from "@react-native-picker/picker";
import {PickerItemType} from "@/types/types";

interface CustomPickerProps {
    name: string
    value: string
    items: PickerItemType[]
    handleChange: (name: string, value: string) => void
}

const CustomPicker = ({name, value, items, handleChange}: CustomPickerProps) => {
    return (
        <Picker onValueChange={(value) => handleChange(name, value)} selectedValue={value}>
            {items.map((item, idx) => <Picker.Item label={item.label} value={item.value} key={idx}/>)}
        </Picker>
    );
};
export default CustomPicker;
