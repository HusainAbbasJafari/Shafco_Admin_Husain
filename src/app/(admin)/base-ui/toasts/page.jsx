import UIExamplesList from '@/components/UIExamplesList';
import { Col, Container, Row } from 'react-bootstrap';
import AllToasts from './components/AllToasts';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Toasts'
};
const Toasts = () => {
  return <>
      <PageTItle title="TOASTS" />
      <Container>
        <Row>
          <Col xl={9}>
            <AllToasts />
          </Col>
          <Col xl={3}>
            <UIExamplesList examples={[{
            link: '#basic_examples',
            label: 'Basic Examples'
          }, {
            link: '#live_example',
            label: 'Live example'
          }, {
            link: '#default_buttons',
            label: 'Staking'
          }, {
            link: '#custom_content',
            label: 'Custom Content'
          }, {
            link: '#transcluent',
            label: 'Transcluent'
          }, {
            link: '#placement',
            label: 'Placement'
          }]} />
          </Col>
        </Row>
      </Container>
    </>;
};
export default Toasts;