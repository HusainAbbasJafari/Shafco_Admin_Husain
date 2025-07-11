import UIExamplesList from '@/components/UIExamplesList';
import AllCollapse from './components/AllCollapse';
import { Col, Container, Row } from 'react-bootstrap';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Collapse'
};
const Collapse = () => {
  return <>
      <PageTItle title="COLLAPSE" />
      <Container>
        <Row>
          <Col xl={9}>
            <AllCollapse />
          </Col>
          <Col xl={3}>
            <UIExamplesList examples={[{
            label: 'Default Example',
            link: '#default'
          }, {
            label: 'Horizontal Collapse',
            link: '#horizontal'
          }, {
            label: 'Multiple Targets',
            link: '#multiple-targets'
          }]} />
          </Col>
        </Row>
      </Container>
    </>;
};
export default Collapse;