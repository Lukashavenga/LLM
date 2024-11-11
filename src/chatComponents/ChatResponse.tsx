import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Card } from 'antd';
import ReactMarkdown from 'react-markdown';
import { fetchChatStreamResponse } from '../queries/queries';
import type { ChatResponse } from '../queries/interfaces';
import { parseMarkdown } from './chatComponents.util';
import './chatComponent.styles.css';

const ChatResponse = ({ userInput }: { userInput: string }) => {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleStream = (data: ChatResponse) => {
    if (data.status === 'data' && typeof data.data === 'string') {
      setMessages(prev => [...prev, parseMarkdown(data.data as string)]);
    }
  };

  const handleComplete = () => {
    queryClient.invalidateQueries(['chatStream', { userInput }]);
  };

  useQuery({
    queryKey: ['chatStream', { userInput }],
    queryFn: () => new Promise<void>((resolve, reject) => {
      fetchChatStreamResponse({
        handleStream,
        handleError: reject,
        handleComplete: resolve
      });
    }),
    enabled: !!userInput,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Card className="chatResponse">
      {messages.map((message, index) => (
        <ReactMarkdown key={index}>
          {message}
        </ReactMarkdown>
      ))}
      <div ref={scrollRef} />
    </Card>
  );
};

export default ChatResponse;