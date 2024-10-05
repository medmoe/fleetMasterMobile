import React from 'react';
import {Text, View} from 'react-native';
import {CustomDatePicker, CustomPicker, ThemedButton, ThemedInputText} from "@/components";
import {VehicleFormProps} from "@/types/vehicle";
import {VehicleType} from "@/types/types";
import {ThemedInputTextProps} from "@/components/ThemedInputText";
import {fuelTypes, vehicleStatuses, vehicleTypes} from "@/constants/forms/vehicle";

const createFirstInputTextPropsBlock = (vehicleData: VehicleType, handleChange: (name: string, value: string) => void): ThemedInputTextProps[] =>
    [
        {placeholder: "Registration number", value: vehicleData.registration_number || "", onChange: handleChange, name: "registration_number"},
        {placeholder: "Make", value: vehicleData.make || "", onChange: handleChange, name: "make"},
        {placeholder: "Model", value: vehicleData.model || "", onChange: handleChange, name: "model"},
        {placeholder: "Year", value: vehicleData.year || "", onChange: handleChange, name: "year"},
        {placeholder: "Vin", value: vehicleData.vin || "", onChange: handleChange, name: "vin"},

    ]
const createSecondInputTextPropsBlock = (vehicleData: VehicleType, handleChange: (name: string, value: string) => void): ThemedInputTextProps[] =>
    [
        {placeholder: "Color", value: vehicleData.color || "", onChange: handleChange, name: "color"},
        {placeholder: "Mileage", value: vehicleData.mileage, onChange: handleChange, name: "mileage"},
        {placeholder: "Capacity", value: vehicleData.capacity, onChange: handleChange, name: "capacity"},
        {placeholder: "Insurance policy number", value: vehicleData.insurance_policy_number || "", onChange: handleChange, name: "insurance_policy_number"},
        {placeholder: "Notes", value: vehicleData.notes || "", onChange: handleChange, name: "notes"}

    ]

const VehicleForm = ({vehicleData, handleChange, handleDateChange, dates, submitForm, cancelSubmission}: VehicleFormProps) => {
    return (
        <View className={"w-full justify-center items-center"}>
            <View className={"w-[94%] bg-white rounded p-5"}>
                <View className={"gap-2"}>
                    <Text className={"font-semibold text-txt text-base"}>Vehicle Form</Text>
                    <Text className={"font-open-sans text-txt text-sm"}>Fill in vehicle's details below.</Text>
                </View>
                <View className={"mt-[25px]"}>
                    {createFirstInputTextPropsBlock(vehicleData, handleChange).map(({placeholder, value, onChange, name}, idx) => {
                        return <ThemedInputText placeholder={placeholder} value={value} onChange={onChange} name={name} containerStyles={"bg-background p-5"} key={idx}/>
                    })}
                    <CustomPicker name={"type"} value={vehicleData.type} items={vehicleTypes} handleChange={handleChange}/>
                    <CustomPicker name={"status"} value={vehicleData.status} items={vehicleStatuses} handleChange={handleChange}/>
                    <View className={"flex-row"}>
                        <CustomDatePicker date={dates.purchase_date} handleChange={handleDateChange} label={"Purchase date"} name={"purchase_date"}/>
                        <CustomDatePicker date={dates.last_service_date} handleChange={handleDateChange} label={"Last service date"} name={"last_service_date"}/>
                    </View>
                    <CustomDatePicker date={dates.next_service_due} handleChange={handleDateChange} label={"Next service due"} name={"next_service_due"}/>
                    <CustomPicker name={"fuel_type"} value={vehicleData.fuel_type || ""} items={fuelTypes} handleChange={handleChange}/>
                    <View className={"flex-row"}>
                        <CustomDatePicker date={dates.insurance_expiry_date} handleChange={handleDateChange} label={"Insurance expiry date"} name={"insurance_expiry_date"}/>
                        <CustomDatePicker date={dates.license_expiry_date} handleChange={handleDateChange} label={"License expiry date"} name={"license_expiry_date"}/>
                    </View>
                    {createSecondInputTextPropsBlock(vehicleData, handleChange).map(({placeholder, value, onChange, name}, idx) => {
                        return <ThemedInputText placeholder={placeholder} value={value} onChange={onChange} name={name} containerStyles={"bg-background p-5"} key={idx}/>
                    })}

                </View>
                <View className={"mt-3"}>
                    <ThemedButton title={"Submit"} handlePress={submitForm} containerStyles={"w-full bg-primary p-5 rounded-[50%]"} textStyles={"text-white font-semibold text-base"}/>
                    <ThemedButton title={"Cancel"} handlePress={cancelSubmission} containerStyles={"w-full bg-default p-5 rounded-[50%] mt-[10px]"} textStyles={"text-white font-semibold text-base"}/>
                </View>
            </View>
        </View>
    );
};
export default VehicleForm;
