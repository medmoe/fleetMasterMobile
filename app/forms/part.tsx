import React, {useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useGlobalContext} from "@/context/GlobalProvider";
import {ListItemDetail, ThemedButton} from "@/components";
import PartForm from "@/components/forms/PartForm";
import axios from "axios";
import {API} from "@/constants/endpoints";
import {router} from "expo-router";

const Part = () => {
    const {generalData, setGeneralData} = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const [showPartCreationForm, setShowPartCreationForm] = useState(false)
    const [partFormData, setPartFormData] = useState({name: "", description: ""})
    const handleEditPart = () => {

    }
    const handlePartCreation = () => {
        setShowPartCreationForm(true);
    }
    const handleCancelPartCreation = () => {
        router.replace("/maintenance/maintenance-report")
    }
    const handlePartInputChange = (name: string, value: string) => {
        setPartFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handlePartSubmission = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API}maintenance/parts/`, partFormData, {headers: {'Content-Type': 'application/json'}, withCredentials: true});
            setGeneralData({
                ...generalData,
                parts: [...generalData.parts, response.data]
            })
            setShowPartCreationForm(false);
        } catch (error: any) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    const handlePartCancellation = () => {
        setShowPartCreationForm(false);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {showPartCreationForm ?
                    <PartForm part={partFormData}
                              handlePartInputChange={handlePartInputChange}
                              handlePartSubmission={handlePartSubmission}
                              handlePartCancellation={handlePartCancellation}
                    />
                    :
                    <View className={"w-full justify-center items-center"}>
                        <View className={"w-[94%] bg-white rounded p-5"}>
                            <View className={"gap-2"}>
                                <Text className={"font-semibold text-base text-txt"}>Part's list</Text>
                                <Text className={"font-open-sans text-txt text-sm"}>Here is the list of parts</Text>
                            </View>
                            <View>
                                {generalData.parts.map((part, idx) => {
                                    return (
                                        <Pressable onPress={handleEditPart} key={idx}>
                                            <View className={"flex-row p-[16px] bg-white rounded shadow mt-3"}>
                                                <View className={"flex-1"}>
                                                    <ListItemDetail label={"Part name"} value={part.name} textStyle={"text-txt"}/>
                                                    <ListItemDetail label={"Description"} value={part.description} textStyle={"text-txt"}/>
                                                </View>
                                            </View>
                                        </Pressable>
                                    )
                                })}
                            </View>
                            <View className={"w-full pt-5"}>
                                <ThemedButton title={"Add part"}
                                              handlePress={handlePartCreation}
                                              containerStyles={"bg-primary p-5 rounded-[50%]"}
                                              textStyles={"font-semibold text-base text-white"}
                                />
                                <ThemedButton title={"Cancel"}
                                              handlePress={handleCancelPartCreation}
                                              containerStyles={"bg-default p-5 rounded-[50%] mt-3"}
                                              textStyles={"font-semibold text-base text-white"}
                                />
                            </View>
                        </View>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default Part;
