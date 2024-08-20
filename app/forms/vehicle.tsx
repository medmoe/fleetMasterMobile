import React, {useState} from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {ThemedButton, ThemedInputText} from "@/components";
import {Picker} from "@react-native-picker/picker";
import {icons} from "@/constants/icons";
import DateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {router} from "expo-router";

export interface VehicleType {
    registration_number?: string
    make?: string
    model?: string
    year?: string
    vin?: string
    color?: string
    type: string
    status: string
    mileage?: string
    fuel_type?: string
    capacity?: string
    insurance_policy_number?: string
    notes?: string
}

interface DatesType {
    purchase_date: Date
    last_service_date: Date
    next_service_due: Date
    insurance_expiry_date: Date
    license_expiry_date: Date
}

const vehicleTypes = {
    "car": "CAR",
    "truck": "TRUCK",
    "motorcycle": "MOTORCYCLE",
    "van": "VAN",
}
const statuses = {
    "active": "ACTIVE",
    "in maintenance": "IN_MAINTENANCE",
    "out of service": "OUT_OF_SERVICE",
}

const fuelTypes = {
    "regular": "REGULAR",
    "diesel": "DIESEL",
    "electricity": "ELECTRICITY",
}

const Vehicle = () => {
    const [vehicleData, setVehicleData] = useState<VehicleType>({
        type: "TRUCK",
        status: "ACTIVE",

    })
    const [dates, setDates] = useState<DatesType>({
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

    }

    const cancelSubmission = () => {
        router.replace("/fleet");
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View className={"w-full justify-center items-center"}>
                    <View className={"w-[94%] bg-white rounded p-5"}>
                        <View className={"gap-2"}>
                            <Text className={"font-semibold text-txt text-base"}>Vehicle Form</Text>
                            <Text className={"font-open-sans text-txt text-sm"}>Fill in vehicle's details below.</Text>
                        </View>
                        <View className={"mt-[25px]"}>
                            <ThemedInputText containerStyles={"bg-background p-5"}
                                             placeholder={"Registration number"}
                                             value={vehicleData.registration_number || ""}
                                             onChange={handleChange}
                                             name={"registration_number"}
                            />
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"}
                                             placeholder={"Make"}
                                             value={vehicleData.make || ""}
                                             onChange={handleChange}
                                             name={"make"}
                            />
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"}
                                             placeholder={"Model"}
                                             value={vehicleData.model || ""}
                                             onChange={handleChange}
                                             name={"model"}
                            />
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"}
                                             placeholder={"Year"}
                                             value={vehicleData.year || ""}
                                             onChange={handleChange}
                                             name={"year"}
                            />
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"}
                                             placeholder={"vin"}
                                             value={vehicleData.vin || ""}
                                             onChange={handleChange}
                                             name={"vin"}
                            />
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"}
                                             placeholder={"Color"}
                                             value={vehicleData.color || ""}
                                             onChange={handleChange}
                                             name={"color"}
                            />
                            <Picker onValueChange={(value) => handleChange("type", value)} selectedValue={vehicleData.type}>
                                {Object.entries(vehicleTypes).map(([name, value], idx) => {
                                    return (
                                        <Picker.Item label={name} value={value} key={idx}/>
                                    )
                                })}
                            </Picker>
                            <Picker onValueChange={(value) => handleChange("status", value)} selectedValue={vehicleData.status}>
                                {Object.entries(statuses).map(([name, value], idx) => {
                                    return (
                                        <Picker.Item label={name} value={value} key={idx}/>
                                    )
                                })}
                            </Picker>
                            <View className={"flex-row"}>
                                <View className={"justify-center p-4"}>
                                    <Text className={"text-txt font-open-sans text-sm"}>Purchase date</Text>
                                    <View className={"mt-3 justify-start items-center flex-row"}>
                                        <Image source={icons.calendar} resizeMode={"contain"} className={"w-[25px] h-[25px] mr-[5px]"}/>
                                        <DateTimePicker value={dates.purchase_date} mode={"date"} onChange={handleDateChange("purchase_date")}/>
                                    </View>
                                </View>
                                <View className={"justify-center p-4"}>
                                    <Text className={"text-txt font-open-sans items-center flex-row"}>Last service date</Text>
                                    <View className={"mt-3 justify-start items-center flex-row"}>
                                        <Image source={icons.calendar} resizeMode={"contain"} className={"w-[25px] h-[25px] mr-[5px]"}/>
                                        <DateTimePicker value={dates.last_service_date} mode={"date"}
                                                        onChange={handleDateChange("last_service_date")}/>
                                    </View>
                                </View>
                            </View>
                            <View className={"justify-center p-4"}>
                                <Text className={"text-txt font-open-sans items-center flex-row"}>Next service due</Text>
                                <View className={"mt-3 justify-start items-center flex-row"}>
                                    <Image source={icons.calendar} resizeMode={"contain"} className={"w-[25px] h-[25px] mr-[5px]"}/>
                                    <DateTimePicker value={dates.next_service_due} mode={"date"} onChange={handleDateChange("next_service_due")}/>
                                </View>
                            </View>
                            <ThemedInputText containerStyles={"bg-background p-5"}
                                             placeholder={"Mileage"}
                                             value={vehicleData.mileage || ""}
                                             onChange={handleChange}
                                             name={"mileage"}
                            />
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"}
                                             placeholder={"Capacity"}
                                             value={vehicleData.capacity || ""}
                                             onChange={handleChange}
                                             name={"capacity"}
                            />
                            <Picker onValueChange={(value) => handleChange("fuel_type", value)} selectedValue={vehicleData.fuel_type} >
                                {Object.entries(fuelTypes).map(([name, value], idx) => {
                                    return (
                                        <Picker.Item label={name} value={value} key={idx} />
                                    )
                                })}
                            </Picker>
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"}
                                             placeholder={"Insurance policy number"}
                                             value={vehicleData.insurance_policy_number || ""}
                                             onChange={handleChange}
                                             name={"insurance_policy_number"}
                            />
                            <View className={"flex-row"}>
                                <View className={"justify-center p-4"}>
                                    <Text className={"text-txt font-open-sans items-center flex-row"}>Insurance expiry date</Text>
                                    <View className={"mt-3 justify-start items-center flex-row"}>
                                        <Image source={icons.calendar} resizeMode={"contain"} className={"w-[25px] h-[25px] mr-[5px]"}/>
                                        <DateTimePicker value={dates.insurance_expiry_date} mode={"date"} onChange={handleDateChange("next_service_due")}/>
                                    </View>
                                </View>
                                <View className={"justify-center p-4"}>
                                    <Text className={"text-txt font-open-sans items-center flex-row"}>License expiry date</Text>
                                    <View className={"mt-3 justify-start items-center flex-row"}>
                                        <Image source={icons.calendar} resizeMode={"contain"} className={"w-[25px] h-[25px] mr-[5px]"}/>
                                        <DateTimePicker value={dates.license_expiry_date} mode={"date"} onChange={handleDateChange("license_expiry_date")}/>
                                    </View>
                                </View>
                            </View>
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3 mb-3"}
                                             placeholder={"Notes"}
                                             value={vehicleData.notes || ""}
                                             onChange={handleChange}
                                             name={"notes"}
                            />
                        </View>
                        <ThemedButton title={"Submit"}
                                      handlePress={submitForm}
                                      containerStyles={"w-full bg-primary p-5 rounded-[50%]"}
                                      textStyles={"text-white font-semibold text-base"}
                        />
                        <ThemedButton title={"Cancel"}
                                      handlePress={cancelSubmission}
                                      containerStyles={"w-full bg-error p-5 rounded-[50%] mt-[10px]"}
                                      textStyles={"text-white font-semibold text-base"}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default Vehicle;