import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {icons} from "@/constants/icons";

interface TableEntryProps {
    name: string,
    numeric: number | string,
    status: boolean | string,
    note?: string
    containerStyles?: string
    textStyles?: string
}

const TableEntry = ({name, numeric, status, note, containerStyles, textStyles}: TableEntryProps) => {

    return (
        <View className={`${containerStyles} flex-row`}>
            <View className={"flex-1"}>
                <Text className={`${textStyles}`} numberOfLines={1}>{name}</Text>
            </View>
            <View className={"flex-1"}>
                <Text className={`${textStyles}`}>{numeric}</Text>
            </View>
            <View className={"flex-1"}>{typeof status === 'boolean'?
                status?
                    <Image source={icons.active}
                           resizeMode={"contain"}
                           className={"w-6 h-6"} />:
                    <Image source={icons.inactive}
                           resizeMode={"contain"}
                           className={"w-6 h-6"} />:
                <Text className={`${textStyles}`}>{status}</Text>
            }</View>
            <View className={"flex-1"}>
                <Text className={`${textStyles}`} numberOfLines={1} ellipsizeMode={"tail"}>{note}</Text>
            </View>
        </View>
    );
};
export default TableEntry;
