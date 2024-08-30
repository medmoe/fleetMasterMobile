import React, {useState} from 'react';
import {Alert, Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import ThemedInputText from "@/components/ThemedInputText";
import {icons} from "@/constants/icons";
import DateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {Picker} from "@react-native-picker/picker";
import countries from "@/constants/countries.json";
import ThemedButton from "@/components/ThemedButton";
import {router} from "expo-router";
import {API} from "@/constants/endpoints";
import axios from "axios";
import {DriverType} from "@/types/types";
import {useGlobalContext} from "@/context/GlobalProvider";
import {handleAuthenticationErrors, handleGeneralErrors} from "@/utils/authentication";
import {driverStatus} from "@/constants/constants";
import {Spinner} from "@/components";
import {isPositiveInteger} from "@/utils/helpers";


interface DatesType {
    date_of_birth: Date
    license_expiry_date: Date
    hire_date: Date
}

interface PickerType {
    country: string
    status: string
    vehicle: string
}

const Driver = () => {
    const {responseData, setResponseData} = useGlobalContext();
    const vehicles: [string, string][] = responseData.vehicles ? responseData.vehicles.map((vehicle) => {
        return [vehicle.id || " ", `${vehicle.make} ${vehicle.model} ${vehicle.year}`]
    }) : []
    const [isLoading, setIsLoading] = useState(false);
    const [driverData, setDriverData] = useState<DriverType>({
        first_name: "",
        last_name: "",
        phone_number: "",
        employment_status: driverStatus.active,
        vehicle: vehicles[0][0],
    })
    const [dates, setDates] = useState<DatesType>({
        date_of_birth: new Date(),
        license_expiry_date: new Date(),
        hire_date: new Date(),
    })
    const [pickers, setPickers] = useState<PickerType>({
        country: "Algeria",
        status: "ACTIVE",
        vehicle: vehicles[0][0],
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
        if(!validateFormInput()){
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

    const validateFormInput =  () => {
        const requiredFields: [string, string][] = [
            [driverData.first_name, "First name is required"],
            [driverData.last_name, "Last name is required"],
            [driverData.phone_number, "Phone number is required"],
        ]
        for (const [value, error] of requiredFields) {
            if(!value) {
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
                    <View className={"w-full justify-center items-center"}>
                        <View className={"w-[94%] bg-white rounded p-5"}>
                            <View className={"gap-2"}>
                                <Text className={"font-semibold text-txt text-base"}>Driver Form</Text>
                                <Text className={"font-open-sans text-txt text-sm"}>Fill in driver's details below.</Text>
                            </View>
                            <View className={"mt-[25px]"}>
                                <ThemedInputText containerStyles={"bg-background p-5"} placeholder={"First name"} value={driverData.first_name}
                                                 onChange={handleChange}
                                                 name={"first_name"}/>
                                <ThemedInputText containerStyles={"bg-background p-5"} placeholder={"Last name"} value={driverData.last_name}
                                                 onChange={handleChange}
                                                 name={"last_name"}/>
                                <ThemedInputText containerStyles={"bg-background p-5"} placeholder={"Email"} value={driverData.email || ""}
                                                 onChange={handleChange}
                                                 name={"email"} icon={icons.mail}/>
                                <ThemedInputText containerStyles={"bg-background p-5"} placeholder={"Phone number"}
                                                 value={driverData.phone_number}
                                                 onChange={handleChange}
                                                 name={"phone_number"} icon={icons.phone}/>
                                <ThemedInputText containerStyles={"bg-background p-5"} placeholder={"License number"}
                                                 value={driverData.license_number || ""}
                                                 onChange={handleChange} name={"license_number"}/>
                                <View className={"flex-row"}>
                                    <View className={"justify-center p-4"}>
                                        <Text className={"text-txt font-open-sans text-sm"}>Licence expiry date</Text>
                                        <View className={"mt-3 justify-start items-center flex-row"}>
                                            <Image source={icons.calendar} resizeMode={"contain"} className={"w-[25px] h-[25px] mr-[5px]"}/>
                                            <DateTimePicker value={dates.date_of_birth} mode={"date"} display={"default"}
                                                            onChange={handleDateChange("date_of_birth")}/>
                                        </View>
                                    </View>
                                    <View className={"justify-center p-4"}>
                                        <Text className={"text-txt font-open-sans text-sm"}>Date of birth</Text>
                                        <View className={"mt-3 justify-start items-center flex-row"}>
                                            <Image source={icons.calendar} resizeMode={"contain"} className={"w-[25px] h-[25px] mr-[5px]"}/>
                                            <DateTimePicker value={dates.license_expiry_date} mode={"date"} display={"default"}
                                                            onChange={handleDateChange("license_expiry_date")}/>
                                        </View>
                                    </View>
                                </View>
                                <ThemedInputText containerStyles={"bg-background p-5"} placeholder={"Address"} value={driverData.address || ""}
                                                 onChange={handleChange}
                                                 name={"address"}/>
                                <ThemedInputText containerStyles={"bg-background p-5"} placeholder={'city'} value={driverData.city || ""}
                                                 onChange={handleChange}
                                                 name={"city"}/>
                                <ThemedInputText containerStyles={"bg-background p-5"} placeholder={'state'} value={driverData.state || ""}
                                                 onChange={handleChange}
                                                 name={'state'}/>
                                <ThemedInputText containerStyles={"bg-background p-5"} placeholder={"zip code"} value={driverData.zip_code || ""}
                                                 onChange={handleChange}
                                                 name={"zip_code"}/>
                                <Picker onValueChange={(value) => handlePickerChange(value, "country")} selectedValue={pickers.country}>
                                    {countries.map((item, idx) => {
                                        return (
                                            <Picker.Item label={`${item.name} ${item.emoji}`} value={item.name} key={idx}/>
                                        )
                                    })}
                                </Picker>
                                <View className={"justify-center p-4"}>
                                    <Text className={"text-txt font-open-sans text-sm"}>Hire date</Text>
                                    <View className={"mt-3 justify-start items-center flex-row"}>
                                        <Image source={icons.calendar} resizeMode={"contain"} className={"w-[25px] h-[25px] mr-[5px]"}/>
                                        <DateTimePicker value={dates.hire_date}
                                                        mode={"date"}
                                                        display={"default"}
                                                        onChange={handleDateChange("hire_date")}/>
                                    </View>
                                </View>
                                <Picker onValueChange={(value) => handlePickerChange(value, "status")} selectedValue={pickers.status}>
                                    <Picker.Item label={"Active"} value={driverStatus.active}/>
                                    <Picker.Item label={"Inactive"} value={driverStatus.inactive}/>
                                    <Picker.Item label={"On Leave"} value={driverStatus.on_leave}/>
                                </Picker>
                                <ThemedInputText containerStyles={"bg-background p-5"} placeholder={"Emergency contact name"}
                                                 value={driverData.emergency_contact_name || ""}
                                                 onChange={handleChange}
                                                 name={"emergency_contact_name"}/>
                                <ThemedInputText containerStyles={"bg-background p-5"} placeholder={"Emergency contact phone"}
                                                 value={driverData.emergency_contact_phone || ""}
                                                 onChange={handleChange}
                                                 name={"emergency_contact_phone"}/>
                                <ThemedInputText containerStyles={"bg-background p-5"} placeholder={"Notes"} value={driverData.notes || ""}
                                                 onChange={handleChange}
                                                 name={"notes"}/>
                                <Picker onValueChange={(value) => handlePickerChange(value , "vehicle")}
                                        selectedValue={pickers.vehicle}>
                                    {vehicles.map(([id, name], idx) => {
                                        return (
                                            <Picker.Item label={name} value={id} key={idx}/>
                                        )
                                    })}
                                </Picker>

                            </View>

                            <ThemedButton title={"Submit"} handlePress={submitForm} containerStyles="w-full bg-primary p-5 rounded-[50%]"
                                          textStyles={"text-white font-semibold text-base"}/>
                            <ThemedButton title={"Cancel"} handlePress={cancelSubmission}
                                          containerStyles="w-full bg-error p-5 rounded-[50%] mt-[10px]"
                                          textStyles={"text-white font-semibold text-base"}/>


                        </View>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Driver;
