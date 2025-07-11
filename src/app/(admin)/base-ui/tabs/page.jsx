import AllNavTabs from './components/AllNavTabs';
import UIExamplesList from '@/components/UIExamplesList';
import { Col, Container, Row } from 'react-bootstrap';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Nav Tabs'
};
const Tabs = () => {
  return <>
      <PageTItle title="NAV TABS" />
      <Container>
        <Row>
          <Col xl={9}>
            <AllNavTabs />
          </Col>

          <Col xl={3}>
            <UIExamplesList examples={[{
            link: '#default',
            label: 'Nav Tabs'
          }, {
            link: '#tab-justify',
            label: 'Tabs Justify'
          }, {
            link: '#nav-pills',
            label: 'Nav Pills'
          }, {
            link: '#pills-justify',
            label: 'Pills Justified'
          }, {
            link: '#tab-vertical-left',
            label: 'Tabs Vertical Left'
          }, {
            link: '#tab-vertical-right',
            label: 'Tabs Vertical right'
          }]} />
          </Col>
        </Row>
      </Container>
    </>;
};
export default Tabs;