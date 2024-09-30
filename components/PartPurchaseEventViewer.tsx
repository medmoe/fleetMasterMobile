import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ListItemDetail from "@/components/ListItemDetail";

interface PartPurchaseEventViewerProps {
    name: string
    provider: string
    cost: string
}

const PartPurchaseEventViewer = ({name, provider, cost}: PartPurchaseEventViewerProps) => {
    return (
        <View className={"flex-1 p-2 bg-white shadow rounded-xl mt-2"}>
            <ListItemDetail label={"Name"} value={name} />
            <ListItemDetail label={"Provider"} value={provider} />
            <ListItemDetail label={"Cost"} value={cost} />
        </View>
    );
};

export default PartPurchaseEventViewer;
