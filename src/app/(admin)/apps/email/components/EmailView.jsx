'use client';

import { Col, TabContainer } from 'react-bootstrap';
import ComposeEmailModal from './ComposeEmailModal';
import EmailNavigationMenu from './EmailNavigationMenu';
import EmailTabList from './EmailTabList';
import { EmailProvider } from '@/context/useEmailContext';
const EmailView = () => {
  return <EmailProvider>
      <TabContainer mountOnEnter defaultActiveKey="Inbox">
        <Col xxl={2}>
          <EmailNavigationMenu />
        </Col>
        <Col xxl={10}>
          <EmailTabList />

          <ComposeEmailModal />
        </Col>
      </TabContainer>
    </EmailProvider>;
};
export default EmailView;