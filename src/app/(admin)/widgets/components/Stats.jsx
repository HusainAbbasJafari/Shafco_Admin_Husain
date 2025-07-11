import { Card, CardBody, Col, Row } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import { stateData } from '../data';
const StatCard = ({
  stat
}) => {
  const {
    amount,
    change,
    changeColor,
    badgeIcon,
    icon,
    iconColor,
    title
  } = stat;
  return <Card>
      <CardBody className="overflow-hidden position-relative">
        <IconifyIcon icon={icon} className={`fs-36 text-${iconColor}`} />
        <h3 className="mb-0 fw-bold mt-3 mb-1">
          {currency}
          {amount}k
        </h3>
        <p className="text-muted">{title}</p>
        <span className={`badge fs-12 badge-soft-${changeColor}`}>
          {changeColor == 'success' ? <IconifyIcon icon="bx:chevrons-up" /> : <IconifyIcon icon="bx:chevrons-up" />}
          {change}%
        </span>
        <IconifyIcon icon={badgeIcon} className="widget-icon" />
      </CardBody>
    </Card>;
};
const Stats = () => {
  return <Row>
      {stateData.map((stat, idx) => <Col lg={4} md={6} className="col-xl" key={idx}>
          <StatCard stat={stat} />
        </Col>)}
    </Row>;
};
export default Stats;