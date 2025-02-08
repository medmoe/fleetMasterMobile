import React from 'react'
import {Text, View} from 'react-native';
import MaintenancePicker from "@/components/MaintenancePicker";
import {ServiceProviderEventType, ServiceProviderType} from "@/types/maintenance";
import {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import CustomDatePicker from "@/components/CustomDatePicker";
import ThemedInputText from "@/components/ThemedInputText";
import ThemedButton from "@/components/ThemedButton";

interface ServiceProviderEventFormProps {
    serviceProviders: ServiceProviderType[];
    service_date: Date
    handleChange: (name: string) => (_: DateTimePickerEvent, date: Date | undefined) => void
    serviceProviderEventFormData: ServiceProviderEventType
    handleServiceProviderEventFormChange: (name: string, value: string) => void
    handleServiceProviderEventAddition: () => void
    handleServiceProviderEventCancellation: () => void


}

const ServiceProviderEventForm = ({
                                      serviceProviders,
                                      service_date,
                                      handleChange,
                                      serviceProviderEventFormData,
                                      handleServiceProviderEventFormChange,
                                      handleServiceProviderEventAddition,
                                      handleServiceProviderEventCancellation,
                                  }: ServiceProviderEventFormProps) => {
    const {id, service_type, name, phone_number, address} = serviceProviderEventFormData.service_provider
    return (
        <View className={"w-[94% bg-white rounded p-5"}>
            <Text className={"font-semibold text-txt text-sm"}>Service Provider Event Form</Text>
            <MaintenancePicker containerStyles={"mb-3"}
                               title={"Pick service provider"}
                               name={"service_provider"}
                               value={`id:${id},service_type:${service_type},name:${name},phone_number:${phone_number},address:${address}`}
                               items={serviceProviders.map((serviceProvider) => ({
                                   label: serviceProvider.name,
                                   value: `id:${serviceProvider.id},service_type:${serviceProvider.service_type},name:${serviceProvider.name},phone_number:${serviceProvider.phone_number},address:${serviceProvider.address}`
                               }))}
                               handleItemChange={handleServiceProviderEventFormChange}
            />
            <CustomDatePicker date={service_date} handleChange={handleChange} label={"Service Date"} name={"service_date"}/>
            <ThemedInputText placeholder={"Enter cost"}
                             value={serviceProviderEventFormData.cost}
                             onChange={handleServiceProviderEventFormChange}
                             name={"cost"}
                             containerStyles={"bg-background p-5 mt-3"}
            />
            <ThemedInputText placeholder={"Description"}
                             value={serviceProviderEventFormData.description}
                             onChange={handleServiceProviderEventFormChange}
                             name={"description"}
                             containerStyles={"bg-background p-5 mt-3"}
            />
            <ThemedButton title={"Add service event"}
                          handlePress={handleServiceProviderEventAddition}
                          containerStyles={"bg-primary p-5 rounded mt-3"}
                          textStyles={"text-white font-semibold text-base"}
            />
            <ThemedButton title={"Cancel"}
                          handlePress={handleServiceProviderEventCancellation}
                          containerStyles={"bg-default p-5 rounded mt-3"}
                          textStyles={"text-white font-semibold text-base"}/>
        </View>
    )
}

export default ServiceProviderEventForm