import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

const Driver = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View className={"w-full justify-center items-center"}>
                    <View className={"w-[94%] bg-white rounded p-5"}>
                        <View className={"gap-2"}>
                            <Text className={"font-semibold text-txt text-base"}>Driver Form</Text>
                            <Text className={"font-open-sans text-txt text-sm"}>Fill in driver's details below.</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Driver;
