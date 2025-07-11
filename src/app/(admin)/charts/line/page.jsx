import { Col, Container, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllLineCharts from './components/AllLineCharts';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Line Charts'
};
const LineCharts = () => {
  return <>
      <PageTItle title="LINE CHARTS" />
      <Container>
        <Row>
          <Col xl={9}>
            <AllLineCharts />
          </Col>
          <Col xl={3}>
            <UIExamplesList examples={[{
            link: '#simple',
            label: 'Simple line chart'
          }, {
            link: '#datalabel',
            label: 'Line with Data Labels'
          }, {
            link: '#zoomable',
            label: 'Zoomable Timeseries'
          }, {
            link: '#annotations',
            label: 'Line Chart with Annotations'
          }, {
            link: '#syncing',
            label: 'Syncing charts'
          }, {
            link: '#gradient',
            label: 'Gradient Line Chart'
          }, {
            link: '#missing',
            label: 'Missing / Null values'
          }, {
            link: '#dashed',
            label: 'Dashed Line Chart'
          }, {
            link: '#stepline',
            label: 'Stepline Chart'
          }, {
            link: '#brush',
            label: 'Brush Chart'
          }]} />
          </Col>
        </Row>
      </Container>
    </>;
};
export default LineCharts;