import { Card, CardBody, CardTitle, Col, Container, Row } from 'react-bootstrap';
import PageTItle from '@/components/PageTItle';
import UIExamplesList from '@/components/UIExamplesList';
import AllToastify from './AllToastify';
export const metadata = {
  title: 'Toastify'
};
const Toastify = () => {
  return <>
      <PageTItle title="TOASTIFY" />
      <Container>
        <Row>
          <Col xl={9}>
            <Card>
              <CardBody>
                <CardTitle as={'h5'} className="mb-1 anchor" id="overview">
                  Overview
                  <a className="btn btn-sm btn-outline-success rounded
                -2 float-end" href="https://www.npmjs.com/package/react-toastify" target="_blank">
                    Official Website
                  </a>
                </CardTitle>
                <p className="text-muted mb-3">Better notification messages</p>
                <h5 className="mt-2">Usage</h5>
                <p className="mb-0">React Toastify&apos;s css needs to be imported when using the Toastify component</p>
              </CardBody>
            </Card>
            <AllToastify />
          </Col>
          <Col xl={3}>
            <UIExamplesList examples={[{
            link: '#overview',
            label: 'Overview'
          }, {
            link: '#basic',
            label: 'Basic'
          }, {
            link: '#display_position',
            label: 'Display Position Example'
          }, {
            link: '#rater',
            label: 'Offset, Close Button & Duration'
          }]} />
          </Col>
        </Row>
      </Container>
    </>;
};
export default Toastify;