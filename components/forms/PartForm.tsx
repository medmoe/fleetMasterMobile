import React from 'react';
import {Text, View} from 'react-native';
import ThemedInputText from "@/components/ThemedInputText";
import {PartType} from "@/types/maintenance";
import ThemedButton from "../ThemedButton";

interface PartFormProps {
    part: {name: string, description: string}
    handlePartInputChange: (name: string, value: string) => void
    handlePartSubmission: () => void
    handlePartCancellation: () => void
}

const PartForm = ({part, handlePartInputChange, handlePartSubmission, handlePartCancellation}: PartFormProps) => {
    return (
        <View className={"w-full justify-center items-center"}>
            <View className={"w-[94%] bg-white rounded p-5"}>
                <View className={"gap-2"}>
                    <Text className={"font-semibold text-txt text-base"}>Part Form</Text>
                    <Text className={"font-open-sans text-txt text-sm"}>Fill in part's details below.</Text>
                </View>
                <View className={"mt-[25px]"}>
                    <ThemedInputText placeholder={"Enter part name"}
                                     value={part.name}
                                     onChange={handlePartInputChange}
                                     name={'name'}
                                     containerStyles={"bg-background p-5"}
                    />
                    <ThemedInputText placeholder={"Enter part description"}
                                     value={part.description}
                                     onChange={handlePartInputChange}
                                     name={'description'}
                                     containerStyles={"bg-background p-5"}
                    />
                </View>
                <ThemedButton title={"Submit"}
                              handlePress={handlePartSubmission}
                              containerStyles={"w-full bg-primary p-5 rounded-[50%] mt-3"}
                              textStyles={"text-white font-semibold text-base"}
                />
                <ThemedButton title={"Cancel"}
                              handlePress={handlePartCancellation}
                              containerStyles={"w-full bg-default p-5 rounded-[50%] mt-3"}
                              textStyles={"text-white font-semibold text-base"}
                />
            </View>
        </View>
    );
};

export default PartForm;
