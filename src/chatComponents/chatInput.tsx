import React, { useState } from 'react';
import { Input, Button, Space } from 'antd';
import './chatComponent.styles.css';

const { TextArea } = Input;

interface ChatInputProps {
  handleUserInput: (val: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ handleUserInput }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [showSubmit, setShowSubmit] = useState<boolean>(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserInput(inputValue);
      setInputValue('');
    }
  };

  const handleSubmit = () => {
    handleUserInput(inputValue);
    setInputValue('');
  };

  return (
    <div
      className="textInputWrapper"
      onMouseEnter={() => setShowSubmit(true)}
      onMouseLeave={() => setShowSubmit(false)}
    >
      <Space.Compact style={{ width: '100%' }}>
        <TextArea
          rows={1}
          autoSize={{ minRows: 1, maxRows: 4 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Want to know the answer to life, the universe, and everything?"
          onKeyDown={handleKeyPress}
          onFocus={() => setShowSubmit(true)}
          onBlur={() => setShowSubmit(false)}
          className="textInput"
        />
        {showSubmit && (
          <Button
            type="default"
            onClick={handleSubmit}
            className="submitButton"
            size="large"
          >
            Submit
          </Button>
        )}
      </Space.Compact>
    </div>
  );
};

export default ChatInput;