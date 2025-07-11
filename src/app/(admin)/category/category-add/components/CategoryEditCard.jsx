import product1 from '@/assets/images/product/p-1.png';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, CardFooter, Col, Row } from 'react-bootstrap';
const CategoryEditCard = () => {
  return <Col xl={3} lg={4}>
      <Card>
        <CardBody>
          <div className="bg-light text-center rounded bg-light">
            <Image src={product1} alt="product" className="avatar-xxl" />
          </div>
          <div className="mt-3">
            <h4>Fashion Men , Women &amp; Kid&apos;s</h4>
            <Row>
              <Col lg={4} xs={4}>
                <p className="mb-1 mt-2">Created By :</p>
                <h5 className="mb-0">Seller</h5>
              </Col>
              <Col lg={4} xs={4}>
                <p className="mb-1 mt-2">Stock :</p>
                <h5 className="mb-0">46233</h5>
              </Col>
              <Col lg={4} xs={4}>
                <p className="mb-1 mt-2">ID :</p>
                <h5 className="mb-0">FS16276</h5>
              </Col>
            </Row>
          </div>
        </CardBody>
        <CardFooter className="border-top">
          <Row className="g-2">
            <Col lg={6}>
              <Link href="" className="btn btn-outline-secondary w-100">
                Create Category
              </Link>
            </Col>
            <Col lg={6}>
              <Link href="" className="btn btn-primary w-100">
                Cancel
              </Link>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </Col>;
};
export default CategoryEditCard;