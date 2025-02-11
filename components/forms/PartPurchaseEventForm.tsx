import React from 'react';
import {Text, View} from 'react-native';
import MaintenancePicker from "../MaintenancePicker";
import AutoPartInput from "../AutoPartInput";
import {icons} from "@/constants/icons";
import ThemedButton from "../ThemedButton";
import CustomDatePicker from "../CustomDatePicker";
import ThemedInputText from "../ThemedInputText";
import {useGlobalContext} from "@/context/GlobalProvider";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {PartPurchaseEventType} from "@/types/maintenance";

interface PartPurchaseFormProps {
    handleEventsDateChange: (name: string) => (_: DateTimePickerEvent, date?: Date) => void
    handlePartInputChange: (name: string, value: string) => void
    handlePartPurchaseEventAddition: (index: number | undefined) => void
    handlePartPurchaseEventCancellation: () => void
    handlePartPurchaseEventFormChange: (name: string, value: string) => void
    indexOfPartPurchaseEventToEdit: number | undefined
    isPartPurchaseEventFormDataEdition: boolean
    isPartSelected: boolean
    partPurchaseFormData: PartPurchaseEventType
    purchaseDate: Date
    searchTerm: string
    selectPart: (name: string, value: string) => void
    setIsPartSelected: (value: boolean) => void
}

const PartPurchaseEventForm = ({
                                   handleEventsDateChange,
                                   handlePartInputChange,
                                   handlePartPurchaseEventAddition,
                                   handlePartPurchaseEventCancellation,
                                   handlePartPurchaseEventFormChange,
                                   indexOfPartPurchaseEventToEdit,
                                   isPartPurchaseEventFormDataEdition,
                                   isPartSelected,
                                   partPurchaseFormData,
                                   purchaseDate,
                                   searchTerm,
                                   selectPart,
                                   setIsPartSelected,
                               }: PartPurchaseFormProps) => {
    const {generalData} = useGlobalContext();
    const {id, name, address, phone_number} = partPurchaseFormData.provider
    return (
        <View className={"w-[94%] bg-white rounded p-5"}>
            <Text className={"font-semibold text-txt text-sm"}>Part Purchase Event Form</Text>
            <MaintenancePicker containerStyles={"mb-3"}
                               title={"Pick parts provider"}
                               name={"provider"}
                               value={`id:${id},name:${name},address:${address},phone_number:${phone_number}`}
                               items={generalData.part_providers.map((partProvider) => ({
                                   label: partProvider.name,
                                   value: `id:${partProvider.id},name:${partProvider.name},address:${partProvider.address},phone_number:${partProvider.phone_number}`
                               }))}
                               handleItemChange={handlePartPurchaseEventFormChange}
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

            <View className={"mt-3"}>
                <CustomDatePicker date={purchaseDate}
                                  handleChange={handleEventsDateChange}
                                  label={"Purchase Date"}
                                  name={"purchase_date"}
                />
                <ThemedInputText onChange={handlePartPurchaseEventFormChange}
                                 containerStyles={"bg-background p-5 flex-1"}
                                 placeholder={"Enter cost"}
                                 name={"cost"}
                                 value={partPurchaseFormData.cost}
                />
            </View>
            <ThemedButton title={isPartPurchaseEventFormDataEdition ? "Edit Part Purchase Event" : "Add Part Purchase Event"}
                          handlePress={() => handlePartPurchaseEventAddition(indexOfPartPurchaseEventToEdit)}
                          containerStyles="bg-primary p-5 rounded mt-[10px]"
                          textStyles={"text-white font-semibold text-base"}
            />
            <ThemedButton title={"Cancel"}
                          handlePress={handlePartPurchaseEventCancellation}
                          containerStyles="bg-default p-5 rounded mt-[10px]"
                          textStyles={"text-white font-semibold text-base"}
            />
        </View>
    );
};

export default PartPurchaseEventForm;
