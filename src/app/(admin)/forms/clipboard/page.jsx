import { Col, Container, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllClipboards from './components/AllClipboards';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Clipboard'
};
const Clipboard = () => {
  return <>
      <PageTItle title="CLIPBOARD" />
      <Container>
        <Row>
          <Col xl={9}>
            <AllClipboards />
          </Col>
          <Col xl={3}>
            <UIExamplesList examples={[{
            link: '#copy-from-element',
            label: 'Copy text from another element'
          }, {
            link: '#cut-from-element',
            label: 'Cut text from another element'
          }, {
            link: '#copy-from-attribute',
            label: 'Copy text from attribute'
          }]} />
          </Col>
        </Row>
      </Container>
    </>;
};
export default Clipboard;