import React from 'react';
import {Text, View} from 'react-native';
import AutoPartInput from "@/components/AutoPartInput";
import Divider from "@/components/Divider";
import CustomDatePicker from "@/components/CustomDatePicker";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import ThemedInputText from "@/components/ThemedInputText";
import MaintenancePicker from "@/components/MaintenancePicker";
import ThemedButton from "@/components/ThemedButton";
import {router} from "expo-router";
import {useGlobalContext} from "@/context/GlobalProvider";
import {PartPurchaseFormDataType, PartType} from "@/types/maintenance";
import {icons} from "@/constants/icons";


interface MaintenanceFormProps {
    parts: PartType[]
    searchTerm: string
    selectPart: (name: string, value: string) => void
    setIsPartSelected: (value: boolean) => void
    isPartSelected: boolean
    handleDateChange: (name: string) => (_: DateTimePickerEvent, date: Date | undefined) => void
    handleMaintenanceReportFormChange: (name: string, value: string) => void
    handleMaintenanceReportSubmission: () => void
    cancelMaintenanceReport: () => void
    handlePartPurchaseFormChange: (name: string, value: string) => void
    handlePartInputChange: (name: string, value: string) => void
    partPurchaseFormData: PartPurchaseFormDataType
}


const MaintenanceForm = ({
                             parts,
                             selectPart,
                             searchTerm,
                             setIsPartSelected,
                             isPartSelected,
                             handleDateChange,
                             handleMaintenanceReportFormChange,
                             handleMaintenanceReportSubmission,
                             cancelMaintenanceReport,
                             handlePartPurchaseFormChange,
                             partPurchaseFormData,
                             handlePartInputChange,
                         }: MaintenanceFormProps) => {
    const {partProviders} = useGlobalContext();
    const handleCreatePartProvider = () => {
        router.replace("/forms/part-provider");
    }
    const handleCreateServiceProvider = () => {

    }
    const handlePartCreation = () => {
        router.replace("/forms/part");
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
                </View>
                <Divider/>
                <View>
                    <Text className={"font-semibold text-txt text-sm"}>Maintenance Report Form</Text>
                    <MaintenancePicker containerStyles={"mb-3"}
                                       title={"Pick service provider"}
                                       name={"service_provider"}
                                       value={"value"}
                                       items={[{label: "one", value: "ONE"}, {label: "two", value: "TWO"}]}
                                       handleItemChange={() => console.log("service provider picked")}
                                       buttonTitle={"Create service Provider"}
                                       handleButtonPress={handleCreateServiceProvider}
                    />
                    <View className={"flex-row"}>
                        <CustomDatePicker date={new Date()} handleChange={handleDateChange} label={"Start date"} name={"start_date"}/>
                        <CustomDatePicker date={new Date()} handleChange={handleDateChange} label={"End date"} name={"end_date"}/>
                    </View>
                    <ThemedInputText placeholder={"Enter the Cost"} value={"0"} onChange={handleMaintenanceReportFormChange} name={'cost'} containerStyles={"bg-background p-5"}/>
                    <ThemedInputText placeholder={"Enter Mileage"} value={"0"} onChange={handleMaintenanceReportFormChange} name={'mileage'} containerStyles={"bg-background p-5"}/>
                    <ThemedInputText placeholder={"Notes"} value={"0"} onChange={handleMaintenanceReportFormChange} name={'mileage'} containerStyles={"bg-background p-5"}/>
                    <Divider/>
                    <ThemedButton title={"Submit Report"}
                                  handlePress={handleMaintenanceReportSubmission}
                                  containerStyles={"bg-primary p-5 rounded-[50%]"}
                                  textStyles={"text-white text-base font-semibold"}
                    />
                    <ThemedButton title={"Cancel"}
                                  handlePress={cancelMaintenanceReport}
                                  containerStyles="bg-default p-5 rounded-[50%] mt-[10px]"
                                  textStyles={"text-white font-semibold text-base"}
                    />
                </View>
            </View>
        </View>
    );
};

export default MaintenanceForm;
