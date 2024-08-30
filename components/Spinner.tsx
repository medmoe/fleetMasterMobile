import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const Spinner = ({isVisible = true}) => {
    if (!isVisible) return null;

    return (
        <View className={"flex-1 items-center justify-center"}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>
    );
};

export default Spinner;
