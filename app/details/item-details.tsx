import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native';
import {useGlobalContext} from "@/context/GlobalProvider";
import {DriverType, ResponseDataType, VehicleType} from "@/types/types";
import {getVehicleName} from "@/utils/helpers";
import {API} from "@/constants/endpoints";
import axios from "axios";
import {router} from "expo-router";
import {handleAuthenticationErrors} from "@/utils/authentication";

const getItemDetails = (itemData: DriverType | VehicleType, vehicles?: VehicleType[]): { label: string, value: string }[] => {
    return Object.entries(itemData).map(([label, value]) => {
        label = label.charAt(0).toUpperCase() + label.slice(1).replace(/_/g, " ");
        if ("phone_number" in itemData) {
            if (label === "Vehicle") {
                value = getVehicleName(vehicles, itemData);
            }
            if (label === "Employment status") {
                value = value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, " ").toLowerCase();
            }
        } else {
            if (label === "Status") {
                value = value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, " ").toLowerCase();
            }
        }
        return {label, value}
    })
}

const isDriver = (item: DriverType | VehicleType): boolean => "phone_number" in item;


const ItemDetails = () => {
    const {currentItem, responseData, setResponseData} = useGlobalContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const details = getItemDetails(currentItem, responseData.vehicles);
    const updateResponseData = (responseData: ResponseDataType, currentItem: DriverType | VehicleType, items: (DriverType | VehicleType)[]) => {
        const updateData = {
            ...responseData,
            [isDriver(currentItem) ? 'drivers' : 'vehicles']: items
        }
        setResponseData(updateData);
    }
    const handleUpdate = () => {

    }
    const handleDelete = async () => {
        setIsLoading(true);
        const endpoint = "phone_number" in currentItem ? "drivers/" : "vehicles/";
        try {
            await axios.delete(`${API}${endpoint}${currentItem.id}/`)
            const items = "phone_number" in currentItem ? responseData.drivers : responseData.vehicles;
            const filteredItems = items?.filter(item => item.id !== currentItem.id)
            if ("phone_number" in currentItem) {
                setResponseData({
                    ...responseData,
                    drivers: filteredItems as DriverType[]
                })
            } else {
                setResponseData({
                    ...responseData,
                    vehicles: filteredItems as VehicleType[]
                })
            }
            router.replace("phone_number" in currentItem ? "/drivers" : "/fleet")
        } catch (error) {
            const errorMessage: string = handleAuthenticationErrors(error);
            Alert.alert("Error", errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>

            </ScrollView>
        </SafeAreaView>
    );
};


export default ItemDetails;
