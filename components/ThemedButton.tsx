import React from 'react';
import {Image, ImageSourcePropType, Text, TouchableOpacity, View} from 'react-native';

interface ThemedButtonProps {
    title: string,
    handlePress: () => void,
    containerStyles: string,
    textStyles?: string,
    iconStyles?: string,
    isLoading?: boolean,
    icon?: ImageSourcePropType,
    imageStyles?: string
}

const ThemedButton = ({title, handlePress, containerStyles, textStyles, isLoading, icon, iconStyles, imageStyles}: ThemedButtonProps) => {
    return (
        <TouchableOpacity
            className={`justify-center items-center flex-row ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
        >
            {icon ?
                <View className={`${iconStyles}`}>
                    <Image source={icon} resizeMode={"contain"} className={imageStyles}/>
                </View> : <></>
            }
            <Text className={`${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    );
};

export default ThemedButton;
