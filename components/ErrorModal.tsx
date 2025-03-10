import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';

interface ErrorModalProps {
    isVisible: boolean
    errorMessage: string
    onRetry: () => void
    onDismiss: () => void
}

const ErrorModal = ({
                        isVisible, errorMessage, onRetry, onDismiss
                    }: ErrorModalProps) => {
    return (
        <Modal visible={isVisible} transparent={true} animationType={"fade"} onRequestClose={onDismiss}>
            <View className={"flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]"}>
                <View className={"w-[80%] p-5 bg-white rounded items-center"}>
                    <Text className={"text-lg text-red-500 text-center mb-5"}>{errorMessage}</Text>
                    <View className={"flex flex-row justify-between w-full"}>
                        <Pressable onPress={onRetry} className={"flex-1 p-2.5 bg-blue-500 rounded items-center mx-1.5"}>
                            <Text className={"text-white text-base font-semibold"}>Retry</Text>
                        </Pressable>
                        <Pressable onPress={onDismiss} className={"flex-1 p-2.5 bg-gray-600 rounded items-center mx-1.5"}>
                            <Text className={"text-white text-base font-semibold"}>Dismiss</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ErrorModal;