import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllReviews } from '@/helpers/data';
import Image from 'next/image';
import doubleImg from '@/assets/images/double.png';
import { getRatingStatus } from '@/utils/other';
import { Card, CardBody, CardFooter, Col, Row } from 'react-bootstrap';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Review'
};
const ReviewCard = ({
  description,
  rating,
  title,
  user
}) => {
  return <Card className="overflow-hidden">
      <CardBody>
        <p className="mb-2 text-dark fw-semibold fs-15">{title}</p>
        <p className="mb-0">{description}</p>
        <div className="d-flex align-items-center gap-2 mt-2 mb-1">
          <ul className="d-flex text-warning m-0 fs-20 list-unstyled ">
            {Array(Math.floor(rating)).fill(0).map((_star, idx) => <li className="icons-center" key={idx}>
                  <IconifyIcon icon="bxs:star" />
                </li>)}
            {!Number.isInteger(rating) && <li className="icons-center">
                <IconifyIcon icon="bxs:star-half" />{' '}
              </li>}
            {rating < 5 && Array(5 - Math.ceil(rating)).fill(0).map((_star, idx) => <li className="icons-center" key={idx}>
                    <IconifyIcon icon="bx:star" />
                  </li>)}
          </ul>
          <p className="fw-medium mb-0 text-dark fs-15">{getRatingStatus(rating)} Quality</p>
        </div>
      </CardBody>
      <CardFooter className="bg-primary position-relative mt-3">
        <div className="position-absolute top-0 start-0 translate-middle-y ms-3">
          {user?.image && <Image src={user?.image} alt="avatar" width={72} height={72} className="avatar-lg border border-light border-3 rounded-circle" />}
        </div>
        <div className="position-absolute top-0 end-0 translate-middle-y me-3">
          <Image src={doubleImg} width={56} height={56} alt="double" className="avatar-md" />
        </div>
        <div className="mt-4">
          <h4 className="text-white mb-1">{user?.name}</h4>
          <p className="text-white mb-0">
            {user?.compony} / {user?.position}
          </p>
        </div>
      </CardFooter>
    </Card>;
};
const ReviewPage = async () => {
  const reviewData = await getAllReviews();
  return <>
      <PageTItle title="REVIEWS LIST" />
      <Row>
        {reviewData.map((item, idx) => <Col xl={3} md={6} key={idx}>
            <ReviewCard {...item} />
          </Col>)}
      </Row>
    </>;
};
export default ReviewPage;