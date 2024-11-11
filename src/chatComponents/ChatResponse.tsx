import React, { useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Card } from 'antd';
import ReactMarkdown from 'react-markdown';
import { fetchChatStreamResponse } from '../queries/queries';
import type { ChatResponse } from '../queries/interfaces';
import { parseMarkdown } from './chatComponents.util';
import './chatComponent.styles.css';

const ChatResponse = ({
    userInput,
    messages,
    handleNewMessage,
    autoScrollEnabled,
}: {
    userInput: string,
    messages: string[],
    handleNewMessage: (message: string) => void,
    autoScrollEnabled: boolean,
}) => {
  const queryClient = useQueryClient();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleStream = (data: ChatResponse) => {
    if (data.status === 'data' && typeof data.data === 'string') {
        handleNewMessage(parseMarkdown(data.data as string));
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
    if (scrollRef.current && autoScrollEnabled) {
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