import React from 'react';
import { customerData } from '../data';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
const CustomerCard = ({
  change,
  icon,
  item,
  title,
  variant
}) => {
  return <Card>
      <CardBody>
        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="avatar-md bg-primary bg-opacity-10 rounded flex-centered">
            <IconifyIcon icon={icon} width={32} height={32} className="fs-32 text-primary" />
          </div>
          <div>
            <h4 className="mb-0">{title}</h4>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <p className="text-muted fw-medium fs-22 mb-0">{item}</p>
          <div>
            <span className={`badge text-${variant ? 'danger' : 'success'} bg-${variant ? 'danger' : 'success'}-subtle fs-12`}>
              {variant ? <IconifyIcon icon="bx:down-arrow-alt" /> : <IconifyIcon icon="bx:up-arrow-alt" />}
              {change}%
            </span>
          </div>
        </div>
      </CardBody>
    </Card>;
};
const CustomerDataCard = () => {
  return <Row>
      {customerData.map((item, idx) => <Col md={6} xl={3} key={idx}>
          <CustomerCard {...item} />
        </Col>)}
    </Row>;
};
export default CustomerDataCard;