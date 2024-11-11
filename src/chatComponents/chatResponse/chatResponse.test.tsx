import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatResponse from './ChatResponse';
import { ChatEntry } from '../../queries/interfaces';

describe('ChatResponse', () => {
  const messages: ChatEntry[] = [
    { body: 'Hello, world!', sender: 'user', date: new Date() },
    { body: 'Hi there!', sender: 'bot', date: new Date() },
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

    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  test('auto-scrolls to the bottom when autoScrollEnabled is true', () => {
    const { container } = render(
      <ChatResponse
        userInput=""
        messages={messages}
        handleNewMessage={jest.fn()}
        autoScrollEnabled={true}
      />
    );

    const scrollRef = container.querySelector('.chatResponse div:last-child');
    expect(scrollRef).toBeInTheDocument();
    expect(scrollRef).toHaveStyle('scroll-behavior: smooth');
  });

  test('does not auto-scroll to the bottom when autoScrollEnabled is false', () => {
    const { container } = render(
      <ChatResponse
        userInput=""
        messages={messages}
        handleNewMessage={jest.fn()}
        autoScrollEnabled={false}
      />
    );

    const scrollRef = container.querySelector('.chatResponse div:last-child');
    expect(scrollRef).toBeInTheDocument();
    expect(scrollRef).not.toHaveStyle('scroll-behavior: smooth');
  });
});