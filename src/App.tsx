import { useState } from 'react';
import './App.css';
import { ConfigProvider, Card } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';
import ChatResponse from './chatComponents/chatResponse/ChatResponse';
import ChatInput from './chatComponents/chatInput/ChatInput';
import ChatMenu from './chatComponents/chatMenu/ChatMenu';
import { darkTheme } from './themeConfig';
import { ChatEntry } from './queries/interfaces';

const queryClient = new QueryClient();

function App() {
  const [userInput, setUserInput] = useState<string>('');
  const [messages, setMessages] = useState<ChatEntry[]>([]);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);

  const handleUserInput = (value: string) => {
    setUserInput(value);
    handleNewMessage(value, 'user');
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleNewMessage = (message: string, sender: 'user' | 'bot') => {
    const newMessage: ChatEntry = {
      body: message,
      sender,
      date: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
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