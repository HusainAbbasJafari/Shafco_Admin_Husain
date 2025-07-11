import { Col, Container, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllHeatmapCharts from './components/AllHeatmapCharts';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Heatmap Alert'
};
const HeatmapCharts = () => {
  return <>
      <PageTItle title="HEATMAP CHARTS" />
      <Container>
        <Row>
          <Col xl={9}>
            <AllHeatmapCharts />
          </Col>
          <Col xl={3}>
            <UIExamplesList examples={[{
            link: '#basic',
            label: 'Basic Heatmap - Single Series'
          }, {
            link: '#multiple-series',
            label: 'Heatmap - Multiple Series'
          }, {
            link: '#color-range',
            label: 'Heatmap - Color Range'
          }, {
            link: '#rounded',
            label: 'Heatmap - Range without Shades'
          }]} />
          </Col>
        </Row>
      </Container>
    </>;
};
export default HeatmapCharts;