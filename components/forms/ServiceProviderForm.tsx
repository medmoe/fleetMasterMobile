import React from 'react';
import {Text, View} from 'react-native';
import ThemedButton from "../ThemedButton";
import CustomPicker from "@/components/CustomPicker";
import {ServiceProviderType} from "@/types/maintenance";
import ThemedInputText from "@/components/ThemedInputText";

interface ServiceProviderFormProps {
    handleServiceProviderSubmission: () => void
    handleServiceProviderCreationCancellation: () => void
    serviceProviderFormData: ServiceProviderType
    handleServiceProviderFormChange: (name: string, value: string) => void
}

const ServiceProviderForm = ({
                                 handleServiceProviderSubmission,
                                 handleServiceProviderCreationCancellation,
                                 serviceProviderFormData,
                                 handleServiceProviderFormChange
                             }: ServiceProviderFormProps) => {
    const serviceTypes = [
        {label: "Mechanic", value: "MECHANIC"},
        {label: "Electrician", value: "ELECTRICIAN"},
        {label: "Cleaning", value: "CLEANING"},
    ]
    return (
        <View className={"w-[94%] bg-white rounded p-5"}>
            <Text className={"font-semibold text-txt text-sm"}>Service Provider Form</Text>
            <CustomPicker name={'service_type'} value={serviceProviderFormData.service_type} items={serviceTypes}
                          handleChange={handleServiceProviderFormChange}/>
            <ThemedInputText placeholder={"Enter name"}
                             value={serviceProviderFormData.name}
                             onChange={handleServiceProviderFormChange}
                             name={'name'}
                             containerStyles={"bg-background p-5"}
            /><ThemedInputText placeholder={"Enter phone number"}
                               value={serviceProviderFormData.phone_number}
                               onChange={handleServiceProviderFormChange}
                               name={'phone_number'}
                               containerStyles={"bg-background p-5 mt-3"}
        /><ThemedInputText placeholder={"Enter address"}
                           value={serviceProviderFormData.address}
                           onChange={handleServiceProviderFormChange}
                           name={'address'}
                           containerStyles={"bg-background p-5 mt-3"}
        />
            <ThemedButton title={"Submit"}
                          handlePress={handleServiceProviderSubmission}
                          containerStyles="bg-primary p-5 rounded mt-[10px]"
                          textStyles={"text-white font-semibold text-base"}
            />
            <ThemedButton title={"Cancel"}
                          handlePress={handleServiceProviderCreationCancellation}
                          containerStyles="bg-default p-5 rounded mt-[10px]"
                          textStyles={"text-white font-semibold text-base"}
            />
        </View>
    );
};

export default ServiceProviderForm;
