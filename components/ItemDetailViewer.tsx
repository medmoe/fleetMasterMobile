import React from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import ListItemDetail from "@/components/ListItemDetail";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface ItemDetailViewerProps {
    title: string
    subtitle: string
    details: { label: string, value: string }[]
    handleUpdate: () => void
    handleDelete: () => void
    handleCancel: () => void
}

const ItemDetailViewer = ({
                              title,
                              subtitle,
                              details,
                              handleUpdate,
                              handleDelete,
                              handleCancel
                          }: ItemDetailViewerProps) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View className={"w-[94%] bg-white rounded p-5"}>
                    <View>
                        <Text className={"font-semibold text-base text-txt"}>{title}</Text>
                    </View>
                    <View className={"mt-5"}>
                        <Text className={"font-open-sans text-txt"}>{subtitle}</Text>
                    </View>
                    <View className={"flex-1 mt-3"}>
                        {details.map(({label, value}, idx) => <ListItemDetail label={label} value={value}
                                                                              containerStyle={"pt-1 pb-1"} key={idx}/>)}
                    </View>
                    <View className={"mt-5 flex-row justify-between"}>
                        <Pressable className={"items-center m-4 p-4"} onPress={handleUpdate}>
                            <FontAwesome name={"pencil"} size={39} color={"#ffa726"}/>
                            <Text className={"text-secondary-500 font-semibold text-base"}>Edit</Text>
                        </Pressable>
                        <Pressable className={"items-center m-4 p-4"} onPress={handleDelete}>
                            <FontAwesome name={"trash"} size={39} color={"#f76751"}/>
                            <Text className={"text-error-500 font-semibold text-base"}>Delete</Text>
                        </Pressable>
                        <Pressable className={"items-center m-4 p-4"} onPress={handleCancel}>
                            <FontAwesome name={"close"} size={39} color={"#9ba1a6"}/>
                            <Text className={"text-default font-semibold text-base"}>Cancel</Text>
                        </Pressable>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ItemDetailViewer;
