import React from 'react';
import {Pressable, Text} from 'react-native';

interface RangeCardProps {
    title: string
    handlePress: (key: string) => void
    isActive?: boolean
}

const RangeCard = ({title, handlePress, isActive}: RangeCardProps) => {
    let pressableStyles;
    let textStyles;
    if (isActive) {
        pressableStyles = 'bg-primary-500 text-white rounded';
        textStyles = 'text-white bold';
    } else {
        pressableStyles = 'bg-white rounded border-2 border-default';
        textStyles = 'text-black bold';
    }
    return (
        <Pressable onPress={() => handlePress(title)} className={`p-3 m-2 ${pressableStyles}`}>
            <Text className={`${textStyles} font-bold`}>{title}</Text>
        </Pressable>
    )
}

export default RangeCard;

