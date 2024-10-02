import React, {useEffect, useState} from 'react';
import {ImageSourcePropType, Pressable, Text, View} from 'react-native';
import ThemedInputText from "@/components/ThemedInputText";
import {PartType} from "@/types/maintenance";

interface AutoPartInputProps {
    parts: PartType[]
    handlePartInputChange: (name: string, value: string) => void
    searchTerm: string
    selectPart: (name: string, value: string) => void
    isPartSelected: boolean
    setIsPartSelected: (value: boolean) => void
    icon?: ImageSourcePropType
}


const AutoPartInput = ({handlePartInputChange, parts, searchTerm, selectPart, isPartSelected, setIsPartSelected, icon}: AutoPartInputProps) => {
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
            const suggestions = getSuggestions(searchTerm);
            setSuggestions(suggestions);
            setShowSuggestions(suggestions.length > 0);
        }
    }, [searchTerm]);
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
    parts.forEach(item => addWord(item.name, item.id.toString()));

    return (
        <View className={"flex-1"}>
            <ThemedInputText placeholder={"Find part"}
                             value={searchTerm}
                             onChange={handlePartInputChange}
                             name={'part'}
                             containerStyles={"bg-background p-5"}
                             icon={icon}
            />
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
