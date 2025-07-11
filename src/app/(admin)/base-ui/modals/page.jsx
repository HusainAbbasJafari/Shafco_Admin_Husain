import UIExamplesList from '@/components/UIExamplesList';
import AllModals from './components/AllModals';
import { Col, Container, Row } from 'react-bootstrap';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Modals'
};
const Modals = () => {
  return <>
      <PageTItle title="MODAL" />
      <Container>
        <Row>
          <Col xl={9}>
            <AllModals />
          </Col>

          <Col xl={3}>
            <UIExamplesList examples={[{
            link: '#default',
            label: 'Default Example'
          }, {
            link: '#static-backdrop',
            label: 'Static Backdrop'
          }, {
            link: '#scrolling-long-content',
            label: 'Scrolling Long Content'
          }, {
            link: '#toggle-between-modals',
            label: 'Toggle Between Modals'
          }, {
            link: '#optional-sizes',
            label: 'Optional Sizes'
          }, {
            link: '#fullscreen-modal',
            label: 'Fullscreen Modal'
          }, {
            link: '#modal-alerts',
            label: 'Modal Based Alerts'
          }]} />
          </Col>
        </Row>
      </Container>
    </>;
};
export default Modals;