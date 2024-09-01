import React from 'react';
import {Text, View} from 'react-native';
import ThemedInputText, {ThemedInputTextProps} from "@/components/ThemedInputText";
import {icons} from "@/constants/icons";
import ThemedButton from "@/components/ThemedButton";
import {DriverType} from "@/types/types";
import {CustomDatePicker, CustomPicker} from "@/components";
import {DriverFormProps} from "@/types/driver";
import {countriesLst, driverStatuses} from "@/constants/forms/driver";


const createFirstInputTextPropsBlock = (driverData: DriverType, handleChange: (name: string, value: string) => void): ThemedInputTextProps[] =>
    [
        {placeholder: "First name", value: driverData.first_name, onChange: handleChange, name: "first_name"},
        {placeholder: "Last name", value: driverData.last_name, onChange: handleChange, name: "last_name"},
        {placeholder: "Email", value: driverData.email || "", onChange: handleChange, name: "email", icon: icons.mail},
        {placeholder: "Phone number", value: driverData.phone_number, onChange: handleChange, name: "phone_number", icon: icons.phone},
        {placeholder: "License number", value: driverData.license_number || "", onChange: handleChange, name: "license_number"}
    ]
const createSecondInputTextPropsBlock = (driverData: DriverType, handleChange: (name: string, value: string) => void): ThemedInputTextProps[] =>
    [
        {placeholder: "Address", value: driverData.address || "", onChange: handleChange, name: "address"},
        {placeholder: "City", value: driverData.city || "", onChange: handleChange, name: "city"},
        {placeholder: "State", value: driverData.state || "", onChange: handleChange, name: "state"},
        {placeholder: "Zip code", value: driverData.zip_code || "", onChange: handleChange, name: "zip_code"}
    ]
const createThirdInputTextPropsBlock = (driverData: DriverType, handleChange: (name: string, value: string) => void): ThemedInputTextProps[] =>
    [
        {placeholder: "Emergency contact name", value: driverData.emergency_contact_name || "", onChange: handleChange, name: "emergency_contact_name"},
        {placeholder: "Emergency contact phone", value: driverData.emergency_contact_phone || "", onChange: handleChange, name: "emergency_contact_phone"},
        {placeholder: "Notes", value: driverData.notes || "", onChange: handleChange, name: "notes"}
    ]
const DriverForm = ({handleChange, driverData, handleDateChange, dates, pickers, vehicles, submitForm, cancelSubmission}: DriverFormProps) => {
    return (
        <View className={"w-full justify-center items-center"}>
            <View className={"w-[94%] bg-white rounded p-5"}>
                <View className={"gap-2"}>
                    <Text className={"font-semibold text-txt text-base"}>Driver Form</Text>
                    <Text className={"font-open-sans text-txt text-sm"}>Fill in driver's details below.</Text>
                </View>
                <View className={"mt-[25px]"}>
                    {createFirstInputTextPropsBlock(driverData, handleChange).map(({placeholder, value, onChange, name, icon}, idx) => {
                        return <ThemedInputText placeholder={placeholder} value={value} onChange={onChange} name={name} icon={icon} key={idx} containerStyles={"bg-background p-5"}/>
                    })}
                    <View className={"flex-row"}>
                        <CustomDatePicker date={dates.date_of_birth} handleChange={handleDateChange} label={"Date of birth"} name={"date_of_birth"}/>
                        <CustomDatePicker date={dates.license_expiry_date} handleChange={handleDateChange} label={"License expiry date"} name={"license_expiry_date"}/>
                    </View>
                    {createSecondInputTextPropsBlock(driverData, handleChange).map(({placeholder, value, onChange, name}, idx) => {
                        return <ThemedInputText placeholder={placeholder} value={value} onChange={onChange} name={name} key={idx} containerStyles={"bg-background p-5"}/>
                    })}
                    <CustomPicker name={"country"} value={pickers.country} items={countriesLst} handleChange={handleChange}/>
                    <CustomDatePicker date={dates.hire_date} handleChange={handleDateChange} label={"Hire date"} name={"hire_date"}/>
                    <CustomPicker name={"status"} value={pickers.status} items={driverStatuses} handleChange={handleChange}/>
                    {createThirdInputTextPropsBlock(driverData, handleChange).map(({placeholder, value, onChange, name}, idx) => {
                        return <ThemedInputText placeholder={placeholder} value={value} onChange={onChange} name={name} key={idx} containerStyles={"bg-background p-5"}/>
                    })}
                    <CustomPicker name={"vehicle"} value={pickers.vehicle} items={vehicles} handleChange={handleChange}/>
                </View>
                <ThemedButton title={"Submit"} handlePress={submitForm} containerStyles="w-full bg-primary p-5 rounded-[50%]" textStyles={"text-white font-semibold text-base"}/>
                <ThemedButton title={"Cancel"} handlePress={cancelSubmission} containerStyles="w-full bg-error p-5 rounded-[50%] mt-[10px]" textStyles={"text-white font-semibold text-base"}/>
            </View>
        </View>
    );
};

export default DriverForm;

