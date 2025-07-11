"use client"
import Image from 'next/image';
import React from 'react';
import product1 from '@/assets/images/product/p-1.png';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardFooter, Carousel, Col, Row } from 'react-bootstrap';
import { currency } from '@/context/constants';
import Link from 'next/link';
const ProductDetails = () => {
  return <Col xl={3} lg={4}>
<Carousel interval={null} indicators={false}>
  {[1, 2, 3].map((item, index) => (
    <Carousel.Item key={index}>
      <Card>
        <CardBody>
          <Image src={product1} alt="product" className="img-fluid rounded bg-light" />
          <div className="mt-3">
            <h4>
              Men Black Slim Fit T-shirt <span className="fs-14 text-muted ms-1">(Fashion)</span>
            </h4>
            <h5 className="text-dark fw-medium mt-3">Price :</h5>
            <h4 className="fw-semibold text-dark mt-2 d-flex align-items-center gap-2">
              <span className="text-muted text-decoration-line-through">{currency}100</span> {currency}80{' '}
              <small className="text-muted"> (30% Off)</small>
            </h4>

            {/* Sizes */}
            <div className="mt-3">
              <h5 className="text-dark fw-medium">Size :</h5>
              <div className="d-flex flex-wrap gap-2" role="group">
                {['s', 'm', 'xl', 'xxl'].map((size, idx) => (
                  <>
                    <input type="checkbox" className="btn-check" id={`size-${size}`} defaultChecked={size === 'm'} />
                    <label
                      key={idx}
                      className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center"
                      htmlFor={`size-${size}`}
                    >
                      {size.toUpperCase()}
                    </label>
                  </>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mt-3">
              <h5 className="text-dark fw-medium">Colors :</h5>
              <div className="d-flex flex-wrap gap-2" role="group">
                {[
                  { id: 'dark', color: 'text-dark' },
                  { id: 'yellow', color: 'text-warning' },
                  { id: 'white', color: 'text-white' },
                  { id: 'red', color: 'text-danger' },
                ].map(({ id, color }) => (
                  <>
                    <input type="checkbox" className="btn-check" id={`color-${id}`} />
                    <label
                      key={id}
                      className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center"
                      htmlFor={`color-${id}`}
                    >
                      <IconifyIcon icon="bxs:circle" height={18} width={18} className={`fs-18 ${color}`} />
                    </label>
                  </>
                ))}
              </div>
            </div>
          </div>
        </CardBody>

        <CardFooter className="bg-light-subtle">
          <Row className="g-2">
            <Col lg={6}>
              <Link href="" className="btn btn-outline-secondary w-100">
                Create Product
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
    </Carousel.Item>
  ))}
</Carousel>

    </Col>;
};
export default ProductDetails;