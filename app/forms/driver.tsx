import React, {useState} from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import ThemedInputText from "@/components/ThemedInputText";
import {icons} from "@/constants/icons";
import DateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {Picker} from "@react-native-picker/picker";
import countries from "@/constants/countries.json";
import ThemedButton from "@/components/ThemedButton";
import {router} from "expo-router";

interface DriverType {
    first_name: string
    last_name: string
    email: string
    phone_number: string
    licence_number: string
    licence_expiry_date: string
    date_of_birth: string
    address: string
    city: string
    state: string
    zip_code: string
    country: string
    hire_date: string
    employment_status: string
}

interface DatesType {
    dateOfBirth: Date
    licenceExpiry: Date
    hire: Date
}

const Driver = () => {
    const [driverData, setDriverData] = useState<DriverType>({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        licence_number: "",
        licence_expiry_date: "",
        date_of_birth: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        hire_date: "",
        employment_status: "",
    })
    const [dates, setDates] = useState<DatesType>({
        dateOfBirth: new Date(),
        licenceExpiry: new Date(),
        hire: new Date(),
    })
    const [country, setCountry] = useState<string>("Algeria")
    const [status, setStatus] = useState<string>("Active");
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
    const handleCountryChange = (value: string, _: number): void => {
        setCountry(value);
    }
    const handleStatusChange = (value: string, _: number): void => {
        setStatus(value);
    }
    const submitForm = () => {

    }
    const cancelSubmission = () => {
        router.replace("/drivers");
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View className={"w-full justify-center items-center"}>
                    <View className={"w-[94%] bg-white rounded p-5"}>
                        <View className={"gap-2"}>
                            <Text className={"font-semibold text-txt text-base"}>Driver Form</Text>
                            <Text className={"font-open-sans text-txt text-sm"}>Fill in driver's details below.</Text>
                        </View>
                        <View className={"mt-[25px]"}>
                            <ThemedInputText containerStyles={"bg-background p-5"} placeholder={"First name"} value={driverData.first_name}
                                             onChange={handleChange}
                                             name={"firstName"}/>
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"} placeholder={"Last name"} value={driverData.last_name}
                                             onChange={handleChange}
                                             name={"lastName"}/>
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"} placeholder={"Email"} value={driverData.email}
                                             onChange={handleChange}
                                             name={"email"} icon={icons.mail}/>
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"} placeholder={"Phone number"} value={driverData.phone_number}
                                             onChange={handleChange}
                                             name={"phoneNumber"} icon={icons.phone}/>
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"} placeholder={"Licence number"}
                                             value={driverData.licence_number}
                                             onChange={handleChange} name={"licenceNumber"}/>
                            <View className={"flex-row"}>
                                <View className={"justify-center p-4"}>
                                    <Text className={"text-txt font-open-sans text-sm"}>Licence expiry date</Text>
                                    <View className={"mt-3 justify-start items-center flex-row"}>
                                        <Image source={icons.calendar} resizeMode={"contain"} className={"w-[25px] h-[25px] mr-[5px]"}/>
                                        <DateTimePicker value={dates.dateOfBirth} mode={"date"} display={"default"}
                                                        onChange={handleDateChange("dateOfBirth")}/>
                                    </View>
                                </View>
                                <View className={"justify-center p-4"}>
                                    <Text className={"text-txt font-open-sans text-sm"}>Date of birth</Text>
                                    <View className={"mt-3 justify-start items-center flex-row"}>
                                        <Image source={icons.calendar} resizeMode={"contain"} className={"w-[25px] h-[25px] mr-[5px]"}/>
                                        <DateTimePicker value={dates.licenceExpiry} mode={"date"} display={"default"}
                                                        onChange={handleDateChange("licenceExpiry")}/>
                                    </View>
                                </View>
                            </View>
                            <ThemedInputText containerStyles={"bg-background p-5"} placeholder={"Address"} value={driverData.address}
                                             onChange={handleChange}
                                             name={"address"}/>
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"} placeholder={'city'} value={driverData.city}
                                             onChange={handleChange}
                                             name={"city"}/>
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"} placeholder={'state'} value={driverData.state}
                                             onChange={handleChange}
                                             name={'state'}/>
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"} placeholder={"zip code"} value={driverData.zip_code}
                                             onChange={handleChange}
                                             name={"zipcode"}/>
                            <Picker onValueChange={handleCountryChange} selectedValue={country}>
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
                                    <DateTimePicker value={dates.hire} mode={"date"} display={"default"} onChange={handleDateChange("hire")}/>
                                </View>
                            </View>
                            <Picker onValueChange={handleStatusChange} selectedValue={status}>
                                <Picker.Item label={"Active"} value={"active"}/>
                                <Picker.Item label={"Inactive"} value={"inactive"}/>
                                <Picker.Item label={"On Leave"} value={"onleave"}/>
                            </Picker>


                        </View>

                        <ThemedButton title={"Submit"} handlePress={submitForm} containerStyles="w-full bg-primary p-5 rounded-[50%]"
                                      textStyles={"text-white font-semibold text-base"}/>
                        <ThemedButton title={"Cancel"} handlePress={cancelSubmission} containerStyles="w-full bg-error p-5 rounded-[50%] mt-[10px]"
                                      textStyles={"text-white font-semibold text-base"}/>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Driver;
