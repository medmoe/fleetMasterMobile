import React from 'react';
import {Pressable} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

interface DeleteButtonProps {
    handleDeletion: () => void
}

const DeleteButton = ({handleDeletion}: DeleteButtonProps) => (
    <Pressable onPress={handleDeletion} className={"bg-error h-10 w-10 justify-center items-center rounded"}>
        <MaterialIcons name="delete" size={24} color="white"/>
    </Pressable>
);

export default DeleteButton;