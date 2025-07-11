import { Col, Container, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import AllPolarAreaCharts from './components/AllPolarAreaCharts';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Polar Area Charts'
};
const PolarAreaCharts = () => {
  return <>
      <PageTItle title="POLAR AREA CHARTS" />
      <Container>
        <Row>
          <Col xl={9}>
            <AllPolarAreaCharts />
          </Col>
          <Col xl={3}>
            <UIExamplesList examples={[{
            link: '#basic',
            label: 'Basic Polar Area Chart'
          }, {
            link: '#monochrome',
            label: 'Monochrome Polar Area'
          }]} />
          </Col>
        </Row>
      </Container>
    </>;
};
export default PolarAreaCharts;