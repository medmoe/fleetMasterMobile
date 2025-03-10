import React, {useEffect} from 'react';
import {Animated, Pressable, StyleSheet, Text} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface ErrorNotificationBarProps {
    isVisible: boolean
    errorMessage: string
    onDismiss: () => void
}

const ErrorNotificationBar = ({isVisible, errorMessage, onDismiss}: ErrorNotificationBarProps) => {
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        if (isVisible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
            const timer = setTimeout(() => {
                onDismiss();
            }, 5000);
            return () => clearTimeout(timer);
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    }, [isVisible]);

    if (!isVisible) return null;
    return (
        <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
            <Pressable style={styles.content} onPress={onDismiss}>
                <FontAwesome name={"exclamation-triangle"} size={20} color={"red"} style={styles.icon}/>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
        container: {
            padding: 10,
            backgroundColor: "#fff",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "red",
            borderRadius: 10,
        },
        content: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        icon: {
            marginRight: 10,
        },
        errorMessage: {
            color: "red",
            fontSize: 14,
            fontWeight: "bold",
        }
    }
)

export default ErrorNotificationBar;