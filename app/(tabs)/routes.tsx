import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Routes = () => {
    return (
        <View style={styles.container}>
            <Text>Routes</Text>
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

export default Routes;
