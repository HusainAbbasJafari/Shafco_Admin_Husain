'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import { getProductData } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
import useToggle from '@/hooks/useToggle';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, Col, Dropdown, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
const ProductCard = ({
  image,
  price,
  rating,
  title,
  id,
  sellPrice
}) => {
  const {
    isTrue,
    toggle
  } = useToggle();
  return <Card>
      <Image src={image} alt="productImg" className="img-fluid" />
      <CardBody className="bg-light-subtle rounded-bottom">
        <Link href={`/products/${id}`} className="text-dark fw-medium fs-16">
          {title}
        </Link>
        <div className="my-1">
          <div className="d-flex gap-2 align-items-center">
            <ul className="d-flex text-warning m-0 fs-18  list-unstyled">
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
            <p className="mb-0 fw-medium fs-15 text-dark">
              {rating.star} <span className="text-muted fs-13">({rating.review} Review)</span>
            </p>
          </div>
        </div>
        <h4 className="fw-semibold text-dark mt-2 d-flex align-items-center gap-2">
          <span className="text-muted text-decoration-line-through">
            {currency}
            {sellPrice}
          </span>{' '}
          {currency}
          {price} <small className="text-muted"> (30% Off)</small>
        </h4>
        <div className="mt-3">
          <div className="d-flex gap-2">
            <Dropdown>
              <DropdownToggle as={'a'} className="btn btn-soft-primary border border-primary-subtle content-none" data-bs-toggle="dropdown" aria-expanded="false">
                <IconifyIcon icon="bx:dots-horizontal-rounded" />
              </DropdownToggle>
              <DropdownMenu>
                <Link href="" className="dropdown-item">
                  Edit
                </Link>
                <Link href="" className="dropdown-item">
                  Overview
                </Link>
                <Link href="" className="dropdown-item">
                  Delete
                </Link>
              </DropdownMenu>
            </Dropdown>
            <Link href="/orders/order-cart" className="btn btn-outline-dark border border-secondary-subtle d-flex align-items-center justify-content-center gap-1 w-100">
              <IconifyIcon icon="bx:cart" className="align-middle" /> Add To Cart
            </Link>
          </div>
        </div>
      </CardBody>
      <span className="position-absolute top-0 end-0 p-3">
        <button type="button" onClick={toggle} className="btn btn-soft-danger avatar-sm d-inline-flex align-items-center justify-content-center fs-20 rounded-circle">
          <span>
            {isTrue ? <IconifyIcon height={20} width={20} icon="solar:heart-angle-bold-duotone" /> : <IconifyIcon height={20} width={20} icon="solar:heart-broken" />}
          </span>
        </button>
      </span>
    </Card>;
};
const Product = () => {
  const productData = useFetchData(getProductData);
  return <Row>
      {productData?.map((item, idx) => <Col md={6} xl={3} key={idx}>
          <ProductCard {...item} />
        </Col>)}
    </Row>;
};
export default Product;