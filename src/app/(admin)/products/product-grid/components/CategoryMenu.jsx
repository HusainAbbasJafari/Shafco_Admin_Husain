'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import Link from 'next/link';
import Nouislider from 'nouislider-react';
import { useState } from 'react';
import { Card, CardBody, CardFooter } from 'react-bootstrap';
const CategoryMenu = () => {
  const [selectedValue, setSelectedValue] = useState([200, 1299]);
  const handleSliderChange = values => {
    setSelectedValue(values);
  };
  const handleInputChange = event => {
    if (selectedValue[0] <= Math.round(event.target.value)) {
      setSelectedValue([selectedValue[0], Math.round(event.target.value)]);
    }
  };
  return <Card>
      <CardBody className="border-light">
        <Link href="" className="btn-link d-flex align-items-center text-dark bg-light p-2 rounded fw-medium fs-16 mb-0" data-bs-toggle="collapse" data-bs-target="#categories" aria-expanded="false" aria-controls="other">
          Categories
          <i className="bx bx-chevron-down ms-auto fs-20" />
        </Link>
        <div id="categories" className="collapse show">
          <div className="categories-list d-flex flex-column gap-2 mt-2">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="all-categories" defaultChecked />
              <label className="form-check-label" htmlFor="all-categories">
                All Categories
              </label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="fashion-categories" />
              <label className="form-check-label" htmlFor="fashion-categories">
                Fashion Men , Women &amp; Kid&apos;s
              </label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="sunglass-categories" />
              <label className="form-check-label" htmlFor="sunglass-categories">
                Eye Ware &amp; Sunglass
              </label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="watches-categories" />
              <label className="form-check-label" htmlFor="watches-categories">
                Watches
              </label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="electronics-categories" />
              <label className="form-check-label" htmlFor="electronics-categories">
                Electronics Items
              </label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="furniture-categories" />
              <label className="form-check-label" htmlFor="furniture-categories">
                Furniture
              </label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="headphones-categories" />
              <label className="form-check-label" htmlFor="headphones-categories">
                Headphones
              </label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="beauty-categories" />
              <label className="form-check-label" htmlFor="beauty-categories">
                Beauty &amp; Health
              </label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="shoes-categories" />
              <label className="form-check-label" htmlFor="shoes-categories">
                Foot Ware
              </label>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Link href="" className="btn-link d-flex align-items-center text-dark bg-light p-2 rounded fw-medium fs-16 mb-0" data-bs-toggle="collapse" data-bs-target="#price" aria-expanded="false" aria-controls="other">
            Product Price
            <i className="bx bx-chevron-down ms-auto fs-20" />
          </Link>
          <div id="price" className="collapse show">
            <div className="categories-list d-flex flex-column gap-2 mt-2">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="all-price" />
                <label className="form-check-label" htmlFor="all-price">
                  All Price
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="price-1" />
                <label className="form-check-label" htmlFor="price-1">
                  Below {currency}200 (145)
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="price-2" />
                <label className="form-check-label" htmlFor="price-2">
                  {currency}200 - {currency}500 (1,885)
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="price-3" />
                <label className="form-check-label" htmlFor="price-3">
                  {currency}500 - {currency}800 (2,276)
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="price-4" />
                <label className="form-check-label" htmlFor="price-4">
                  {currency}800 - {currency}1000 (12,676)
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="price-5" />
                <label className="form-check-label" htmlFor="price-5">
                  {currency}1000 - {currency}1100 (13,123)
                </label>
              </div>
              <h5 className="text-dark fw-medium mt-3">Custom Price Range :</h5>
              <Nouislider range={{
              min: 0,
              max: 1500
            }} start={selectedValue} connect={true} className="product-price-range" onSlide={handleSliderChange} />
              <div className="formCost d-flex gap-2 align-items-center mt-2">
                <input className="form-control form-control-sm text-center" type="number" id="minCost" value={selectedValue[0]} onChange={handleInputChange} />
                <span className="fw-semibold text-muted">to</span>
                <input className="form-control form-control-sm text-center" type="number" id="maxCost" value={selectedValue[1]} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Link href="" className="btn-link d-flex align-items-center text-dark bg-light p-2 rounded fw-medium fs-16 mb-0" data-bs-toggle="collapse" data-bs-target="#gender" aria-expanded="false" aria-controls="other">
            Gender
            <i className="bx bx-chevron-down ms-auto fs-20" />
          </Link>
          <div id="gender" className="collapse show">
            <div className="categories-list d-flex flex-column gap-2 mt-2">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="men" />
                <label className="form-check-label" htmlFor="men">
                  Men (1,834)
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="women" />
                <label className="form-check-label" htmlFor="women">
                  Women (2,890)
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="kids" />
                <label className="form-check-label" htmlFor="kids">
                  Kid&apos;s (1,231)
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Link href="" className="btn-link d-flex align-items-center text-dark bg-light p-2 rounded fw-medium fs-16 mb-0" data-bs-toggle="collapse" data-bs-target="#size" aria-expanded="false" aria-controls="other">
            Size &amp; Fit
            <i className="bx bx-chevron-down ms-auto fs-20" />
          </Link>
          <div id="size" className="collapse show">
            <p className="text-muted mt-1">&quot;For better results, select gender and category&quot;</p>
            <div className="categories-list d-flex flex-column gap-2 mt-2">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="size-s" />
                <label className="form-check-label" htmlFor="size-s">
                  S (1,437)
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="size-m" />
                <label className="form-check-label" htmlFor="size-m">
                  M (2,675)
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="size-l" />
                <label className="form-check-label" htmlFor="size-l">
                  L (4,870)
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="size-xl" />
                <label className="form-check-label" htmlFor="size-xl">
                  XL (7,543)
                </label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="size-xxl" />
                <label className="form-check-label" htmlFor="size-xxl">
                  XXL (1,099)
                </label>
              </div>
              <Link href="" className="text-dark fw-medium">
                More
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Link href="" className="btn-link d-flex align-items-center text-dark bg-light p-2 rounded fw-medium fs-16 mb-0" data-bs-toggle="collapse" data-bs-target="#rating" aria-expanded="false" aria-controls="other">
            Rating
            <i className="bx bx-chevron-down ms-auto fs-20" />
          </Link>
          <div id="rating" className="collapse show">
            <div className="categories-list d-flex flex-column gap-2 mt-2">
              <div className="form-check">
                <input type="radio" className="form-check-input" name="rating-number" id="rate-1" />
                <label className="form-check-label" htmlFor="rate-1">
                  1 <IconifyIcon icon="bxs:star" className="text-warning" /> &amp; Above (437)
                </label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input" name="rating-number" id="rate-2" />
                <label className="form-check-label" htmlFor="rate-2">
                  2 <IconifyIcon icon="bxs:star" className="text-warning" /> &amp; Above (657)
                </label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input" name="rating-number" id="rate-3" />
                <label className="form-check-label" htmlFor="rate-3">
                  3 <IconifyIcon icon="bxs:star" className="text-warning" /> &amp; Above (1,897)
                </label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input" name="rating-number" id="rate-4" />
                <label className="form-check-label" htmlFor="rate-4">
                  4 <IconifyIcon icon="bxs:star" className="text-warning" /> &amp; Above (3,571)
                </label>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <Link href="" className="btn btn-primary w-100">
          Apply
        </Link>
      </CardFooter>
    </Card>;
};
export default CategoryMenu;