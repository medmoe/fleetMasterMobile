import React, {useState} from 'react';
import {Alert, SafeAreaView, ScrollView, View} from 'react-native';
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {router} from "expo-router";
import {API} from "@/constants/endpoints";
import axios from "axios";
import {DriverType, PickerItemType} from "@/types/types";
import {useGlobalContext} from "@/context/GlobalProvider";
import {handleGeneralErrors} from "@/utils/authentication";
import {driverStatus} from "@/constants/constants";
import {DriverForm, Spinner} from "@/components";
import {isPositiveInteger} from "@/utils/helpers";
import {DatesType, PickerType} from "@/components/forms/DriverForm";


const Driver = () => {
    const {responseData, setResponseData} = useGlobalContext();
    const vehicles: PickerItemType[] = responseData.vehicles ? responseData.vehicles.map((vehicle) => {
        return {
            label: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
            value: `${vehicle.id}`,
        }
    }) : []
    const [isLoading, setIsLoading] = useState(false);
    const [driverData, setDriverData] = useState<DriverType>({
        first_name: "",
        last_name: "",
        phone_number: "",
        employment_status: driverStatus.active,
        vehicle: vehicles[0].value,
    })
    const [dates, setDates] = useState<DatesType>({
        date_of_birth: new Date(),
        license_expiry_date: new Date(),
        hire_date: new Date(),
    })
    const [pickers, setPickers] = useState<PickerType>({
        country: "Algeria",
        status: "ACTIVE",
        vehicle: vehicles[0].value,
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
    const handlePickerChange = (value: number | null | string, name: string): void => {
        setPickers(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const submitForm = async () => {
        setIsLoading(true);
        if (!validateFormInput()) {
            setIsLoading(false);
            return;
        }
        populateDriverData();
        try {
            const response = await axios.post(
                `${API}drivers/`,
                driverData,
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                });
            setResponseData({
                ...responseData,
                drivers: responseData.drivers ? [...responseData.drivers, response.data] : [response.data]
            })
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
        if (!driverData.license_number) {
            Alert.alert("Error", "License number is required")
            return false
        }
        if (!isPositiveInteger(pickers.vehicle)) {
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
            country: pickers.country,
            employment_status: pickers.status,
            vehicle: pickers.vehicle,
        }))
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {isLoading ? <View className={"w-full justify-center items-center h-full px-4"}><Spinner isVisible={isLoading}/></View> :
                    <DriverForm handleChange={handleChange}
                                driverData={driverData}
                                handleDateChange={handleDateChange}
                                handlePickerChange={handlePickerChange}
                                submitForm={submitForm}
                                cancelSubmission={cancelSubmission}
                                dates={dates}
                                pickers={pickers}
                                vehicles={vehicles}
                    />}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Driver;
