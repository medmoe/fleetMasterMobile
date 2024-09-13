import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import ListItemDetail from "@/components/ListItemDetail";
import ThemedButton from "@/components/ThemedButton";
import {icons} from "@/constants/icons";

interface ItemDetailViewerProps {
    title: string
    subtitle: string
    details: { label: string, value: string }[]
    handleUpdate: () => void
    handleDelete: () => void
    handleCancel: () => void
}

const ItemDetailViewer = ({title, subtitle, details, handleUpdate, handleDelete, handleCancel}: ItemDetailViewerProps) => {
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
                        {details.map(({label, value}, idx) => <ListItemDetail label={label} value={value} containerStyle={"pt-1 pb-1"} key={idx}/>)}
                    </View>
                    <View className={"flex-row mt-3"}>
                        <ThemedButton title={"Edit"} handlePress={handleUpdate} containerStyles={"bg-primary p-5 rounded-[50%] flex-1"} textStyles={"text-white font-semibold text-base"}
                                      icon={icons.pen}/>
                        <ThemedButton title={"Delete"} handlePress={handleDelete} containerStyles={"bg-error p-5 rounded-[50%] flex-1"} textStyles={"text-white font-semibold text-base"}
                                      icon={icons.trash}/>
                        <ThemedButton title={"Cancel"} handlePress={handleCancel} containerStyles={"bg-default p-5 rounded-[50%] flex-1"} textStyles={"text-white font-semibold text-base"}/>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ItemDetailViewer;
