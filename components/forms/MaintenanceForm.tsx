import React from 'react';
import {Text, View} from 'react-native';
import CustomPicker from "@/components/CustomPicker";
import ThemedButton from "@/components/ThemedButton";
import AutoPartInput from "@/components/AutoPartInput";


interface MaintenanceFormProps {

}


const MaintenanceForm = () => {
    const handleCreateProvider = () => {

    }
    const parts = [
    'Air Filter',
    'Battery',
    'Brake Pads',
    'Catalytic Converter',
    'Engine Oil',
    'Fuel Filter',
    'Headlights',
    'Muffler',
    'Oil Filter',
    'Radiator',
    'Spark Plugs',
    'Tire Pressure Sensor',
    'Transmission Fluid',
    'Wiper Blades',
  ]
    return (
        <View className={"w-full justify-center items-center"}>
            <View className={"w-[94%] bg-white rounded p-5"}>
                <View className={"gap-2"}>
                    <Text className={"font-semibold text-txt text-base"}>Maintenance Form</Text>
                    <Text className={"font-open-sans text-txt text-sm"}>Fill in vehicle's details below.</Text>
                </View>
                <View className={"border-2"}>
                    <Text className={"font-semibold text-txt text-sm"}>Part Purchase Form</Text>
                    <Text></Text>
                    <View>
                        <Text className={"text-txt text-sm font-open-sans"}>Pick a provider:</Text>
                        <CustomPicker name={"provider"} value={"value"} items={[{label: "one", value: "ONE"}, {label: "two", value: "TWO"}]} handleChange={() => console.log("hello")}/>
                        <ThemedButton title={"Create part provider"}
                                      handlePress={handleCreateProvider}
                                      containerStyles={"bg-secondary w-full p-5 rounded-[50%]"}
                                      textStyles={"text-white font-semibold text-base"}
                        />
                    </View>
                    <AutoPartInput handleSuggestionClick={() => console.log()} parts={parts} />
                </View>
            </View>
        </View>
    );
};

export default MaintenanceForm;
