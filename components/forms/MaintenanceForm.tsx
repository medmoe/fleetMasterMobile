import React from 'react';
import {Text, View} from 'react-native';
import ThemedButton from "../ThemedButton";
import MaintenancePicker from "../MaintenancePicker";
import CustomDatePicker from "../CustomDatePicker";
import ThemedInputText from "../ThemedInputText";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {MaintenanceReportType} from "@/types/maintenance";
import PartPurchaseEventCard from "../cards/PartPurchaseEventCard";
import ServiceProviderEventCard from "../cards/ServiceProviderEventCard";
import Divider from "../Divider";

interface MaintenanceFormProps {
    handleDateChange: (name: string) => (_: DateTimePickerEvent, date?: Date) => void
    handleMaintenanceReportCancellation: () => void
    handleMaintenanceReportFormChange: (name: string, value: string) => void
    handleMaintenanceReportSubmission: () => void
    handlePartPurchaseEventCreation: () => void
    handlePartPurchaseEventDeletion: (index: number) => void
    handlePartPurchaseEventEdition: (index: number) => void
    handleServiceProviderEventCreation: () => void
    handleServiceProviderEventDeletion: (index: number) => void
    handleServiceProviderEventEdition: (index: number) => void
    maintenanceReportDates: { [key in "start_date" | "end_date" | "purchase_date"]: Date }
    maintenanceReportFormData: MaintenanceReportType
}

const MaintenanceForm = ({
                             handleDateChange,
                             handleMaintenanceReportCancellation,
                             handleMaintenanceReportFormChange,
                             handleMaintenanceReportSubmission,
                             handlePartPurchaseEventCreation,
                             handlePartPurchaseEventDeletion,
                             handlePartPurchaseEventEdition,
                             handleServiceProviderEventCreation,
                             handleServiceProviderEventDeletion,
                             handleServiceProviderEventEdition,
                             maintenanceReportDates,
                             maintenanceReportFormData,
                         }: MaintenanceFormProps) => {
    const {part_purchase_events, service_provider_events} = maintenanceReportFormData;
    return (
        <View className={"w-full justify-center items-center"}>
            <View className={"w-[94%] bg-white rounded p-5"}>
                <View className={"gap-2 mb-3"}>
                    <Text className={"font-semibold text-txt text-base"}>Maintenance Report Form</Text>
                    <Text className={"font-open-sans text-txt text-sm"}>Fill details below.</Text>
                </View>
                <View className={"flex-1"}>
                </View>
                <View>
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
                    <ThemedInputText placeholder={"Enter Mileage"} value={maintenanceReportFormData.mileage}
                                     onChange={handleMaintenanceReportFormChange} name={'mileage'}
                                     containerStyles={"bg-background p-5 mt-3"}/>
                    <ThemedInputText placeholder={"Description"} value={maintenanceReportFormData.description}
                                     onChange={handleMaintenanceReportFormChange} name={'description'}
                                     containerStyles={"bg-background p-5 mt-3"}/>
                    {(part_purchase_events.length !== 0 || service_provider_events.length !== 0) && <Divider/>}
                    {part_purchase_events.length !== 0 && <View className={"mt-3"}>
                        <Text className={"font-semibold text-base text-txt"}>Part Purchase Events</Text>
                        {part_purchase_events.map((partPurchaseEvent, index) => {
                            return (
                                <PartPurchaseEventCard key={index}
                                                       onPress={() => handlePartPurchaseEventEdition(index)}
                                                       onLongPress={() => handlePartPurchaseEventDeletion(index)}
                                                       partPurchaseEvent={partPurchaseEvent}
                                />
                            )
                        })}
                    </View>}
                    {service_provider_events.length !== 0 && <View className={"mt-3"}>
                        <Text className={"font-semibold text-base text-txt"}>Service Provider Events</Text>
                        {service_provider_events.map((event, index) => {
                            return (
                                <ServiceProviderEventCard key={index}
                                                          onPress={() => handleServiceProviderEventEdition(index)}
                                                          onLongPress={() => handleServiceProviderEventDeletion(index)}
                                                          serviceProviderEvent={event}/>
                            )
                        })}
                    </View>}

                    <View className={"mt-3"}>
                        <ThemedButton title={"Create part purchase event"}
                                      handlePress={handlePartPurchaseEventCreation}
                                      containerStyles={"bg-secondary-500 p-5 rounded"}
                                      textStyles={"text-white text-base font-semibold"}
                        />
                        <ThemedButton title={"Create service provider event"}
                                      handlePress={handleServiceProviderEventCreation}
                                      containerStyles={"bg-secondary-500 p-5 rounded mt-3"}
                                      textStyles={"text-white text-base font-semibold"}
                        />
                        <ThemedButton title={"Submit Report"}
                                      handlePress={handleMaintenanceReportSubmission}
                                      containerStyles={"bg-primary-500 p-5 rounded mt-3"}
                                      textStyles={"text-white text-base font-semibold"}
                        />
                        <ThemedButton title={"Cancel"}
                                      handlePress={handleMaintenanceReportCancellation}
                                      containerStyles="bg-default p-5 rounded mt-3"
                                      textStyles={"text-white font-semibold text-base"}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MaintenanceForm;
