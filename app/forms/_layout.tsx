import React from 'react';
import {Stack} from "expo-router";

const FormsLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="driver" options={{headerShown: false}}/>
            <Stack.Screen name="vehicle" options={{headerShown: false}}/>
            <Stack.Screen name="part-provider" options={{headerShown: false}} />
            <Stack.Screen name={"part"} options={{headerShown: false}} />
        </Stack>
    )
};

export default FormsLayout;
