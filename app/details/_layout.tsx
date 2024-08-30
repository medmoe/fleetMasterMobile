import React from 'react';
import {Stack} from "expo-router";

const DetailsLayout = () => {
    return (
        <Stack>
            <Stack.Screen name={"driver"} options={{headerShown: false}} />
        </Stack>
    )
}