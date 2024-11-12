import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ChatResponse from './ChatResponse';
import { ChatEntry } from '../../queries/interfaces';
import { ConfigProvider } from 'antd';

const queryClient = new QueryClient();

// Mock ReactMarkdown component
jest.mock('react-markdown', () => {
  return ({ children }: { children: string }) => <div>{children}</div>;
});

window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('ChatResponse', () => {
  const messages: ChatEntry[] = [
    { body: 'User inputted value', sender: 'user', date: new Date() },
    { body: 'Server response', sender: 'bot', date: new Date() },
  ];

  const customRender = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          {ui}
        </ConfigProvider>
      </QueryClientProvider>
    );
  };

  test('renders messages correctly', () => {
    customRender(
      <ChatResponse
        userInput=""
        messages={messages}
        handleNewMessage={jest.fn()}
        autoScrollEnabled={true}
      />
    );

    expect(screen.getByText('User inputted value')).toBeInTheDocument();
    expect(screen.getByText('Server response')).toBeInTheDocument();
  });
});