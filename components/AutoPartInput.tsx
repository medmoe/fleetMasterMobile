import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import ThemedInputText from "@/components/ThemedInputText";

interface AutoPartInputProps {
    handleSuggestionClick: () => void
    parts: string[]
}



const AutoPartInput = ({handleSuggestionClick, parts}: AutoPartInputProps) => {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false);
    const getSuggestions = (prefix: string): string[] => {
        if (!prefix){
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
        const suggestions: string[] = [];
        const collectWords = (node: any, prefix: string) => {
            if (node["$"]) {
                suggestions.push(prefix);
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
        const suggestions = getSuggestions(inputValue);
        setSuggestions(suggestions);
        setShowSuggestions(suggestions.length > 0);
    }, [inputValue]);
    const trie: {[key: string]: {}} = {};
    const addWord = (word: string) => {
        let currentNode = trie;
        for (let i = 0; i < word.length; i++){
            const char = word[i];
            if(!currentNode[char]) {
                currentNode[char] = {};
            }
            currentNode = currentNode[char]
        }
        currentNode['$'] = true
    }
    const searchWord = (word: string) => {
        let currentNode = trie;
        for (let i = 0; i < word.length; i++) {
            const char = word[i]
            if (!currentNode[char]) {
                return false
            }
            currentNode = currentNode[char];
        }
        return currentNode['$'] === true;
    }
    const handleChange = (name: string, value: string) => {
        setInputValue(value);
    }
    parts.forEach(part => addWord(part));

    return (
        <View>
            <ThemedInputText placeholder={"Enter part"} value={inputValue} onChange={handleChange} name={'part'} containerStyles={"bg-background p-5"}/>
            {showSuggestions && (
                <FlatList data={suggestions}
                          renderItem={({item}) => <Pressable onPress={handleSuggestionClick}><Text>{item}</Text></Pressable>}
                />
            )}
        </View>
    );
};

export default AutoPartInput;
