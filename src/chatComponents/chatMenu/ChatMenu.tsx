import React from 'react';
import { Row, Col, Button } from 'antd';
import { ClearOutlined, UnlockOutlined, LockOutlined } from '@ant-design/icons';
import '../chatComponents.styles.css';

interface ChatMenuProps {
  onClearChat: () => void;
  autoScrollEnabled: boolean;
  onToggleAutoScroll: () => void;
}

const ChatMenu = ({
  onClearChat,
  autoScrollEnabled,
  onToggleAutoScroll,
}: ChatMenuProps) => {
  return (
    <div className="chatMenu">
      <Button 
        type="text"
        onClick={onClearChat}
        data-testid="clearChat"
        icon={<ClearOutlined />}
      />
      <Button
        type="text"
        onClick={onToggleAutoScroll}
        data-testid="toggleAutoScroll"
        icon={autoScrollEnabled ? <LockOutlined /> : <UnlockOutlined />}
      />
    </div>
  );
};

export default ChatMenu;