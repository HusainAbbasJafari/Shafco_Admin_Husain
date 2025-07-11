import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { statisticData } from '../data';
import { Card, CardBody, CardFooter, Col, Row } from 'react-bootstrap';
import Link from 'next/link';
const StateCard = ({
  amount,
  change,
  icon,
  name,
  variant
}) => {
  return <Card className="overflow-hidden">
      <CardBody>
        <Row>
          <Col xs={6}>
            <div className="avatar-md bg-soft-primary rounded flex-centered">
              <IconifyIcon width={32} height={32} icon={icon} className=" fs-32 text-primary" />
            </div>
          </Col>
          <Col xs={6} className="text-end">
            <p className="text-muted mb-0 text-truncate">{name}</p>
            <h3 className="text-dark mt-1 mb-0">{amount}</h3>
          </Col>
        </Row>
      </CardBody>
      <CardFooter className="py-2 bg-light bg-opacity-50">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <span className={`text-${variant} icons-center`}>
              {variant == 'danger' ? <IconifyIcon icon="bxs:down-arrow" className="fs-12" /> : <IconifyIcon icon="bxs:up-arrow" className="fs-12" />}
              &nbsp;{change}%
            </span>
            <span className="text-muted ms-1 fs-12">Last Week</span>
          </div>
          <Link href="" className="text-reset fw-semibold fs-12">
            View More
          </Link>
        </div>
      </CardFooter>
    </Card>;
};
const Statistic = () => {
  return <>
      {statisticData.map((item, idx) => <Col md={3} key={idx}>
          <StateCard {...item} />
        </Col>)}
    </>;
};
export default Statistic;