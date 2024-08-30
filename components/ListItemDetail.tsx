import {Text} from "react-native";
import React from "react";

function ListItemDetail({label, value}: { label: string, value: string | undefined }) {
    return (
        <Text className={"text-txt text-sm font-open-sans"}>
            <Text className={"text-default text-sm font-open-sans"}>{label}:</Text> {value}
        </Text>
    );
}

export default ListItemDetail;
