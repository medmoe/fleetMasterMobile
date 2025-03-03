import React from 'react';
import {Text, View} from 'react-native';
import ThemedInputText from "@/components/ThemedInputText";
import {PartProviderType} from "@/types/maintenance";
import ThemedButton from "@/components/ThemedButton";

interface PartProviderFormProps {
    partProvider: PartProviderType
    handlePartProviderInputChange: (name: string, value: string) => void
    handlePartProviderSubmission: () => void
    handlePartProviderCancellation: () => void
}

const PartProviderFrom = (
    {
        partProvider,
        handlePartProviderInputChange,
        handlePartProviderSubmission,
        handlePartProviderCancellation,
    }: PartProviderFormProps) => {
    return (
        <View className={"w-full justify-center items-center"}>
            <View className={"w-[94%] bg-white rounded p-5"}>
                <View className={"gap-2"}>
                    <Text className={"font-semibold text-txt text-base"}>Part Provider Form</Text>
                    <Text className={"font-open-sans text-txt text-sm"}>Fill in part provider's details below.</Text>
                </View>
                <View className={"mt-[25px]"}>
                    <ThemedInputText placeholder={"Enter provider name"}
                                     value={partProvider.name}
                                     onChange={handlePartProviderInputChange}
                                     name={'name'}
                                     containerStyles={"bg-background p-5"}
                    />
                    <ThemedInputText placeholder={"Enter phone number"}
                                     value={partProvider.phone_number}
                                     onChange={handlePartProviderInputChange}
                                     name={'phone_number'}
                                     containerStyles={"bg-background p-5 mt-3"}
                    />
                    <ThemedInputText placeholder={"Enter address"}
                                     value={partProvider.address}
                                     onChange={handlePartProviderInputChange}
                                     name={'address'}
                                     containerStyles={"bg-background p-5 mt-3"}
                    />
                </View>
                <ThemedButton title={"Submit"} handlePress={handlePartProviderSubmission}
                              containerStyles={"w-full bg-primary-500 p-5 rounded mt-3"}
                              textStyles={"text-white font-semibold text-base"}/>
                <ThemedButton title={"Cancel"} handlePress={handlePartProviderCancellation}
                              containerStyles={"w-full bg-default p-5 rounded mt-3"}
                              textStyles={"text-white font-semibold text-base"}/>
            </View>
        </View>
    );
};

export default PartProviderFrom;
