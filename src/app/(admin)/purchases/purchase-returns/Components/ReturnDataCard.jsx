import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import { returnOrderData } from '../data';
const ReturnOrder = ({
  icon,
  item,
  title,
  change,
  variant
}) => {
  return <Card>
      <CardBody>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <CardTitle as={'h4'} className="mb-2 d-flex align-items-center gap-2">
              {title}{' '}
              {variant && <span className={`badge text-${variant} bg-${variant}-subtle fs-12`}>
                  {variant == 'danger' ? <IconifyIcon icon="bx:down-arrow-alt" /> : <IconifyIcon icon="bx:up-arrow-alt" />}
                  {change}%
                </span>}
            </CardTitle>
            <p className="text-muted fw-medium fs-22 mb-0">
              {item} <span className="fs-14">Items</span>
            </p>
          </div>
          <div>
            <div className="avatar-md bg-primary bg-opacity-10 rounded flex-centered">
              <IconifyIcon width={32} height={32} icon={icon} className="fs-32 text-primary" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>;
};
const ReturnDataCard = () => {
  return <Row>
      {returnOrderData.map((item, idx) => <Col md={6} xl={3} key={idx}>
          <ReturnOrder {...item} />
        </Col>)}
    </Row>;
};
export default ReturnDataCard;