import React from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import {Tabs} from "expo-router";
import {icons} from "@/constants/icons"

interface TabIconProps {
    icon: ImageSourcePropType | undefined,
    color: string,
    name: string,
    focused: boolean,
}

const TabIcon = ({icon, color, name, focused}: TabIconProps) => {
    return (
        <View className="items-center justify-center gap-1">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
            <Text className={`${focused ? 'font-merriweather-bold' : 'font-merriweather-regular'} text-xs`}>
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
    const tabsInfo: [string, ImageSourcePropType | undefined][] = [["dashboard", icons.dashboard], ["fleet", icons.fleet], ["drivers", icons.drivers], ["routes", icons.routes], ["settings", icons.settings]]
    return (
        <>
            <Tabs screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#9c27b0",
                tabBarInactiveTintColor: "#CDCDE0",
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 1,
                    borderTopColor: "#f1f2ee",
                    height: 114,
                }
            }}>
                {tabsInfo.map(([name, icon], idx) => {
                    return (
                        <Tabs.Screen key={idx} name={name} options={{
                            title: name,
                            headerShown: false,
                            tabBarIcon: ({color, focused}) => (
                                <TabIcon icon={icon} color={color} name={name} focused={focused}/>
                            )
                        }}
                        />
                    )
                })}
            </Tabs>
        </>
    );
};

export default TabsLayout;
