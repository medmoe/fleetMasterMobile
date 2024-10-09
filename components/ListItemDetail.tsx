import {Text, View} from "react-native";
import React from "react";

interface ListItemDetailProps {
    label: string
    value?: string
    containerStyle?: string
    textStyle?: string
}

function ListItemDetail({label, value, containerStyle, textStyle}: ListItemDetailProps) {
    return (
        <View className={`${containerStyle}`}>
            <Text className={`text-sm font-open-sans ${textStyle}`}>
                <Text className={"text-default text-sm font-open-sans"}>{label}:</Text>
                {value}
            </Text>
        </View>
    );
}

export default ListItemDetail;
