import React, {useCallback, useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useGlobalContext} from "@/context/GlobalProvider";
import {AutoPartInput, ListItemDetail, Spinner, ThemedButton} from "@/components";
import PartForm from "@/components/forms/PartForm";
import axios from "axios";
import {API} from "@/constants/endpoints";
import {router} from "expo-router";
import {PartType} from "@/types/maintenance";


const Part = () => {
    const {generalData, setGeneralData} = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const [showPartCreationForm, setShowPartCreationForm] = useState(false)
    const [partFormData, setPartFormData] = useState({name: "", description: ""})
    const [searchTerm, setSearchTerm] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const [part, setPart] = useState<PartType>({name: "", description: ""})
    const [isUpdate, setIsUpdate] = useState(false);
    const [subtitle, setSubtitle] = useState("Fill in the fields below.")
    const [showDeleteFeatures, setShowDeleteFeatures] = useState(false);
    const options = {headers: {'Content-Type': 'application/json'}, withCredentials: true};
    const setIsPartSelected = useCallback((isSelected: boolean) => {
        setIsSelected(isSelected)
    }, [])
    const handleEditPart = (part: PartType) => {
        setPartFormData(part);
        setShowPartCreationForm(true);
        setIsUpdate(true);
        setSubtitle("Edit the fields below.")
    }
    const handlePartCreation = () => {
        setPartFormData({name: "", description: ""})
        setIsUpdate(false);
        setShowPartCreationForm(true);
        setSubtitle("Fill in the fields below.")
    }
    const handleCancelPartCreation = () => {
        if (showDeleteFeatures) {
            setShowDeleteFeatures(false);
        } else if (searchTerm) {
            setSearchTerm("")
            setPart({name: "", description: ""})
        } else {
            router.replace("/maintenance/maintenance-report")
        }
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
            const url = !isUpdate ? `${API}maintenance/parts/` : `${API}maintenance/parts/${part.id}/`

            const response = !isUpdate ? await axios.post(url, partFormData, options) : await axios.put(url, partFormData, options);
            if (!isUpdate) {
                setGeneralData({
                    ...generalData,
                    parts: [...generalData.parts, response.data]
                })
            } else {
                const filteredParts = generalData.parts.filter((item) => item.id !== part.id);
                setGeneralData({
                    ...generalData,
                    parts: [...filteredParts, response.data]
                })
            }
            setShowPartCreationForm(false);
            setSearchTerm("")
            setPart({name: "", description: ""})
        } catch (error: any) {
            console.log(error.response.data);
        } finally {
            setIsLoading(false);
        }
    }
    const handlePartCancellation = () => {
        setShowPartCreationForm(false);
        setIsSelected(true);
    }
    const handleSearchPartInputChange = (name: string, value: string) => {
        setSearchTerm(value);
        if (part.name !== value) {
            setPart({name: "", description: ""})
        }
    }

    const selectPart = (name: string, id: string) => {
        setSearchTerm(name)
        const part = generalData.parts.find((part) => part.id?.toString() === id)
        if (part) {
            setPart(part);
        }
        setIsSelected(true);
    }
    const handlePartDeletion = async () => {
        setIsLoading(true)
        try {
            const url = `${API}maintenance/parts/${part.id}/`
            await axios.delete(url, options)
            const filteredParts = generalData.parts.filter((item) => item.id !== part.id)
            setGeneralData({
                ...generalData,
                parts: filteredParts,
            })
            setShowDeleteFeatures(false)
            setPart({name: "", description: ""})
            setPartFormData({name: "", description: ""})
            setSearchTerm("");
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }
    const handlePartLongPress = (part: PartType) => {
        if (!showDeleteFeatures) {
            setShowDeleteFeatures(true);
            setPart(part);
        } else {
            setShowDeleteFeatures(false);
            setPart({name: "", description: ""})
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {isLoading ?
                    <View className={"w-full justify-center items-center h-full px-4"}><Spinner isVisible={isLoading}/></View> :
                    showPartCreationForm ?
                        <PartForm part={partFormData}
                                  handlePartInputChange={handlePartInputChange}
                                  handlePartSubmission={handlePartSubmission}
                                  handlePartCancellation={handlePartCancellation}
                                  subtitle={subtitle}
                        />
                        :
                        <View className={"w-full justify-center items-center"}>
                            <View className={"w-[94%] bg-white rounded p-5"}>
                                <View className={"gap-2"}>
                                    <Text className={"font-semibold text-base text-txt"}>Part's list</Text>
                                    <Text className={"font-open-sans text-txt text-sm"}>Start typing to find auto
                                        part.</Text>
                                </View>
                                <View className={"flex-1"}>
                                    <AutoPartInput parts={generalData.parts}
                                                   handlePartInputChange={handleSearchPartInputChange}
                                                   searchTerm={searchTerm}
                                                   selectPart={selectPart}
                                                   isPartSelected={isSelected}
                                                   setIsPartSelected={setIsPartSelected}
                                    />
                                    {
                                        part.name ? <Pressable onPress={() => handleEditPart(part)}
                                                               onLongPress={() => handlePartLongPress(part)}>
                                            <View
                                                className={`flex-row p-[16px] bg-white rounded shadow mt-3 ${showDeleteFeatures ? "shadow-error" : ""}`}>
                                                <View className={"flex-1"}>
                                                    <ListItemDetail label={"Part name"} value={part.name}
                                                                    textStyle={"text-txt"}/>
                                                    <ListItemDetail label={"Description"} value={part.description}
                                                                    textStyle={"text-txt"}/>
                                                </View>
                                            </View>
                                        </Pressable> : <></>
                                    }
                                </View>
                                <View className={"w-full pt-5"}>
                                    <ThemedButton title={"Add part"}
                                                  handlePress={handlePartCreation}
                                                  containerStyles={"bg-primary p-5 rounded"}
                                                  textStyles={"font-semibold text-base text-white"}
                                    />
                                    {showDeleteFeatures && <ThemedButton title={"Delete Part"}
                                                                         handlePress={handlePartDeletion}
                                                                         containerStyles={"bg-error p-5 rounded mt-3"}
                                                                         textStyles={"font-semibold text-base text-white"}
                                    />
                                    }
                                    <ThemedButton title={"Cancel"}
                                                  handlePress={handleCancelPartCreation}
                                                  containerStyles={"bg-default p-5 rounded mt-3"}
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
