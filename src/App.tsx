import { useState } from 'react';
import './App.css';
import { ConfigProvider, Card } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';
import ChatResponse from './chatComponents/ChatResponse';
import ChatInput from './chatComponents/chatInput';
import { darkTheme } from './themeConfig';

const queryClient = new QueryClient();

function App() {
  const [userInput, setUserInput] = useState<string>('');

  const handleUserInput = (value: string) => {
    setUserInput(value);
  };

  return (
    <ConfigProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <div className="contentContainer">
          <h1>Chatbot Demo</h1>
          <Card className="chatCard">
            <ChatResponse userInput={userInput} />
            <ChatInput handleUserInput={handleUserInput} />
          </Card>
        </div>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;