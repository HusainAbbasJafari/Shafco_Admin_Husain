'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import { getAllOrders } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, Col, Row } from 'react-bootstrap';
const OrderCard = ({
  product
}) => {
  const [quantity, setQuantity] = useState(1);
  const increment = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    } else {
      setQuantity(1);
    }
  };
  return <Card className="cart-detail">
      <CardBody>
        <Row className="gy-3">
          <Col sm={'auto'}>
            <div className="rounded bg-light avatar-lg d-flex align-items-center justify-content-center">
              {product?.image && <Image src={product?.image} alt="product" className="avatar-lg" />}
            </div>
          </Col>
          <div className="col-sm">
            <div className="ms-lg-3">
              <Link href="" className="fw-medium text-dark fs-18">
                {product?.title}
              </Link>
              <div className="d-flex align-items-center gap-3 mt-2">
                <p className="text-dark fw-medium">
                  Color : <span className="text-muted"> {product?.color} </span>
                </p>
                <p className="text-dark fw-medium">
                  Size : <span className="text-muted"> {product?.size} </span>
                </p>
              </div>
              <div className="quantity mt-2">
                <div className="input-step border bg-body-secondary p-1 rounded d-inline-flex overflow-visible">
                  <button type="button" onClick={decrement} className="minus bg-light text-dark border-0 rounded-1 fs-20 lh-1 h-100">
                    -
                  </button>

                  <input type="number" value={quantity} className="text-dark text-center border-0 bg-body-secondary rounded h-100" min={0} max={100} readOnly />
                  <button type="button" onClick={increment} className="plus bg-light text-dark border-0 rounded-1 fs-20 lh-1 h-100">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Col sm={'auto'}>
            <div className="text-lg-end">
              <p className="fw-medium mb-0">Items Price</p>
              <p className="mt-2 mb-0 fw-semibold fs-17">
                ${product?.price}.00 <span className="fw-normal fs-14">/ ${product?.tex}.00 Tex</span>
              </p>
            </div>
          </Col>
        </Row>
      </CardBody>
      <CardFooter className="bg-light-subtle">
        <Row className="g-3">
          <div className="col-sm">
            <div className="d-flex gap-3">
              <Link href="" className="text-dark fs-14 d-flex align-items-center gap-1">
                <IconifyIcon icon="solar:trash-bin-minimalistic-bold-duotone" className="fs-18" /> Remove
              </Link>
              <Link href="" className="text-dark fs-14 d-flex align-items-center gap-1 ms-3">
                <IconifyIcon icon="solar:heart-bold-duotone" className="fs-18" />
                Add Wishlist
              </Link>
            </div>
          </div>
          <Col sm={'auto'}>
            <p className="text-dark fw-medium mb-0">
              Total : <span className="text-muted">{currency}83.00</span>
            </p>
          </Col>
        </Row>
      </CardFooter>
    </Card>;
};
const OrderCartData = () => {
  const OrderData = useFetchData(getAllOrders);
  return <Col lg={8}>
      <div className="d-flex mb-4 bg-primary p-3 rounded">
        <p className="fw-medium fs-15 text-white m-0">There are 4 product in your cart</p>
        <Link href="" className="ms-auto text-white fs-14 text-decoration-underline">
          Clear cart
        </Link>
      </div>
      {OrderData?.slice(0, 4).map((item, idx) => <OrderCard key={idx} {...item} />)}
    </Col>;
};
export default OrderCartData;