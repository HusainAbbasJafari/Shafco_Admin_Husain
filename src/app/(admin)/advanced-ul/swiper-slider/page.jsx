import { Card, CardBody, CardTitle, Col, Container, Row } from 'react-bootstrap';
import AllSwiper from './AllSwiper';
import UIExamplesList from '@/components/UIExamplesList';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Swiper'
};
const Swiper = () => {
  return <>
      <PageTItle title="SWIPER SLIDER" />
      <Container>
        <Row>
          <Col xl={9}>
            <Card>
              <CardBody>
                <CardTitle as={'h5'} className="mb-1 anchor" id="overview">
                  Overview
                  <a className="btn btn-sm btn-outline-success rounded-2 float-end" href="https://swiperjs.com/get-started" target="_blank">
                    Official Website
                  </a>
                </CardTitle>
                <p className="text-muted mb-3">Swiper is the most modern slider with hardware accelerated transitions and amazing native behavior.</p>
              </CardBody>
            </Card>
            <AllSwiper />
          </Col>
          <Col xl={3}>
            <UIExamplesList examples={[{
            link: '#overview',
            label: 'Overview'
          }, {
            link: '#default',
            label: 'Default Swiper'
          }, {
            link: '#navigation',
            label: 'Navigation & Pagination'
          }, {
            link: '#pagination-dynamic',
            label: 'Pagination Dynamic Swiper'
          }, {
            link: '#effect-fade',
            label: 'Effect Fade Swiper'
          }, {
            link: '#effect-creative',
            label: 'Effect Creative Swiper'
          }, {
            link: '#effect-flip',
            label: 'Effect Flip Swiper'
          }, {
            link: '#scrollbar',
            label: 'Scrollbar Swiper'
          }, {
            link: '#vertical',
            label: 'Vertical Swiper'
          }, {
            link: '#mousewheel',
            label: 'Mousewheel Control Swiper'
          }, {
            link: '#responsive',
            label: 'Responsive Breakpoints Swiper'
          }]} />
          </Col>
        </Row>
      </Container>
    </>;
};
export default Swiper;