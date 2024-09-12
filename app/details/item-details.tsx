import React, {useState} from 'react';
import {Alert, SafeAreaView, ScrollView} from 'react-native';
import {useGlobalContext} from "@/context/GlobalProvider";
import {DriverType, ResponseDataType, VehicleType} from "@/types/types";
import {getVehicleName} from "@/utils/helpers";
import {API} from "@/constants/endpoints";
import axios from "axios";
import {router} from "expo-router";
import {handleAuthenticationErrors} from "@/utils/authentication";
import {ItemDetailViewer, Spinner} from "@/components";

const getItemDetails = (itemData: DriverType | VehicleType, vehicles?: VehicleType[]): { label: string, value: string }[] => {
    return Object.entries(itemData).map(([label, value]) => {
        label = label.charAt(0).toUpperCase() + label.slice(1).replace(/_/g, " ");
        if (isDriver(itemData) && label === "Vehicle") {
            value = getVehicleName(vehicles, itemData as DriverType);
        } else {
            value = (typeof value === 'string') ? value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, " ").toLowerCase() : value
        }
        return {label, value}
    })
}
const updateResponseData = (setResponseData: (data: ResponseDataType) => void, responseData: ResponseDataType, currentItem: DriverType | VehicleType, items?: (DriverType | VehicleType)[]) => {
    const updateData = {
        ...responseData,
        [isDriver(currentItem) ? 'drivers' : 'vehicles']: items
    }
    setResponseData(updateData);
}
const isDriver = (item: DriverType | VehicleType): boolean => "phone_number" in item;


const ItemDetails = () => {
    const {currentItem, responseData, setResponseData, setIsPostRequest} = useGlobalContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const details = getItemDetails(currentItem, responseData.vehicles);
    const title = isDriver(currentItem) ? "Driver's Detail" : "Vehicle's Detail";
    const subtitle = `Here are the details of the current ${isDriver(currentItem) ? "driver" : "vehicle"}`;
    const endpoint = isDriver(currentItem) ? "drivers/" : "vehicles/";

    const handleUpdate = () => {
        setIsPostRequest(false);
        router.replace(isDriver(currentItem) ? "/forms/driver" : "/forms/vehicle")
    }
    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await axios.delete(`${API}${endpoint}${currentItem.id}/`)
            const itemKey = isDriver(currentItem) ? "drivers" : "vehicles";
            const items = responseData[itemKey]
            const filteredItems = items?.filter(item => item.id !== currentItem.id)
            updateResponseData(setResponseData, responseData, currentItem, filteredItems);
            router.replace(isDriver(currentItem) ? "/drivers" : "/fleet")
        } catch (error) {
            const errorMessage: string = handleAuthenticationErrors(error);
            Alert.alert("Error", errorMessage);
        } finally {
            setIsLoading(false);
        }
    }
    const handleCancel = () => {
        router.replace(isDriver(currentItem) ? "/drivers" : "/fleet");
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {isLoading ? <Spinner isVisible={isLoading}/> :
                    <ItemDetailViewer title={title}
                                      subtitle={subtitle}
                                      details={details}
                                      handleUpdate={handleUpdate}
                                      handleDelete={handleDelete}
                                      handleCancel={handleCancel}
                    />}
            </ScrollView>
        </SafeAreaView>
    );
};


export default ItemDetails;
