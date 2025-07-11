import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
const Step = () => {
  return <Row>
      <Col lg={12}>
        <Card className="bg-light-subtle">
          <CardBody>
            <Row>
              <Col lg={3}>
                <div className="d-flex align-items-center gap-3">
                  <div className="avatar bg-light d-flex align-items-center justify-content-center rounded">
                    <IconifyIcon icon="solar:kick-scooter-bold-duotone" className="fs-35 text-primary" />
                  </div>
                  <div>
                    <p className="text-dark fw-medium fs-16 mb-1">Free shipping for all orders over {currency}200</p>
                    <p className="mb-0">Only in this week</p>
                  </div>
                </div>
              </Col>
              <Col lg={3}>
                <div className="d-flex align-items-center gap-3">
                  <div className="avatar bg-light d-flex align-items-center justify-content-center rounded">
                    <IconifyIcon icon="solar:ticket-bold-duotone" className="fs-35 text-primary" />
                  </div>
                  <div>
                    <p className="text-dark fw-medium fs-16 mb-1">Special discounts for customers</p>
                    <p className="mb-0">Coupons up to $ 100</p>
                  </div>
                </div>
              </Col>
              <Col lg={3}>
                <div className="d-flex align-items-center gap-3">
                  <div className="avatar bg-light d-flex align-items-center justify-content-center rounded">
                    <IconifyIcon icon="solar:gift-bold-duotone" className="fs-35 text-primary" />
                  </div>
                  <div>
                    <p className="text-dark fw-medium fs-16 mb-1">Free gift wrapping</p>
                    <p className="mb-0">With 100 letters custom note</p>
                  </div>
                </div>
              </Col>
              <Col lg={3}>
                <div className="d-flex align-items-center gap-3">
                  <div className="avatar bg-light d-flex align-items-center justify-content-center rounded">
                    <IconifyIcon icon="solar:headphones-round-sound-bold-duotone" className="fs-35 text-primary" />
                  </div>
                  <div>
                    <p className="text-dark fw-medium fs-16 mb-1">Expert Customer Service</p>
                    <p className="mb-0">8:00 - 20:00, 7 days/wee</p>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>;
};
export default Step;