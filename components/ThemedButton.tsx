import React from 'react';
import {Image, ImageSourcePropType, Pressable, Text, TouchableOpacity, View} from 'react-native';

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
        <Pressable
            className={`justify-center items-center flex-row ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
            onPress={handlePress}
            disabled={isLoading}
        >
            {icon ?
                <View className={`${iconStyles}`}>
                    <Image source={icon} resizeMode={"contain"} className={imageStyles}/>
                </View> : <></>
            }
            <Text className={`${textStyles}`}>{title}</Text>
        </Pressable>
    );
};

export default ThemedButton;
