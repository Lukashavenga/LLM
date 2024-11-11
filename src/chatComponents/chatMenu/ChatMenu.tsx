import React from 'react';
import { Menu, Row, Col } from 'antd';
import { ClearOutlined, UnlockOutlined, LockOutlined } from '@ant-design/icons';
import '../chatComponents.styles.css';

interface ChatMenuProps {
  onClearChat: () => void;
  onToggleAutoScroll: () => void;
  autoScrollEnabled: boolean;
}

const ChatMenu = ({ onClearChat, onToggleAutoScroll, autoScrollEnabled }: ChatMenuProps) => {
  return (
    <Menu mode="horizontal" className="chatMenu">
      <Row justify="space-between" style={{ width: '100%' }}>
        <Col>
          <Menu.Item key="clearChat" onClick={onClearChat}>
            <ClearOutlined />
          </Menu.Item>
        </Col>
        <Col>
          <Menu.Item key="toggleAutoScroll" onClick={onToggleAutoScroll}>
            {autoScrollEnabled ? <LockOutlined /> : <UnlockOutlined />}
          </Menu.Item>
        </Col>
      </Row>
    </Menu>
  );
};

export default ChatMenu;