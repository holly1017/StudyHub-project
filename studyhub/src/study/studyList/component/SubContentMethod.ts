import { useState, KeyboardEvent, ChangeEvent } from 'react';

export const useChipData = (chipsData: string[], setChipData: (chip:string[])=> void) => {
    // const [chipData, setChipData] = useState<string[]>(chipsData);
    const [inputValue, setInputValue] = useState<string>('');

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const chipRegex = /[!@#$%^&*(),.?":{}|<>Z~+=\\\[\]\/]/;
        if (event.key === 'Enter' && inputValue.trim() && !chipRegex.test(inputValue)) {
            setChipData([...chipsData, inputValue]);
            setInputValue('');
        }
    };

    const handleDelete = (chipToDelete: string) => {
        setChipData(chipsData.filter((chip) => chip !== chipToDelete));
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return { inputValue, handleKeyDown, handleDelete, handleInputChange };
};