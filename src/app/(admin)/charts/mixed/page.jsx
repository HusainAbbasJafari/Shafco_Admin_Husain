import { Col, Container, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllMixedCharts from './components/AllMixedCharts';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Mixed Charts'
};
const MixedCharts = () => {
  return <>
      <PageTItle title="MIXED CHARTS" />
      <Container>
        <Row>
          <Col xl={9}>
            <AllMixedCharts />
          </Col>
          <Col xl={3}>
            <UIExamplesList examples={[{
            link: '#line-column',
            label: 'Line & Column Chart'
          }, {
            link: '#multiple-yaxis',
            label: 'Multiple Y-Axis Chart'
          }, {
            link: '#line-area',
            label: 'Line & Area Chart'
          }, {
            link: '#all',
            label: 'Line, Column & Area Chart'
          }]} />
          </Col>
        </Row>
      </Container>
    </>;
};
export default MixedCharts;