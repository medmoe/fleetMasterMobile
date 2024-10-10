import React from 'react';
import {Pressable, Text, View} from 'react-native';
import ListItemDetail from "../ListItemDetail";
import ThemedButton from "../ThemedButton";
import MaintenancePicker from "../MaintenancePicker";
import CustomDatePicker from "../CustomDatePicker";
import ThemedInputText from "../ThemedInputText";
import {useGlobalContext} from "@/context/GlobalProvider";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {PartPurchaseEventType} from "@/types/maintenance";


interface MaintenanceFormProps {
    handleEditPartPurchaseEvent: (partPurchaseEvent: PartPurchaseEventType) => void
    handlePartPurchaseEventCreation: () => void
    handleDateChange: (name: string) => (_: DateTimePickerEvent, date?: Date) => void
    handleMaintenanceReportFormChange: (name: string, value: string) => void
    handleMaintenanceReportSubmission: () => void
    handleMaintenanceReportCancellation: () => void
    handlePartPurchaseEventOnLongPress: (partPurchaseEventId?: string) => void
    handlePartPurchaseEventDeletion: () => void
    showDeleteFeatures: boolean
    partPurchaseEventId?: string

}

const MaintenanceForm = ({
                             handleEditPartPurchaseEvent,
                             handleDateChange,
                             handleMaintenanceReportFormChange,
                             handleMaintenanceReportSubmission,
                             handleMaintenanceReportCancellation,
                             handlePartPurchaseEventCreation,
                             handlePartPurchaseEventOnLongPress,
                             handlePartPurchaseEventDeletion,
                             showDeleteFeatures,
                             partPurchaseEventId,
                         }: MaintenanceFormProps) => {
    const {partPurchaseEvents, generalData} = useGlobalContext()
    return (
        <View className={"w-full justify-center items-center"}>
            <View className={"w-[94%] bg-white rounded p-5"}>
                <View className={"gap-2 mb-3"}>
                    <Text className={"font-semibold text-txt text-base"}>Maintenance Report Form</Text>
                    <Text className={"font-open-sans text-txt text-sm"}>Fill details below.</Text>
                </View>
                <View className={"flex-1"}>
                    {partPurchaseEvents.map((partPurchaseEvent, idx) => {
                        const part = generalData.parts.find((part) => partPurchaseEvent.part.toString() === part.id?.toString());
                        const partProvider = generalData.part_providers.find((partsProvider) => partPurchaseEvent.provider === partsProvider.id);
                        return (
                            <Pressable onPress={() => handleEditPartPurchaseEvent(partPurchaseEvent)} key={idx}
                                       onLongPress={() => handlePartPurchaseEventOnLongPress(partPurchaseEvent.id?.toString())}>
                                <View className={`flex-1 p-[16px] bg-white rounded shadow mb-3 ${showDeleteFeatures && partPurchaseEventId === partPurchaseEvent.id?.toString()? "shadow-error" : ""}`}>
                                    <ListItemDetail label={"Part name"} value={part?.name} textStyle={"text-txt"}/>
                                    <ListItemDetail label={"Provider name"} value={partProvider?.name} textStyle={"text-txt"}/>
                                    <ListItemDetail label={"Purchase date"} value={partPurchaseEvent.purchase_date} textStyle={"text-txt"}/>
                                    <ListItemDetail label={"Cost"} value={partPurchaseEvent.cost} textStyle={"text-txt"}/>
                                </View>
                            </Pressable>
                        )
                    })}

                </View>

                <View>
                    <MaintenancePicker containerStyles={"mb-3"}
                                       title={"Pick service provider"}
                                       name={"service_provider"}
                                       value={"value"}
                                       items={generalData.service_providers.map((serviceProvider) => ({label: serviceProvider.name, value: serviceProvider.id}))}
                                       handleItemChange={() => console.log("service provider picked")}
                                       buttonTitle={"Create service Provider"}
                    />
                    <View className={"flex-row"}>
                        <CustomDatePicker date={new Date()} handleChange={handleDateChange} label={"Start date"} name={"start_date"}/>
                        <CustomDatePicker date={new Date()} handleChange={handleDateChange} label={"End date"} name={"end_date"}/>
                    </View>
                    <ThemedInputText placeholder={"Enter the Cost"} value={"0"} onChange={handleMaintenanceReportFormChange} name={'cost'} containerStyles={"bg-background p-5"}/>
                    <ThemedInputText placeholder={"Enter Mileage"} value={"0"} onChange={handleMaintenanceReportFormChange} name={'mileage'} containerStyles={"bg-background p-5"}/>
                    <ThemedInputText placeholder={"Notes"} value={"0"} onChange={handleMaintenanceReportFormChange} name={'mileage'} containerStyles={"bg-background p-5"}/>
                    {showDeleteFeatures && <ThemedButton title={"Delete Part Purchase Event"}
                                                         handlePress={handlePartPurchaseEventDeletion}
                                                         containerStyles={"bg-error p-5 rounded-[50%] mt-3"}
                                                         textStyles={"text-white text-base font-semibold"}
                    />
                    }
                    <ThemedButton title={"Create part purchase event"}
                                  handlePress={handlePartPurchaseEventCreation}
                                  containerStyles={"bg-secondary p-5 rounded-[50%] mt-3"}
                                  textStyles={"text-white text-base font-semibold"}
                    />
                    <ThemedButton title={"Submit Report"}
                                  handlePress={handleMaintenanceReportSubmission}
                                  containerStyles={"bg-primary p-5 rounded-[50%] mt-3"}
                                  textStyles={"text-white text-base font-semibold"}
                    />
                    <ThemedButton title={"Cancel"}
                                  handlePress={handleMaintenanceReportCancellation}
                                  containerStyles="bg-default p-5 rounded-[50%] mt-3"
                                  textStyles={"text-white font-semibold text-base"}
                    />
                </View>
            </View>
        </View>
    );
};

export default MaintenanceForm;
