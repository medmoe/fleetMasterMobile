import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import ThemedInputText from "@/components/ThemedInputText";

interface AutoPartInputProps {
    parts: { id: string, name: string }[]
    handlePartInputChange: (name: string, value: string) => void
    inputValue: {id: string, name:string}
    selectPart: (name: string, value: string) => void
    isPartSelected: boolean
    setIsPartSelected: (value: boolean) => void
}


const AutoPartInput = ({handlePartInputChange, parts, inputValue, selectPart, isPartSelected, setIsPartSelected}: AutoPartInputProps) => {
    const [suggestions, setSuggestions] = useState<{ id: string, name: string }[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false);
    const getSuggestions = (prefix: string): { id: string, name: string }[] => {
        if (!prefix) {
            return [];
        }
        let currentNode = trie;
        for (let i = 0; i < prefix.length; i++) {
            const char = prefix[i];
            if (!currentNode[char]) {
                return []
            }
            currentNode = currentNode[char];
        }
        const suggestions: { id: string, name: string }[] = [];
        const collectWords = (node: any, prefix: string) => {
            if (node["$"]) {
                suggestions.push({id: node["$"].id, name: prefix});
            }
            for (const char in node) {
                if (char !== "$") {
                    collectWords(node[char], prefix + char);
                }
            }
        };
        collectWords(currentNode, prefix);
        return suggestions;
    }
    useEffect(() => {
        if (isPartSelected) {
            setShowSuggestions(false);
            setIsPartSelected(false);
        } else {
            const suggestions = getSuggestions(inputValue.name);
            setSuggestions(suggestions);
            setShowSuggestions(suggestions.length > 0);
        }
    }, [inputValue]);
    const trie: { [key: string]: {} } = {};
    const addWord = (word: string, id: string) => {
        let currentNode = trie;
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!currentNode[char]) {
                currentNode[char] = {};
            }
            currentNode = currentNode[char]
        }
        currentNode['$'] = {id, exists: true}
    }
    parts.forEach(item => addWord(item.name, item.id));

    return (
        <View>
            <ThemedInputText placeholder={"Enter part"} value={inputValue.name} onChange={handlePartInputChange} name={'part'} containerStyles={"bg-background p-5"}/>
            {showSuggestions && suggestions.map((part, idx) => {
                return (
                    <Pressable key={idx} className={"bg-white rounded shadow p-4 m-2"} onPress={() => selectPart(part.name, part.id)}>
                        <Text>{part.name}</Text>
                    </Pressable>
                )
            })}
        </View>
    );
};

export default AutoPartInput;
