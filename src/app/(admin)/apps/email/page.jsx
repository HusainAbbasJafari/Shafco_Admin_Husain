import { Row } from 'react-bootstrap';
import EmailView from './components/EmailView';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Inbox'
};
const Email = () => {
  return <>
      <PageTItle title="INBOX" />
      <Row className="g-1 mb-3">
        <EmailView />
      </Row>
    </>;
};
export default Email;