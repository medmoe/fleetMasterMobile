import React from 'react';
import {Pressable, Text, View} from 'react-native';
import ListItemDetail from "../ListItemDetail";
import ThemedButton from "../ThemedButton";
import MaintenancePicker from "../MaintenancePicker";
import CustomDatePicker from "../CustomDatePicker";
import ThemedInputText from "../ThemedInputText";
import {useGlobalContext} from "@/context/GlobalProvider";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {MaintenanceReportType, PartPurchaseEventType} from "@/types/maintenance";
import {v4 as uuidv4} from 'uuid';

interface MaintenanceFormProps {
    handlePartPurchaseEventEdition: (partPurchaseEvent: PartPurchaseEventType) => void
    handlePartPurchaseEventCreation: () => void
    handleDateChange: (name: string) => (_: DateTimePickerEvent, date?: Date) => void
    handleMaintenanceReportFormChange: (name: string, value: string) => void
    handleMaintenanceReportSubmission: () => void
    handleMaintenanceReportCancellation: () => void
    handlePartPurchaseEventOnLongPress: (partPurchaseEventId?: string) => void
    handlePartPurchaseEventDeletion: () => void
    showDeleteFeatures: boolean
    partPurchaseEventId?: string
    partPurchaseEvents: PartPurchaseEventType[]
    maintenanceReportFormData: MaintenanceReportType
    maintenanceReportDates: { [key in "start_date" | "end_date" | "purchase_date"]: Date }


}

const MaintenanceForm = ({
                             handlePartPurchaseEventEdition,
                             handleDateChange,
                             handleMaintenanceReportFormChange,
                             handleMaintenanceReportSubmission,
                             handleMaintenanceReportCancellation,
                             handlePartPurchaseEventCreation,
                             handlePartPurchaseEventOnLongPress,
                             handlePartPurchaseEventDeletion,
                             showDeleteFeatures,
                             partPurchaseEventId,
                             partPurchaseEvents,
                             maintenanceReportFormData,
                             maintenanceReportDates
                         }: MaintenanceFormProps) => {
    const {generalData} = useGlobalContext();
    return (
        <View className={"w-full justify-center items-center"}>
            <View className={"w-[94%] bg-white rounded p-5"}>
                <View className={"gap-2 mb-3"}>
                    <Text className={"font-semibold text-txt text-base"}>Maintenance Report Form</Text>
                    <Text className={"font-open-sans text-txt text-sm"}>Fill details below.</Text>
                </View>
                <View className={"flex-1"}>
                    {partPurchaseEvents.map((partPurchaseEvent) => {
                        const part = generalData.parts.find((part) => partPurchaseEvent.part.toString() === part.id?.toString());
                        const partProvider = generalData.part_providers.find((partsProvider) => partPurchaseEvent.provider === partsProvider.id);
                        return (
                            <Pressable onPress={() => handlePartPurchaseEventEdition(partPurchaseEvent)} key={uuidv4()}
                                       onLongPress={() => handlePartPurchaseEventOnLongPress(partPurchaseEvent.id?.toString())}>
                                <View
                                    className={`flex-1 p-[16px] bg-white rounded shadow mb-3 ${showDeleteFeatures && partPurchaseEventId === partPurchaseEvent.id?.toString() ? "shadow-error" : ""}`}>
                                    <ListItemDetail label={"Part name"} value={part?.name} textStyle={"text-txt"}/>
                                    <ListItemDetail label={"Provider name"} value={partProvider?.name}
                                                    textStyle={"text-txt"}/>
                                    <ListItemDetail label={"Purchase date"} value={partPurchaseEvent.purchase_date}
                                                    textStyle={"text-txt"}/>
                                    <ListItemDetail label={"Cost"} value={partPurchaseEvent.cost}
                                                    textStyle={"text-txt"}/>
                                </View>
                            </Pressable>
                        )
                    })}

                </View>

                <View>
                    <MaintenancePicker containerStyles={"mb-3"}
                                       title={"Pick service provider"}
                                       name={"service_provider"}
                                       value={maintenanceReportFormData.service_provider}
                                       items={generalData.service_providers.map((serviceProvider) => ({
                                           label: serviceProvider.name,
                                           value: serviceProvider.id
                                       }))}
                                       handleItemChange={handleMaintenanceReportFormChange}
                    />
                    <MaintenancePicker containerStyles={"mb-3"}
                                       title={"Select maintenance type"}
                                       name={"maintenance_type"}
                                       value={maintenanceReportFormData.maintenance_type}
                                       items={[{label: "Preventive", value: "PREVENTIVE"}, {
                                           label: "Curative",
                                           value: "CURATIVE"
                                       }]}
                                       handleItemChange={handleMaintenanceReportFormChange}
                    />
                    <View className={"flex-row"}>
                        <CustomDatePicker date={maintenanceReportDates.start_date} handleChange={handleDateChange}
                                          label={"Start date"} name={"start_date"}/>
                        <CustomDatePicker date={maintenanceReportDates.end_date} handleChange={handleDateChange}
                                          label={"End date"} name={"end_date"}/>
                    </View>
                    <ThemedInputText placeholder={"Enter the Cost"} value={maintenanceReportFormData.cost}
                                     onChange={handleMaintenanceReportFormChange} name={'cost'}
                                     containerStyles={"bg-background p-5"}/>
                    <ThemedInputText placeholder={"Enter Mileage"} value={maintenanceReportFormData.mileage}
                                     onChange={handleMaintenanceReportFormChange} name={'mileage'}
                                     containerStyles={"bg-background p-5"}/>
                    <ThemedInputText placeholder={"Description"} value={maintenanceReportFormData.description}
                                     onChange={handleMaintenanceReportFormChange} name={'description'}
                                     containerStyles={"bg-background p-5"}/>
                    {showDeleteFeatures && <ThemedButton
                        title={"Delete purchase event"}
                        handlePress={handlePartPurchaseEventDeletion}
                        containerStyles={"bg-error p-5 rounded-[50%] mt-3"}
                        textStyles={"text-white text-base font-semibold"}/>
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
