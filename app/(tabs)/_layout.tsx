import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {Tabs} from "expo-router";
import {icons} from "@/constants/icons"
import FontAwesome from "@expo/vector-icons/FontAwesome";

const TabsLayout = () => {
    const tabsInfo: [string, ImageSourcePropType?][] = [
        ["dashboard", icons.dashboard],
        ["fleet", icons.fleet],
        ["drivers", icons.drivers],
        ["settings", icons.settings],
        ["notifications", icons.notifications]
    ]
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarActiveTintColor: "#9c27b0",
            tabBarInactiveTintColor: "#CDCDE0",
            tabBarStyle: {
                backgroundColor: "#fff",
                borderTopWidth: 1,
                borderTopColor: "#f1f2ee",
                height: 100,
            }
        }}>
            <Tabs.Screen name={"dashboard"} options={{
                tabBarIcon: ({color}) => <FontAwesome size={30} name={"dashboard"} color={color}/>
            }}
            />
            <Tabs.Screen name={"fleet"} options={{
                tabBarIcon: ({color}) => <FontAwesome size={30} name={"car"} color={color}/>
            }}
            />
            <Tabs.Screen name={"drivers"} options={{
                tabBarIcon: ({color}) => <FontAwesome size={30} name={"user"} color={color}/>
            }}
            />
            <Tabs.Screen name={"settings"} options={{
                tabBarIcon: ({color}) => <FontAwesome size={30} name={"cog"} color={color}/>
            }}
            />
            <Tabs.Screen name={"notifications"} options={{
                tabBarIcon: ({color}) => <FontAwesome size={30} name={"bell"} color={color}/>
            }}
            />
        </Tabs>
    );
};

export default TabsLayout;
