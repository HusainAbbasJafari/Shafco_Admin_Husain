'use client';

import product1 from '@/assets/images/product/p-1.png';
import product10 from '@/assets/images/product/p-10.png';
import product13 from '@/assets/images/product/p-13.png';
import product14 from '@/assets/images/product/p-14.png';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Card, CardBody, CardFooter, Carousel, CarouselItem, Col, Row } from 'react-bootstrap';
const ProductDetails = () => {
  const products = [product1, product10, product13, product14];
  const [activeIndex, setActiveIndex] = useState(0);
  const handleSelect = selectedIndex => {
    setActiveIndex(selectedIndex);
  };
  const handleThunkSelect = index => {
    setActiveIndex(index);
  };
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
  return <Row>
      <Col lg={4}>
        <Card>
          <CardBody>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
              <Carousel activeIndex={activeIndex} onSelect={handleSelect} indicators={false} className="carousel-inner" role="listbox">
                {products.map((item, idx) => <CarouselItem key={idx}>
                    <Image src={item} alt="productImg" className="img-fluid bg-light rounded" />
                  </CarouselItem>)}
              </Carousel>
              <div className="carousel-indicators m-0 mt-2 d-lg-flex d-none position-static h-100">
                {products.map((item, idx) => <button key={idx} type="button" onClick={() => handleThunkSelect(idx)} data-bs-target="#carouselExampleFade" data-bs-slide-to={0} aria-current="true" id="Slide-1" className={clsx('w-auto h-auto rounded bg-light', {
                active: activeIndex === idx
              })}>
                    <Image src={item} className="d-block avatar-xl" alt="swiper-indicator-img" />
                  </button>)}
              </div>
            </div>
          </CardBody>
          <CardFooter className="border-top">
            <Row className="g-2">
              <Col lg={5}>
                <Link href="" className="btn btn-primary d-flex align-items-center justify-content-center gap-2 w-100">
                  <IconifyIcon icon="bx:cart" className="fs-18" /> Add To Cart
                </Link>
              </Col>
              <Col lg={5}>
                <Link href="" className="btn btn-light d-flex align-items-center justify-content-center gap-2 w-100">
                  <IconifyIcon icon="bx:shopping-bag" className="fs-18" /> Buy Now
                </Link>
              </Col>
              <Col lg={2}>
                <button type="button" className="btn btn-soft-danger btn-sm d-inline-flex align-items-center justify-content-center fs-20 rounded w-100">
                  <span>
                    {' '}
                    <IconifyIcon width={20} height={20} icon="solar:heart-broken" />{' '}
                  </span>
                </button>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </Col>
      <Col lg={8}>
        <Card>
          <CardBody>
            <h4 className="badge bg-success text-light fs-14 py-1 px-2">New Arrival</h4>
            <p className="mb-1">
              <Link href="" className="fs-24 text-dark fw-medium">
                Men Black Slim Fit T-shirt
              </Link>
            </p>
            <div className="d-flex gap-2 align-items-center">
              <ul className="d-flex text-warning m-0 fs-20  list-unstyled">
                <li>
                  <IconifyIcon icon="bxs:star" />
                </li>
                <li>
                  <IconifyIcon icon="bxs:star" />
                </li>
                <li>
                  <IconifyIcon icon="bxs:star" />
                </li>
                <li>
                  <IconifyIcon icon="bxs:star" />
                </li>
                <li>
                  <IconifyIcon icon="bxs:star-half" />
                </li>
              </ul>
              <p className="mb-0 fw-medium fs-18 text-dark">
                4.5 <span className="text-muted fs-13">(55 Review)</span>
              </p>
            </div>
            <h2 className="fw-medium my-3">
              {currency}80.00 <span className="fs-16 text-decoration-line-through">{currency}100.00</span>
              <small className="text-danger ms-2">(30%Off)</small>
            </h2>
            <Row className="align-items-center g-2 mt-3">
              <Col lg={3}>
                <div>
                  <h5 className="text-dark fw-medium">
                    Colors &gt; <span className="text-muted">Dark</span>
                  </h5>
                  <div className="d-flex flex-wrap gap-2" role="group" aria-label="Basic checkbox toggle button group">
                    <input type="checkbox" className="btn-check" id="color-dark2" defaultChecked />
                    <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="color-dark2">
                      {' '}
                      <span className="flex-center">
                        {' '}
                        <IconifyIcon icon="bxs:circle" className="fs-18 text-dark" />
                      </span>
                    </label>
                    <input type="checkbox" className="btn-check" id="color-yellow2" />
                    <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="color-yellow2">
                      {' '}
                      <span className="flex-center">
                        {' '}
                        <IconifyIcon icon="bxs:circle" className="fs-18 text-warning" />
                      </span>
                    </label>
                    <input type="checkbox" className="btn-check" id="color-white2" />
                    <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="color-white2">
                      {' '}
                      <span className="flex-center">
                        {' '}
                        <IconifyIcon icon="bxs:circle" className="fs-18 text-white" />
                      </span>
                    </label>
                    <input type="checkbox" className="btn-check" id="color-green2" />
                    <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="color-green2">
                      {' '}
                      <span className="flex-center">
                        {' '}
                        <IconifyIcon icon="bxs:circle" className="fs-18 text-success" />
                      </span>
                    </label>
                  </div>
                </div>
              </Col>
              <Col lg={3}>
                <div>
                  <h5 className="text-dark fw-medium">
                    Size &gt; <span className="text-muted">M</span>
                  </h5>
                  <div className="d-flex flex-wrap gap-2" role="group" aria-label="Basic checkbox toggle button group">
                    <input type="checkbox" className="btn-check" id="size-s2" />
                    <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="size-s2">
                      S
                    </label>
                    <input type="checkbox" className="btn-check" id="size-m2" defaultChecked />
                    <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="size-m2">
                      M
                    </label>
                    <input type="checkbox" className="btn-check" id="size-xl3" />
                    <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="size-xl3">
                      Xl
                    </label>
                    <input type="checkbox" className="btn-check" id="size-xxl3" />
                    <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="size-xxl3">
                      XXL
                    </label>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="quantity mt-4">
              <h4 className="text-dark fw-medium mt-3">Quantity :</h4>
              <div className="input-step border bg-body-secondary p-1 mt-1 rounded d-inline-flex overflow-visible">
                <button type="button" onClick={decrement} className="minus bg-light text-dark border-0 rounded-1 fs-20 lh-1 h-100">
                  -
                </button>
                <input type="number" value={quantity} className="text-dark text-center border-0 bg-body-secondary rounded h-100" min={0} max={100} readOnly />
                <button type="button" onClick={increment} className="plus bg-light text-dark border-0 rounded-1 fs-20 lh-1 h-100">
                  +
                </button>
              </div>
            </div>
            <ul className="d-flex flex-column gap-2 list-unstyled fs-15 my-3">
              <li>
                <IconifyIcon icon="bx:check" className="text-success" /> In Stock
              </li>
              <li>
                <IconifyIcon icon="bx:check" className="text-success" /> Free delivery available
              </li>
              <li>
                <IconifyIcon icon="bx:check" className="text-success" /> Sales 10% Off Use Code: <span className="text-dark fw-medium">CODE123</span>
              </li>
            </ul>
            <h4 className="text-dark fw-medium">Description :</h4>
            <p className="text-muted">
              Top in sweatshirt fabric made from a cotton blend with a soft brushed inside. Relaxed fit with dropped shoulders, long sleeves and
              ribbing around the neckline, cuffs and hem. Small metal text applique.{' '}
              <Link href="" className="link-primary">
                Read more
              </Link>
            </p>
            <h4 className="text-dark fw-medium mt-3">Available offers :</h4>
            <div className="d-flex align-items-center mt-2">
              <IconifyIcon icon="bxs-bookmarks" className="text-success me-3 fs-20 mt-1" />
              <p className="mb-0">
                <span className="fw-medium text-dark">Bank Offer</span> 10% instant discount on Bank Debit Cards, up to {currency}30 on orders of{' '}
                {currency}50 and above
              </p>
            </div>
            <div className="d-flex align-items-center mt-2">
              <IconifyIcon icon="bxs-bookmarks" className="text-success me-3 fs-20 mt-1" />
              <p className="mb-0">
                <span className="fw-medium text-dark">Bank Offer</span> Grab our exclusive offer now and save 20% on your next purchase! Don&apos;t
                miss out, shop today!
              </p>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>;
};
export default ProductDetails;