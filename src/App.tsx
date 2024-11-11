import { useState } from 'react';
import './App.css';
import { Card, CardBody, Textarea } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ChatResponse from './chatComponents/ChatResponse';
import { ChatInput } from './chatComponents/chatInput';

const queryClient = new QueryClient()

function App() {
  const [userInput, setUserInput] = useState<string>('');
  
  const handleUserInput = (value: string) => {
    setUserInput(value);
  }

  const handleSubmit = () => {
    // Handle the chat submission here
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="contentContainer">
        <h1>Chatbot Demo</h1>
        <Card>
          <CardBody>
            <ChatResponse userInput={userInput} />
            <ChatInput
                value={userInput}
                onSubmit={handleSubmit}
                onChange={handleUserInput}
              />
          </CardBody>
        </Card>
      </div>
    </QueryClientProvider>
  )
}

export default App