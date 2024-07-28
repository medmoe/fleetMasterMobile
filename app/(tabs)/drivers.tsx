import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Drivers = () => {
    return (
        <View style={styles.container}>
            <Text>Drivers</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Drivers;
