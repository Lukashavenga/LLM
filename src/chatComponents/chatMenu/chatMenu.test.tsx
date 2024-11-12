import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { theme } from 'antd';
import ChatMenu from './ChatMenu';

const customRender = (ui: React.ReactElement) => {
    return render(
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        {ui}
      </ConfigProvider>
    );
  };

describe('ChatMenu', () => {
  test('calls handleClearChat when Clear Chat button is clicked', async () => {
    const handleClearChat = jest.fn();
    const handleToggleAutoScroll = jest.fn();
    
    customRender(
      <ChatMenu
        onClearChat={handleClearChat}
        onToggleAutoScroll={handleToggleAutoScroll}
        autoScrollEnabled={true}
      />
    );

    const clearChatButton = screen.getByTestId('clearChat');
    
    await act(async () => {
      fireEvent.click(clearChatButton);
    });

    expect(handleClearChat).toHaveBeenCalled();
  });

  test('calls handleToggleAutoScroll when Unlock Auto-Scroll button is clicked', async () => {
    const handleClearChat = jest.fn();
    const handleToggleAutoScroll = jest.fn();
    
    customRender(
      <ChatMenu
        onClearChat={handleClearChat}
        onToggleAutoScroll={handleToggleAutoScroll}
        autoScrollEnabled={false}
      />
    );

    const toggleAutoScrollButton = screen.getByTestId('toggleAutoScroll');
    
    await act(async () => {
      fireEvent.click(toggleAutoScrollButton);
    });

    expect(handleToggleAutoScroll).toHaveBeenCalled();
  });
});
