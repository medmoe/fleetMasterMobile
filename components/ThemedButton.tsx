import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType, Pressable} from 'react-native';
import {icons} from "@/constants/icons";
interface ThemedButtonProps {
    title: string,
    handlePress: () => void,
    containerStyles: string,
    textStyles?: string,
    iconStyles?: string,
    isLoading?: boolean,
    icon?: ImageSourcePropType,
}

const ThemedButton = ({title, handlePress, containerStyles, textStyles, isLoading, icon, iconStyles}: ThemedButtonProps) => {
    return (
        <TouchableOpacity
            className={`justify-center items-center flex-row ${containerStyles} ${isLoading? 'opacity-50': ''}`}
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
        >
            {icon?
            <View className={`${iconStyles}`}>
                <Image source={icon} resizeMode={"contain"} className={"w-20"}/>
            </View> : <></>
            }
            <Text className={`${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    );
};

export default ThemedButton;
