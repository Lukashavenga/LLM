import React, { useState,KeyboardEvent } from 'react';
import { Input, Button, Space } from 'antd';
import '../chatComponents.styles.css';

const { TextArea } = Input;

interface ChatInputProps {
  handleUserInput: (val: string) => void;
}

const ChatInput= ({ handleUserInput }:ChatInputProps) => {

  const [inputValue, setInputValue] = useState<string>('');
  const [showSubmit, setShowSubmit] = useState<boolean>(false);

  // Take controlled component value, sent to parent, and reset
  const handleSubmit = () => {
    handleUserInput(inputValue);
    setInputValue('');
  };

  // Allow for submit on Enter
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className="textInputWrapper"
      onMouseEnter={() => setShowSubmit(true)}
      onMouseLeave={() => setShowSubmit(false)}
    >
      <Space.Compact style={{ width: '100%' }}>
        <TextArea
          value={inputValue}
          className="textInput"
          data-testid="chatInput"
          onKeyDown={handleKeyPress}
          autoSize={{ minRows: 1, maxRows: 4 }}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Want to know the answer to life, the universe, and everything?"
        />
        {showSubmit && (
          <Button
            size="large"
            type="default"
            onClick={handleSubmit}
            className="submitButton"
            data-testid="submitButton"
          >
            Submit
          </Button>
        )}
      </Space.Compact>
    </div>
  );
};

export default ChatInput;