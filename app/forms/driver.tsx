import React from 'react';
import {SafeAreaView, ScrollView, Text, View, Image} from 'react-native';
import ThemedInputText from "@/components/ThemedInputText";
import {icons} from "@/constants/icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const Driver = () => {
    const handleChange = () => {

    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View className={"w-full justify-center items-center"}>
                    <View className={"w-[94%] bg-white rounded p-5"}>
                        <View className={"gap-2"}>
                            <Text className={"font-semibold text-txt text-base"}>Driver Form</Text>
                            <Text className={"font-open-sans text-txt text-sm"}>Fill in driver's details below.</Text>
                        </View>
                        <View className={"mt-[25px]"}>
                            <ThemedInputText containerStyles={"bg-background p-5"} placeholder={"First name"} value={""} onChange={handleChange}
                                             name={"firstName"}/>
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"} placeholder={"Last name"} value={""} onChange={handleChange}
                                             name={"lastName"}/>
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"} placeholder={"Email"} value={""} onChange={handleChange}
                                             name={"email"} icon={icons.mail}/>
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"} placeholder={"Phone number"} value={""}
                                             onChange={handleChange}
                                             name={"phoneNumber"} icon={icons.phone}/>
                            <ThemedInputText containerStyles={"bg-background p-5 mt-3"} placeholder={"Licence number"} value={""}
                                             onChange={handleChange} name={"licenceNumber"}/>
                            <View className={"justify-center p-4"}>
                                <Text className={"text-txt font-open-sans text-sm"}>Licence expiry date</Text>
                                <View className={"mt-3 justify-start items-center flex-row"}>
                                    <Image source={icons.calendar} resizeMode={"contain"} className={"w-[25px] h-[25px] mr-[5px]"}/>
                                    <DateTimePicker value={new Date()} mode={"date"} display={"default"} onChange={handleChange}/>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Driver;
