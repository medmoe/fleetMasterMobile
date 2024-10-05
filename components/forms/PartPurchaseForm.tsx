import React from 'react';
import {Text, View} from 'react-native';
import MaintenancePicker from "../MaintenancePicker";
import AutoPartInput from "../AutoPartInput";
import {icons} from "@/constants/icons";
import ThemedButton from "../ThemedButton";
import CustomDatePicker from "../CustomDatePicker";
import ThemedInputText from "../ThemedInputText";
import {PartPurchaseEventFormType} from "@/types/maintenance";
import {useGlobalContext} from "@/context/GlobalProvider";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";

interface PartPurchaseFormProps {
    partPurchaseFormData: PartPurchaseEventFormType
    handlePartPurchaseFormChange: (name: string, value: string) => void
    handlePartInputChange: (name: string, value: string) => void
    searchTerm: string
    selectPart: (name: string, value: string) => void
    setIsPartSelected: (value: boolean) => void
    isPartSelected: boolean
    handleDateChange: (name: string) => (_: DateTimePickerEvent, date?: Date) => void
    handlePartPurchaseEventCancellation: () => void
    handlePartPurchaseEventSubmission: () => void


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
                              handlePartPurchaseEventCancellation,
                              handlePartPurchaseEventSubmission,
                          }: PartPurchaseFormProps) => {
    const {generalData} = useGlobalContext();
    return (
        <View className={"w-[94%] bg-white rounded p-5"}>
            <Text className={"font-semibold text-txt text-sm"}>Part Purchase Form</Text>
            <MaintenancePicker containerStyles={"mb-3"}
                               title={"Pick a provider"}
                               name={"provider"}
                               value={partPurchaseFormData.provider.toString()}
                               items={generalData.part_providers.map((partProvider) => ({label: partProvider.name, value: partProvider.id}))}
                               handleItemChange={handlePartPurchaseFormChange}
                               buttonTitle={"Create Part Provider"}
            />
            <View className={"flex-1"}>
                <AutoPartInput parts={generalData.parts}
                               handlePartInputChange={handlePartInputChange}
                               searchTerm={searchTerm}
                               selectPart={selectPart}
                               setIsPartSelected={setIsPartSelected}
                               isPartSelected={isPartSelected}
                               icon={icons.search}
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
                          handlePress={handlePartPurchaseEventSubmission}
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
