import { Col, Container, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllColumnCharts from './components/AllColumnCharts';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Column Charts'
};
const ColumnCharts = () => {
  return <>
      <PageTItle title="COLUMN CHARTS" />
      <Container>
        <Row>
          <Col xl={9}>
            <AllColumnCharts />
          </Col>
          <Col xl={3}>
            <UIExamplesList examples={[{
            link: '#basic',
            label: 'Basic Column Chart'
          }, {
            link: '#datalabels',
            label: 'Column Chart with Datalabels'
          }, {
            link: '#stacked',
            label: 'Stacked Column Chart'
          }, {
            link: '#full-stacked',
            label: '100% Stacked Column Chart'
          }, {
            link: '#markers',
            label: 'Column with Markers'
          }, {
            link: '#group',
            label: 'Column with Group Label'
          }, {
            link: '#rotate-labels',
            label: 'Column Chart with rotated labels & Annotations'
          }, {
            link: '#negative-value',
            label: 'Column Chart with negative values'
          }, {
            link: '#distributed',
            label: 'Distributed Column Chart'
          }, {
            link: '#range',
            label: 'Range Column Chart'
          }, {
            link: '#dynamic',
            label: 'Dynamic Loaded Chart'
          }]} />
          </Col>
        </Row>
      </Container>
    </>;
};
export default ColumnCharts;