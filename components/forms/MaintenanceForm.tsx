import React from 'react';
import {Text, View} from 'react-native';
import CustomPicker from "@/components/CustomPicker";
import ThemedButton from "@/components/ThemedButton";
import AutoPartInput from "@/components/AutoPartInput";
import Divider from "@/components/Divider";
import CustomDatePicker from "@/components/CustomDatePicker";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import ThemedInputText from "@/components/ThemedInputText";
import MaintenancePicker from "@/components/MaintenancePicker";


interface MaintenanceFormProps {
    parts: { id: string, name: string }[]
    handlePartInputChange: (name: string, value: string) => void
    inputValue: { id: string, name: string }
    selectPart: (name: string, value: string) => void
    setIsPartSelected: (value: boolean) => void
    isPartSelected: boolean
    handleDateChange: (name: string) => (_: DateTimePickerEvent, date: Date | undefined) => void
    handleStartDateChange: (name: string) => (_: DateTimePickerEvent, date: Date | undefined) => void
    handleEndDateChange: (name: string) => (_: DateTimePickerEvent, date: Date | undefined) => void
    handleCostChange: (name: string, value: string) => void
    cost: string
}


const MaintenanceForm = ({
                             cost,
                             parts,
                             selectPart,
                             handlePartInputChange,
                             inputValue,
                             setIsPartSelected,
                             isPartSelected,
                             handleDateChange,
                             handleCostChange,
                             handleEndDateChange,
                             handleStartDateChange
                         }: MaintenanceFormProps) => {
    const handleCreateProvider = () => {

    }
    const handleCreateServiceProvider = () => {

    }
    return (
        <View className={"w-full justify-center items-center"}>
            <View className={"w-[94%] bg-white rounded p-5"}>
                <View className={"gap-2"}>
                    <Text className={"font-semibold text-txt text-base"}>Maintenance Form</Text>
                    <Text className={"font-open-sans text-txt text-sm"}>Fill in vehicle's details below.</Text>
                </View>
                <Divider/>
                <View className={"flex-1"}>
                    <Text className={"font-semibold text-txt text-sm"}>Part Purchase Form</Text>
                    <MaintenancePicker containerStyles={"mb-3"}
                                       title={"Pick a provider"}
                                       name={"provider"} value={"value"}
                                       items={[{label: "one", value: "ONE"}, {label: "two", value: "TWO"}]}
                                       handleChange={() => console.log("provider picked")}
                                       buttonTitle={"Create Part Provider"}
                                       handleButtonPress={handleCreateProvider}
                    />
                    <AutoPartInput parts={parts}
                                   handlePartInputChange={handlePartInputChange}
                                   inputValue={inputValue}
                                   selectPart={selectPart}
                                   setIsPartSelected={setIsPartSelected}
                                   isPartSelected={isPartSelected}
                    />
                    <View className={"flex-row"}>
                        <CustomDatePicker date={new Date()}
                                          handleChange={handleDateChange}
                                          label={"Purchase Date"}
                                          name={"purchase_date"}
                        />
                        <ThemedInputText onChange={handleCostChange}
                                         containerStyles={"bg-background p-5"}
                                         placeholder={"Enter cost"}
                                         name={"cost"}
                                         value={cost}
                        />
                    </View>
                </View>
                <Divider/>
                <View>
                    <Text className={"font-semibold text-txt text-sm"}>Maintenance Report Form</Text>
                    <MaintenancePicker containerStyles={"mb-3"}
                                       title={"Pick service provider"}
                                       name={"service_provider"}
                                       value={"value"}
                                       items={[{label: "one", value: "ONE"}, {label: "two", value: "TWO"}]}
                                       handleChange={() => console.log("service provider picked")}
                                       buttonTitle={"Create service Provider"}
                                       handleButtonPress={handleCreateServiceProvider}
                    />
                    <View className={"flex-row"}>
                        <CustomDatePicker date={new Date()} handleChange={handleStartDateChange} label={"Start date"} name={"start_date"}/>
                        <CustomDatePicker date={new Date()} handleChange={handleEndDateChange} label={"End date"} name={"end_date"}/>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MaintenanceForm;
