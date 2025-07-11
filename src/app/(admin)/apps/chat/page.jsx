import { ChatProvider } from '@/context/useChatContext';
import React from 'react';
import { Row } from 'react-bootstrap';
import ChatApp from './components/ChatApp';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Cart'
};
const ChatPage = () => {
  return <>
      <PageTItle title="CHAT" />
      <Row className="g-1">
        <ChatProvider>
          <ChatApp />
        </ChatProvider>
      </Row>
    </>;
};
export default ChatPage;