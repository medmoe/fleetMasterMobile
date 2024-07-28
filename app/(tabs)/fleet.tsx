import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Fleet = () => {
    return (
        <View style={styles.container}>
            <Text>Fleet</Text>
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

export default Fleet;
