import { Col, Container, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllScatterCharts from './components/AllScatterCharts';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Scatter Charts'
};
const ScatterCharts = () => {
  return <>
      <PageTItle title="SCATTER CHARTS" />
      <Container>
        <Row>
          <Col xl={9}>
            <AllScatterCharts />
          </Col>
          <Col xl={3}>
            <UIExamplesList examples={[{
            link: '#basic',
            label: 'Scatter (XY) Chart'
          }, {
            link: '#datetime',
            label: 'Scatter Chart - Datetime'
          }, {
            link: '#images',
            label: 'Scatter - Images'
          }]} />
          </Col>
        </Row>
      </Container>
    </>;
};
export default ScatterCharts;