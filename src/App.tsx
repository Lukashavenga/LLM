import { useState } from 'react';
import './App.css';
import { ConfigProvider, Card } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';
import ChatResponse from './chatComponents/ChatResponse';
import ChatInput from './chatComponents/chatInput';
import ChatMenu from './chatComponents/chatMenu';
import { darkTheme } from './themeConfig';

const queryClient = new QueryClient();

function App() {
  const [userInput, setUserInput] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);

  const handleUserInput = (value: string) => {
    setUserInput(value);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleNewMessage = (message: string) => {
    setMessages(prev => [...prev, message]);
  }

  const handleToggleAutoScroll = () => {
    setAutoScrollEnabled(!autoScrollEnabled);
  };

  return (
    <ConfigProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <div className="contentContainer">
          <h1>Chatbot Demo</h1>
          <Card className="chatCard">
            <ChatMenu
              onClearChat={handleClearChat}
              onToggleAutoScroll={handleToggleAutoScroll}
              autoScrollEnabled={autoScrollEnabled}
            />
            <ChatResponse
            autoScrollEnabled={autoScrollEnabled}
            userInput={userInput}
            messages={messages}
            handleNewMessage={handleNewMessage}
            />
            <ChatInput
            handleUserInput={handleUserInput}
            />
          </Card>
        </div>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;