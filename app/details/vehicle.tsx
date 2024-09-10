import React, {useState} from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import {Spinner} from "@/components";

const VehicleDetails = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    return (
        <SafeAreaView>
            <ScrollView>
                {isLoading ? <View className="w-full justify-center items-center h-full px-4"><Spinner isVisible={isLoading} /></View>:
                    <View className={"w-full justify-center items-center"}>
                        <View className={"w-[94%] bg-white rounded p-5"} >
                            <View></View>
                        </View>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default VehicleDetails;
