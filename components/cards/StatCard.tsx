import React from 'react';
import {Text, View} from 'react-native';
import Percentage, {PercentageProps} from "@/components/Percentage";

interface StatCardProps {
    label: string
    result: string
    containerStyles?: string
}

const StatCard = ({label, result, percentage, icon, color, containerStyles}: StatCardProps & PercentageProps) => {
    return (
        <View className={`flex-1 rounded p-2 bg-white shadow ${containerStyles}`}>
            <View className={"flex-row items-center"}>
                <Text className={"text-txt font-semibold text-3xl flex-1"}>{result}</Text>
                <Percentage percentage={percentage} icon={icon} color={color} />
            </View>
            <Text className={"text-default mt-3"}>{label}</Text>
        </View>
    );
};

export default StatCard;
