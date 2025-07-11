import React from 'react';
import { customerDetailsCardDta } from '../data';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardTitle, Col } from 'react-bootstrap';
const CustomerDataCard = ({
  icon,
  item,
  title
}) => {
  return <Card>
      <CardBody>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <CardTitle as={'h4'} className="mb-2 d-flex align-items-center gap-2">
              {title}
            </CardTitle>
            <p className="text-muted fw-medium fs-22 mb-0">{item}</p>
          </div>
          <div>
            <div className="avatar-md bg-primary bg-opacity-10 rounded flex-centered">
              <IconifyIcon icon={icon} width={32} height={32} className="fs-32 text-primary" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>;
};
const CustomerDetailsCard = () => {
  return <>
      {customerDetailsCardDta.map((item, idx) => <Col lg={4} key={idx}>
          <CustomerDataCard {...item} />
        </Col>)}
    </>;
};
export default CustomerDetailsCard;