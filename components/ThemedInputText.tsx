import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

interface ThemedInputTextProps {
    containerStyles: string,
    placeholder: string,
    onChange: () => void,
}

const ThemedInputText = ({containerStyles, placeholder, onChange}: ThemedInputTextProps) => {
    return (
        <TextInput
            className={`${containerStyles} rounded-[50%]`}
            placeholder={placeholder}
            onChangeText={onChange}
        />
    );
};
export default ThemedInputText;
