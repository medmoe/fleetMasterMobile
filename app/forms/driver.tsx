import React, {useState} from 'react';
import {Alert, SafeAreaView, ScrollView, View} from 'react-native';
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {router} from "expo-router";
import {API} from "@/constants/endpoints";
import axios from "axios";
import {DriverType, PickerItemType} from "@/types/types";
import {useGlobalContext} from "@/context/GlobalProvider";
import {handleGeneralErrors} from "@/utils/authentication";
import {DriverForm, Spinner} from "@/components";
import {isPositiveInteger} from "@/utils/helpers";
import {DriverDatesType} from "@/types/driver";


const Driver = () => {
    const {responseData, setResponseData, currentItem, isPostRequest} = useGlobalContext();
    const vehicles: PickerItemType[] = responseData.vehicles ? responseData.vehicles.map((vehicle) => {
        return {
            label: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
            value: `${vehicle.id}`,
        }
    }) : []
    const [isLoading, setIsLoading] = useState(false);
    const [driverData, setDriverData] = useState<DriverType>(currentItem as DriverType)
    const [dates, setDates] = useState<DriverDatesType>({
        date_of_birth: new Date(),
        license_expiry_date: new Date(),
        hire_date: new Date(),
    })
    const handleChange = (name: string, value: string) => {
        setDriverData(prevState => ({
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
        populateDriverData();
        if (!validateFormInput()) {
            setIsLoading(false);
            return;
        }
        try {
            const response = isPostRequest ? await axios.post(`${API}drivers/`, driverData, {headers: {'Content-Type': 'application/json'}, withCredentials: true}) :
                await axios.put(`${API}drivers/${currentItem.id}/`, driverData, {headers: {"Content-Type": "application/json"}, withCredentials: true});
            updateResponseData(response, isPostRequest);
            router.replace("/drivers");
        } catch (error: any) {
            const errorMessage = handleGeneralErrors(error);
            Alert.alert("Error", errorMessage);
        } finally {
            setIsLoading(false);
        }
    }
    const cancelSubmission = () => {
        router.replace("/drivers");
    }

    const validateFormInput = () => {
        const requiredFields: [string | Date, string][] = [
            [driverData.first_name, "First name is required"],
            [driverData.last_name, "Last name is required"],
            [driverData.phone_number, "Phone number is required"],
            [driverData.license_number || "", "License number is required"],
            [dates.license_expiry_date, "License expiry date is required"],
            [dates.date_of_birth, "Date of birth is required"],
            [dates.hire_date, "Hire date is required"]
        ]
        for (const [value, error] of requiredFields) {
            if (!value) {
                Alert.alert("Error", error);
                return false
            }
        }
        if (!isPositiveInteger(driverData.vehicle || "")) {
            Alert.alert("Error", "You must assign a truck to the driver.")
            return false;
        }
        return true;
    }

    const populateDriverData = () => {
        setDriverData(prevState => ({
            ...prevState,
            license_expiry_date: dates.license_expiry_date.toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}),
            date_of_birth: dates.date_of_birth.toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}),
            hire_date: dates.hire_date.toLocaleDateString('en-CA', {year: 'numeric', month: '2-digit', day: '2-digit'}),
        }))
    }

    const updateResponseData = (response: any, isPostRequest: boolean): void => {
        let drivers;
        if (isPostRequest) {
            drivers = responseData.drivers ? [...responseData.drivers, response.data] : [response.data]
        } else {
            drivers = responseData.drivers?.filter((driver) => driver.id != currentItem.id) || []
            drivers.push(response.data)
        }
        setResponseData({...responseData, drivers: drivers})
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {isLoading ? <View className={"w-full justify-center items-center h-full px-4"}><Spinner isVisible={isLoading}/></View> :
                    <DriverForm handleChange={handleChange}
                                driverData={driverData}
                                handleDateChange={handleDateChange}
                                submitForm={submitForm}
                                cancelSubmission={cancelSubmission}
                                dates={dates}
                                vehicles={vehicles}
                    />}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Driver;
