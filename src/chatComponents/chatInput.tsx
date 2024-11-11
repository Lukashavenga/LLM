import React from 'react';
import { Textarea } from "@nextui-org/react";

interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

export const ChatInput = ({
    value, onChange, onSubmit,
}: ChatInputProps) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="w-full">
            <Textarea
                minRows={1}
                maxRows={4}
                value={value}
                label="User Input"
                className="textInput"
                onValueChange={onChange}
                placeholder="Want to know the answer to life, the universe, and everything?"
            />
        </div>
    );
};