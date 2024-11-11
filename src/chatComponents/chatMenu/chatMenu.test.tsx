import React from 'react';
import { render } from '@testing-library/react';
import {screen, fireEvent} from '@testing-library/dom'
import ChatMenu from './ChatMenu';


describe('ChatMenu', () => {
    test('calls handleClearChat when Clear Chat button is clicked', () => {
      const handleClearChat = jest.fn();
      const handleToggleAutoScroll = jest.fn();
      render(
        <ChatMenu
            onClearChat={handleClearChat}
            onToggleAutoScroll={handleToggleAutoScroll}
            autoScrollEnabled={true}
        />
      );
  
      const clearChatButton = screen.getByText('Clear Chat');
      fireEvent.click(clearChatButton);
  
      expect(handleClearChat).toHaveBeenCalled();
    });
  
    test('calls handleToggleAutoScroll when Unlock Auto-Scroll button is clicked', () => {
      const handleClearChat = jest.fn();
      const handleToggleAutoScroll = jest.fn();
      render(
        <ChatMenu
            onClearChat={handleClearChat}
            onToggleAutoScroll={handleToggleAutoScroll}
            autoScrollEnabled={false}
        />
      );
  
      const toggleAutoScrollButton = screen.getByText('Unlock Auto-Scroll');
      fireEvent.click(toggleAutoScrollButton);
  
      expect(handleToggleAutoScroll).toHaveBeenCalled();
    });
  
    test('displays Lock Auto-Scroll when autoScrollEnabled is true', () => {
      const handleClearChat = jest.fn();
      const handleToggleAutoScroll = jest.fn();
      render(
        <ChatMenu
            onClearChat={handleClearChat}
            onToggleAutoScroll={handleToggleAutoScroll}
            autoScrollEnabled={true}
        />
      );
  
      expect(screen.getByText('Lock Auto-Scroll')).toBeInTheDocument();
    });
  
    test('displays Unlock Auto-Scroll when autoScrollEnabled is false', () => {
      const handleClearChat = jest.fn();
      const handleToggleAutoScroll = jest.fn();
      render(
        <ChatMenu
            onClearChat={handleClearChat}
            onToggleAutoScroll={handleToggleAutoScroll}
            autoScrollEnabled={false}
        />
      );
  
      expect(screen.getByText('Unlock Auto-Scroll')).toBeInTheDocument();
    });
  });