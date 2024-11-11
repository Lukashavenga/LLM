import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatResponse from './ChatResponse';
import { ChatEntry } from '../../queries/interfaces';

describe('ChatResponse', () => {
  const messages: ChatEntry[] = [
    { body: 'User inputted value', sender: 'user', date: new Date() },
    { body: 'Server response', sender: 'bot', date: new Date() },
  ];

  test('renders messages correctly', () => {
    render(
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