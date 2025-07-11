import { Col, Container, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllTreemapCharts from './components/AllTreemapCharts';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Treemap Charts'
};
const TreemapCharts = () => {
  return <>
      <PageTItle title="TREEMAP CHARTS" />
      <Container>
        <Row>
          <Col xl={9}>
            <AllTreemapCharts />
          </Col>
          <Col xl={3}>
            <UIExamplesList examples={[{
            link: '#basic',
            label: 'Basic'
          }, {
            link: '#multiple',
            label: 'Treemap Multiple Series'
          }, {
            link: '#distributed',
            label: 'Distributed Treemap'
          }, {
            link: '#color-range',
            label: 'Color Range Treemap'
          }]} />
          </Col>
        </Row>
      </Container>
    </>;
};
export default TreemapCharts;