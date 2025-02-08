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
    partPurchaseFormData: PartPurchaseEventType
    handlePartPurchaseFormChange: (name: string, value: string) => void
    handlePartInputChange: (name: string, value: string) => void
    searchTerm: string
    selectPart: (name: string, value: string) => void
    setIsPartSelected: (value: boolean) => void
    isPartSelected: boolean
    handleDateChange: (name: string) => (_: DateTimePickerEvent, date?: Date) => void
    handlePartPurchaseEventCancellation: () => void
    handlePartPurchaseEventAddition: () => void
    maintenanceReportDates: { [key in "start_date" | "end_date" | "purchase_date"]: Date }


}

const PartPurchaseEventForm = ({
                              partPurchaseFormData,
                              handlePartPurchaseFormChange,
                              handlePartInputChange,
                              searchTerm,
                              selectPart,
                              setIsPartSelected,
                              isPartSelected,
                              handleDateChange,
                              handlePartPurchaseEventCancellation,
                              handlePartPurchaseEventAddition,
                              maintenanceReportDates,
                          }: PartPurchaseFormProps) => {
    const {generalData} = useGlobalContext();
    return (
        <View className={"w-[94%] bg-white rounded p-5"}>
            <Text className={"font-semibold text-txt text-sm"}>Part Purchase Event Form</Text>
            <MaintenancePicker containerStyles={"mb-3"}
                               title={"Pick parts provider"}
                               name={"provider"}
                               value={partPurchaseFormData.provider.id || ""}
                               items={generalData.part_providers.map((partProvider) => ({label: partProvider.name, value: partProvider.id}))}
                               handleItemChange={handlePartPurchaseFormChange}
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

            <View className={"flex-row mt-3"}>
                <CustomDatePicker date={maintenanceReportDates.purchase_date}
                                  handleChange={handleDateChange}
                                  label={"Purchase Date"}
                                  name={"purchase_date"}
                />
                <ThemedInputText onChange={handlePartPurchaseFormChange}
                                 containerStyles={"bg-background p-5 flex-1"}
                                 placeholder={"Enter cost"}
                                 name={"cost"}
                                 value={partPurchaseFormData.cost}
                />
            </View>
            <ThemedButton title={"Submit purchase form"}
                          handlePress={handlePartPurchaseEventAddition}
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
