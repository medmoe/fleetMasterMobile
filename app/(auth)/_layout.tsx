import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AuthLayout = () => {
    return (
        <View style={styles.container}>
            <Text>AuthLayout</Text>
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

export default AuthLayout;
