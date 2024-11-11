import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Spinner, Card, CardBody, ScrollShadow } from '@nextui-org/react';
import { fetchChatStreamResponse } from '../queries/queries';
import type { ChatResponse } from '../queries/interfaces';

const ChatResponse = ({ userInput }: { userInput: string }) => {
    const queryClient = useQueryClient();
    const [messages, setMessages] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleStream = (data: ChatResponse) => {
        if (data.status === 'data' && typeof data.data === 'string') {
            setMessages(prev => [...prev, data.data as string]);
        }
    };

    const handleError = (err: Error) => {
        setError(err.message);
    };

    const handleComplete = () => {
        queryClient.invalidateQueries(['chatStream', { userInput }]);
    };

    useQuery({
        queryKey: ['chatStream', { userInput }],
        queryFn: () => new Promise<void>((resolve, reject) => {
            fetchChatStreamResponse({
                handleStream,
                handleError: (err) => {
                    handleError(err);
                    reject(err);
                },
                handleComplete: () => {
                    handleComplete();
                    resolve();
                }
            });
        }),
        enabled: !!userInput,
        onError: handleError
    });

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    if (error) {
        return (
            <Card>
                <CardBody>
                    <p className="text-danger">{error}</p>
                </CardBody>
            </Card>
        );
    }

    if (messages.length === 0) {
        return (
            <Card>
                <CardBody>
                    <Spinner label="Loading chat response..." color="primary" />
                </CardBody>
            </Card>
        );
    }

    return (
        <Card>
            <CardBody>
                <ScrollShadow>
                    {messages.map((message, index) => (
                        <p key={index}>
                            {message}
                        </p>
                    ))}
                    <div ref={scrollRef} />
                </ScrollShadow>
            </CardBody>
        </Card>
    );
};

export default ChatResponse;