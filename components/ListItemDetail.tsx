import {Text, View} from "react-native";
import React from "react";

function ListItemDetail({label, value, containerStyle}: { label: string, value: string | undefined, containerStyle: string | undefined }) {
    return (
        <View className={`${containerStyle}`}>
            <Text className={"text-txt text-sm font-open-sans"}>
                <Text className={"text-default text-sm font-open-sans"}>{label}:</Text> {value}
            </Text>
        </View>
    );
}

export default ListItemDetail;
