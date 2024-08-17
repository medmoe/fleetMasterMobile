import React from 'react';
import {View, Text, StyleSheet, TextInput, ImageSourcePropType, Image} from 'react-native';

interface ThemedInputTextProps {
    containerStyles: string,
    placeholder: string,
    value: string,
    onChange: (name: string, value: string) => void,
    name: string,
    icon?: ImageSourcePropType,
}

const ThemedInputText = ({containerStyles, placeholder, onChange, value, name, icon}: ThemedInputTextProps) => {
    return (
        <View className={`${containerStyles} rounded-[50%] flex-row items-center`}>
            {icon && <Image source={icon} resizeMode={"contain"} className={"w-[25px] h-[25px] mr-[10px]"}/>}
            <TextInput
                className={"flex-1"}
                placeholder={placeholder}
                onChangeText={(text) => onChange(name, text)}
                value={value}
                secureTextEntry={name === "password"}
            />
        </View>

    );
};
export default ThemedInputText;
