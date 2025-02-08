import React from 'react';
import {Image, ImageSourcePropType, Text, TextInput, View} from 'react-native';

export interface ThemedInputTextProps {
    containerStyles?: string,
    inputContainerStyles?: string,
    placeholder: string,
    value: string,
    onChange: (name: string, value: string) => void,
    name: string,
    icon?: ImageSourcePropType,
}

const ThemedInputText = ({
                             containerStyles,
                             inputContainerStyles,
                             placeholder,
                             onChange,
                             value,
                             name,
                             icon
                         }: ThemedInputTextProps) => {
    return (
        <View className={`${containerStyles}`}>
            <Text className={"text-txt text-sm font-open-sans"}>{placeholder}:</Text>
            <View className={`${inputContainerStyles} rounded flex-row items-center`}>
                {icon && <Image source={icon} resizeMode={"contain"} className={"w-[25px] h-[25px] mr-[10px]"}/>}
                <TextInput
                    className={"flex-1"}
                    placeholder={placeholder}
                    onChangeText={(text) => onChange(name, text)}
                    value={value}
                    secureTextEntry={name === "password"}
                />
            </View>
        </View>


    );
};
export default ThemedInputText;
