import React from 'react';
import {Stack} from "expo-router";

const DetailsLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="item-details" options={{headerShown: false}} />
            <Stack.Screen name="maintenance-reports-details" options={{headerShown: false}} />
        </Stack>
    )
};

export default DetailsLayout;
