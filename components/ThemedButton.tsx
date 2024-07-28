import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType} from 'react-native';
import {icons} from "@/constants/icons";
interface ThemedButtonProps {
    title: string,
    handlePress: () => void,
    containerStyles: string,
    textStyles?: string,
    isLoading?: boolean,
    icon?: ImageSourcePropType,
}

const ThemedButton = ({title, handlePress, containerStyles, textStyles, isLoading, icon}: ThemedButtonProps) => {
    return (
        <TouchableOpacity
            className={`rounded-[50%] justify-center items-center min-h-[60px] flex-row ${containerStyles} ${isLoading? 'opacity-50': ''}`}
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
        >
            <View className="mr-[15px]">
                <Image source={icon} />
            </View>
            <Text className={`${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    );
};

export default ThemedButton;
