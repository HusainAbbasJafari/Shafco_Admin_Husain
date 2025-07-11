import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import { orderData } from '../data';
const OrderTags = () => {
  return <Card className="bg-light-subtle">
      <CardBody>
        <Row className="g-3 g-lg-0">
          {orderData.map((item, idx) => <Col lg={3} className={`${orderData.length - 1 != idx && 'border-end'}`} key={idx}>
              <div className="d-flex align-items-center gap-3 justify-content-between px-3">
                <div>
                  <p className="text-dark fw-medium fs-16 mb-1">{item.title}</p>
                  <p className="mb-0">{item.description}</p>
                </div>
                <div className="avatar bg-light d-flex align-items-center justify-content-center rounded">
                  <IconifyIcon icon={item.icon} className="fs-35 text-primary" />
                </div>
              </div>
            </Col>)}
        </Row>
      </CardBody>
    </Card>;
};
export default OrderTags;