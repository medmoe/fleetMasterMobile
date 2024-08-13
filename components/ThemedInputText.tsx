import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

interface ThemedInputTextProps {
    containerStyles: string,
    placeholder: string,
    value: string,
    onChange: (name: string, value: string) => void,
    name: string,
}

const ThemedInputText = ({containerStyles, placeholder, onChange, value, name}: ThemedInputTextProps) => {
    return (
        <TextInput
            className={`${containerStyles} rounded-[50%]`}
            placeholder={placeholder}
            onChangeText={(text) => onChange(name, text)}
            value={value}
            secureTextEntry={name === "password"}
        />
    );
};
export default ThemedInputText;
