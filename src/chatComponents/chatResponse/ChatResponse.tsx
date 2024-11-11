import React, { useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Card } from 'antd';
import ReactMarkdown from 'react-markdown';
import { fetchChatStreamResponse } from '../../queries/queries';
import type { ChatEntry, ChatResponse } from '../../queries/interfaces';
import { parseMarkdown } from '../chatComponents.util';
import '../chatComponents.styles.css';

const ChatResponse = ({
    userInput,
    messages,
    handleNewMessage,
    autoScrollEnabled,
}: {
    userInput: string,
    messages: ChatEntry[],
    handleNewMessage: (message: string, sender: 'bot' | 'user') => void,
    autoScrollEnabled: boolean,
}) => {
  const queryClient = useQueryClient();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleStream = (data: ChatResponse) => {
    if (data.status === 'data' && typeof data.data === 'string') {
        handleNewMessage(parseMarkdown(data.data as string), 'bot');
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
        <div key={index} className={`chatMessage ${message.sender}`}>
            <ReactMarkdown>{message.body}</ReactMarkdown>
        </div>
        ))}
      <div ref={scrollRef} />
    </Card>
  );
};

export default ChatResponse;