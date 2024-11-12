import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatResponse from './ChatResponse';
import { ChatEntry } from '../../queries/interfaces';
import { ConfigProvider } from 'antd';

// Mock ReactMarkdown component
jest.mock('react-markdown', () => {
  return ({ children }: { children: string }) => <div>{children}</div>;
});

describe('ChatResponse', () => {
  const messages: ChatEntry[] = [
    { body: 'User inputted value', sender: 'user', date: new Date() },
    { body: 'Server response', sender: 'bot', date: new Date() },
  ];

  const customRender = (ui: React.ReactElement) => {
    return render(
      <ConfigProvider>
        {ui}
      </ConfigProvider>
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