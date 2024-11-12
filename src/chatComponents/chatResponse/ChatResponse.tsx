import React, { useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Card } from 'antd';
import ReactMarkdown from 'react-markdown';
import { fetchChatStreamResponse } from '../../queries/queries';
import type { ChatEntry, ChatResponse } from '../../queries/interfaces';
import { parseMarkdown } from '../chatComponents.util';
import '../chatComponents.styles.css';

interface ChatResponseProps {
  userInput: string;
  messages: ChatEntry[];
  autoScrollEnabled: boolean;
  handleNewMessage: (message: string, sender: 'bot' | 'user') => void;
}

const ChatResponse = ({
  userInput, messages,
  autoScrollEnabled,
  handleNewMessage,
}: ChatResponseProps) => {
  
    const queryClient = useQueryClient();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleStream = (data: ChatResponse) => {
    if (data.status === 'data' && typeof data.data === 'string') {
      // Parse markdown and send to parent
      const parsedMessage = parseMarkdown(data.data);
      handleNewMessage(parsedMessage, 'bot');
    }
  };

  const handleComplete = () => {
    queryClient.invalidateQueries(['chatStream', { userInput }]);
  };

  useQuery({
    queryKey: ['chatStream', { userInput }],
    queryFn: () => new Promise<void>((_, reject) => {
      fetchChatStreamResponse({
        handleStream,
        handleError: reject,
        handleComplete: handleComplete
      });
    }),
    enabled: !!userInput,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    // Scroll to bottom of chat on new message unless auto scroll is disabled by menu icon click
    if (scrollRef.current && autoScrollEnabled) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Card className="chatResponse">
      {messages.map((message, index) => (
        <div key={index} className={`chatMessage ${message.sender}`}>
            <ReactMarkdown>{message.body}</ReactMarkdown>
        </div>
        ))}
      <div ref={scrollRef} />
    </Card>
  );
};

export default ChatResponse;