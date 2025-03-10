import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ListItemDetail from "@/components/ListItemDetail";

interface PartPurchaseEventViewerProps {
    name: string
    provider: string
    cost: string
    purchase_date?: string
}

const PartPurchaseEventViewer = ({name, provider, cost, purchase_date}: PartPurchaseEventViewerProps) => {
    return (
        <View className={"flex-1 p-2 bg-white shadow rounded-xl mt-2"}>
            <ListItemDetail label={"Name"} value={name} />
            <ListItemDetail label={"Provider"} value={provider} />
            <ListItemDetail label={"Cost"} value={cost} />
            <ListItemDetail label={"Purchase Date"} value={purchase_date} />
        </View>
    );
};

export default PartPurchaseEventViewer;
