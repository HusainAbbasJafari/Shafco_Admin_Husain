import React from 'react';
import { statistic2Data } from '../data';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardFooter, Col, Row } from 'react-bootstrap';
import Link from 'next/link';
const StatisticCard = ({
  amount,
  change,
  changeColor,
  icon,
  iconColor,
  title
}) => {
  return <Card>
      <CardBody>
        <Row>
          <Col xs={6}>
            <div className={`avatar-md bg-soft-${iconColor} rounded flex-centered`}>
              <IconifyIcon icon={icon} width={24} height={24} className={`fs-24 text-${iconColor}`} />
            </div>
          </Col>
          <Col xs={6} className="text-end">
            <p className="text-muted mb-0 text-truncate">{title}</p>
            <h3 className="text-dark mt-1 mb-0">{amount}</h3>
          </Col>
        </Row>
      </CardBody>
      <CardFooter className="py-2 bg-light bg-opacity-50">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <span className={`text-${changeColor}`}>
              {changeColor == 'success' ? <IconifyIcon icon="bxs:up-arrow" className="fs-12" /> : <IconifyIcon icon="bxs:down-arrow" className="fs-12" />}{' '}
              {change}%
            </span>
            <span className="text-muted ms-1 fs-12">Last Month</span>
          </div>
          <Link href="" className="text-reset fw-semibold fs-12">
            View More
          </Link>
        </div>
      </CardFooter>
    </Card>;
};
const Statistic3 = () => {
  return <Row>
      {statistic2Data.map((item, idx) => <Col md={6} xl={3} key={idx}>
          <StatisticCard {...item} />
        </Col>)}
    </Row>;
};
export default Statistic3;