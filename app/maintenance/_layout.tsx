import React from 'react';
import {Stack} from "expo-router";

const MaintenanceLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="maintenance-report" options={{headerShown: false}}/>
        </Stack>
    );
};
export default MaintenanceLayout;
