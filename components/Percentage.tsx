import React from 'react';
import {View, Text, StyleSheet, ImageSourcePropType, Image} from 'react-native';

export interface PercentageProps {
    percentage: string
    icon: ImageSourcePropType,
    color: string,
}

const Percentage = ({percentage, icon, color}: PercentageProps ) => {
    return (
        <View className={"flex-row items-center flex-1"}>
            <Image source={icon} resizeMode={"contain"} className={"w-5 h-5"} style={{tintColor: color}}/>
            <Text style={{color: color, fontSize: 12}}>{percentage}</Text>
        </View>
    );
};

export default Percentage;
