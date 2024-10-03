import React from 'react';
import {Text, View} from 'react-native';
import MaintenancePicker from "../MaintenancePicker";
import AutoPartInput from "../AutoPartInput";
import {icons} from "@/constants/icons";
import ThemedButton from "../ThemedButton";
import CustomDatePicker from "../CustomDatePicker";
import ThemedInputText from "../ThemedInputText";
import {PartPurchaseEventType} from "@/types/maintenance";
import {useGlobalContext} from "@/context/GlobalProvider";
import {router} from "expo-router";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";

interface PartPurchaseFormProps {
    partPurchaseFormData: PartPurchaseEventType
    handlePartPurchaseFormChange: (name: string, value: string) => void
    handlePartInputChange: (name: string, value: string) => void
    searchTerm: string
    selectPart: (name: string, value: string) => void
    setIsPartSelected: (value: boolean) => void
    isPartSelected: boolean
    handleDateChange: (name: string) => (_: DateTimePickerEvent, date?: Date) => void
    handlePartPurchaseEventCancellation: () => void


}

const PartPurchaseForm = ({
                              partPurchaseFormData,
                              handlePartPurchaseFormChange,
                              handlePartInputChange,
                              searchTerm,
                              selectPart,
                              setIsPartSelected,
                              isPartSelected,
                              handleDateChange,
                              handlePartPurchaseEventCancellation
                          }: PartPurchaseFormProps) => {
    const {partProviders, parts} = useGlobalContext();
    const handleCreatePartProvider = () => {
        router.replace("/forms/part-provider");
    }
    const handlePartCreation = () => {
        router.replace("/forms/part")
    }
    const handlePurchasePartCreation = () => {

    }
    return (
        <View className={"w-[94%] bg-white rounded p-5"}>
            <Text className={"font-semibold text-txt text-sm"}>Part Purchase Form</Text>
            <MaintenancePicker containerStyles={"mb-3"}
                               title={"Pick a provider"}
                               name={"provider"}
                               value={partPurchaseFormData.provider.toString()}
                               items={partProviders.map((partProvider) => ({label: partProvider.name, value: partProvider.id}))}
                               handleItemChange={handlePartPurchaseFormChange}
                               buttonTitle={"Create Part Provider"}
                               handleButtonPress={handleCreatePartProvider}
            />
            <View className={"flex-1"}>
                <AutoPartInput parts={parts}
                               handlePartInputChange={handlePartInputChange}
                               searchTerm={searchTerm}
                               selectPart={selectPart}
                               setIsPartSelected={setIsPartSelected}
                               isPartSelected={isPartSelected}
                               icon={icons.search}
                />
                <ThemedButton title={"Create part"}
                              handlePress={handlePartCreation}
                              containerStyles={"bg-secondary w-full p-5 rounded-[50%] mt-3"}
                              textStyles={"text-white font-semibold text-base"}
                />
            </View>

            <View className={"flex-row"}>
                <CustomDatePicker date={new Date()}
                                  handleChange={handleDateChange}
                                  label={"Purchase Date"}
                                  name={"purchase_date"}
                />
                <ThemedInputText onChange={handlePartPurchaseFormChange}
                                 containerStyles={"bg-background p-5"}
                                 placeholder={"Enter cost"}
                                 name={"cost"}
                                 value={partPurchaseFormData.cost}
                />
            </View>
            <ThemedButton title={"Submit purchase form"}
                          handlePress={handlePurchasePartCreation}
                          containerStyles="bg-primary p-5 rounded-[50%] mt-[10px]"
                          textStyles={"text-white font-semibold text-base"}
            />
            <ThemedButton title={"Cancel"}
                          handlePress={handlePartPurchaseEventCancellation}
                          containerStyles="bg-default p-5 rounded-[50%] mt-[10px]"
                          textStyles={"text-white font-semibold text-base"}
            />
        </View>
    );
};

export default PartPurchaseForm;
