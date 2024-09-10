import React from 'react';
import {Stack} from "expo-router";

const DetailsLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="driver" options={{headerShown: false}}/>
            <Stack.Screen name="vehicle" options={{headerShown: false}} />
            <Stack.Screen name="item-details" options={{headerShown: false}} />
        </Stack>
    )
};

export default DetailsLayout;
