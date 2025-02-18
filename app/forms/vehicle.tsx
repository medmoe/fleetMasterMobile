import React, {useState} from 'react';
import {Alert, SafeAreaView, ScrollView, View} from 'react-native';
import {Spinner} from "@/components";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {router} from "expo-router";
import axios from "axios";
import {API} from "@/constants/endpoints";
import {VehicleType} from "@/types/types";
import {useGlobalContext} from "@/context/GlobalProvider";
import {handleAuthenticationErrors} from "@/utils/authentication";
import {isPositiveInteger} from "@/utils/helpers";
import VehicleForm from "@/components/forms/VehicleForm";
import {VehicleDatesType} from "@/types/vehicle";


type VehicleKey = 'purchase_date' | 'last_service_date' | 'next_service_due' | 'insurance_expiry_date' | 'license_expiry_date';


const Vehicle = () => {
    const {responseData, setResponseData, vehicle, isPostRequest} = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const [vehicleData, setVehicleData] = useState<VehicleType>(vehicle as VehicleType);
    const [dates, setDates] = useState<VehicleDatesType>({
        purchase_date: new Date(),
        last_service_date: new Date(),
        next_service_due: new Date(),
        insurance_expiry_date: new Date(),
        license_expiry_date: new Date(),
    })
    const handleChange = (name: string, value: string) => {
        setVehicleData(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }
    const handleDateChange = (name: string) => (_: DateTimePickerEvent, date: Date | undefined): void => {
        if (date) {
            setDates(prevState => ({
                ...prevState,
                [name]: date,
            }))
        }
    }
    const submitForm = async () => {
        setIsLoading(true);
        // Validate year
        if (!isPositiveInteger(vehicleData.year)) {
            Alert.alert("Error", "Year must be a positive number!")
            setIsLoading(false);
            return;
        }
        // Validate mileage
        if (!isPositiveInteger(vehicleData.mileage)) {
            Alert.alert("Error", "Mileage must be a positive number!")
            setIsLoading(false)
            return;
        }
        // Validate capacity
        if (!isPositiveInteger(vehicleData.capacity)) {
            Alert.alert("Error", "Capacity must be a positive number!")
            setIsLoading(false);
            return;
        }

        let keys: VehicleKey[] = ["purchase_date", "last_service_date", "next_service_due", "insurance_expiry_date", "license_expiry_date"]
        for (let key of keys) {
            vehicleData[key] = dates[key].toLocaleDateString("en-CA", {year: "numeric", month: "2-digit", day: "2-digit"})
        }
        const url = isPostRequest ? `${API}vehicles/` : `${API}vehicles/${vehicleData.id}/`;
        const options = {headers: {"Content-Type": "application/json"}, withCredentials: true};
        try {
            const response = isPostRequest ? await axios.post(url, vehicleData, options) : await axios.put(url, vehicleData, options);
            if (isPostRequest) {
                setResponseData({
                    ...responseData,
                    vehicles: [...(responseData.vehicles || []), response.data]
                })
            } else {
                const filteredVehicles = responseData.vehicles?.filter((vehicle) => vehicle.id !== vehicle.id) || [];
                filteredVehicles.push(response.data);
                setResponseData({
                    ...responseData,
                    vehicles: filteredVehicles,
                })
            }
            router.replace("/fleet");
        } catch (error) {
            Alert.alert(handleAuthenticationErrors(error));
        } finally {
            setIsLoading(false);
        }
    }
    const cancelSubmission = () => {
        router.replace("/fleet");
    }
    return (
        <SafeAreaView>
            <ScrollView>
                {isLoading ? <View className={"w-full justify-center items-center h-full px-4"}><Spinner isVisible={isLoading}/></View> :
                    <VehicleForm vehicleData={vehicleData}
                                 handleChange={handleChange}
                                 handleDateChange={handleDateChange}
                                 submitForm={submitForm}
                                 cancelSubmission={cancelSubmission}
                                 dates={dates}
                    />
                }
            </ScrollView>
        </SafeAreaView>
    );
};
export default Vehicle;
