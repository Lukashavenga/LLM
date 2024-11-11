import React from 'react';
import { Input } from 'antd';
import './chatComponent.styles.css';


interface ChatInputProps {
  handleUserInput: (val: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ handleUserInput }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserInput((e.target as HTMLTextAreaElement).value);
    }
  };

  return (
    <div className="textInputWrapper">
      <Input
        rows={1}
        autoSize={{ minRows: 1, maxRows: 4 }}
        placeholder="Want to know the answer to life, the universe, and everything?"
        onKeyDown={handleKeyPress}
        className="textInput"
      />
    </div>
  );
};

export default ChatInput;