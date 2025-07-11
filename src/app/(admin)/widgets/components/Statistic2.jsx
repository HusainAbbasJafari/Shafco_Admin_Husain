import React from 'react';
import { statistic2Data } from '../data';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
const StatisticCard = ({
  amount,
  icon,
  iconColor,
  title
}) => {
  return <Card>
      <CardBody>
        <Row>
          <Col>
            <div className={`avatar-md bg-${iconColor} rounded flex-centered`}>
              <IconifyIcon icon={icon} width={24} height={24} className="fs-24 text-white" />
            </div>
          </Col>
          <Col className="text-end">
            <p className="text-muted mb-0 text-truncate">{title}</p>
            <h3 className="text-dark mt-1 mb-0">{amount}</h3>
          </Col>
        </Row>
      </CardBody>
    </Card>;
};
const Statistic2 = () => {
  return <Row>
      {statistic2Data.map((item, idx) => <Col md={6} xl={3} key={idx}>
          <StatisticCard {...item} />
        </Col>)}
    </Row>;
};
export default Statistic2;