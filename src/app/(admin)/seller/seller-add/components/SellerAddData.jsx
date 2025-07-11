'use client';

import FileUpload from '@/components/FileUpload';
import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Link from 'next/link';
import Nouislider from 'nouislider-react';
import { useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
const SellerAddData = () => {
  const [selectedValue, setSelectedValue] = useState([0, 500]);
  const handleSliderChange = values => {
    setSelectedValue(values);
  };
  const handleInputChange = event => {
    if (selectedValue[0] <= Math.round(event.target.value)) {
      setSelectedValue([selectedValue[0], Math.round(event.target.value)]);
    }
  };
  return <Col xl={9} lg={8}>
      <FileUpload title="Add Brand Logo" />
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>Seller Information</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg={6}>
              <form>
                <div className="mb-3">
                  <label htmlFor="brand-title" className="form-label">
                    Brand Title
                  </label>
                  <input type="text" id="brand-title" className="form-control" placeholder="Enter Title" />
                </div>
              </form>
            </Col>
            <Col lg={6}>
              <form>
                <label htmlFor="product-categories" className="form-label">
                  Product Categories
                </label>
                <ChoicesFormInput className="form-control" id="product-categories" data-choices data-choices-groups data-placeholder="Select Categories">
                  <option>Choose a categories</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Sportswear">Sportswear</option>
                  <option value="Watches">Watches</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Appliances">Appliances</option>
                  <option value="Headphones">Headphones</option>
                  <option value="Other Accessories">Other Accessories</option>
                </ChoicesFormInput>
              </form>
            </Col>
            <Col lg={6}>
              <form>
                <div className="mb-3">
                  <label htmlFor="brand-link" className="form-label">
                    Brand Link
                  </label>
                  <input type="text" id="brand-link" className="form-control" placeholder="www.****" />
                </div>
              </form>
            </Col>
            <Col lg={6}>
              <form>
                <label htmlFor="seller-location" className="form-label">
                  Location
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text fs-20">
                    <IconifyIcon icon="solar:point-on-map-bold-duotone" className="fs-18" />
                  </span>
                  <input type="text" id="seller-location" className="form-control" placeholder="Add Address" />
                </div>
              </form>
            </Col>
            <Col lg={6}>
              <form>
                <label htmlFor="seller-email" className="form-label">
                  Email
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text fs-20">
                    <IconifyIcon icon="solar:letter-bold-duotone" className="fs-18" />
                  </span>
                  <input type="email" id="seller-email" className="form-control" placeholder="Add Email" />
                </div>
              </form>
            </Col>
            <Col lg={6}>
              <form>
                <label htmlFor="seller-number" className="form-label">
                  Phone Number
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text fs-20">
                    <IconifyIcon icon="solar:outgoing-call-rounded-bold-duotone" className="fs-20" />
                  </span>
                  <input type="text" id="seller-number" className="form-control" placeholder="Phone number" />
                </div>
              </form>
            </Col>
            <Col lg={12}>
              <label htmlFor="customRange1" className="form-label">
                Yearly Revenue
              </label>
              <Nouislider range={{
              min: 0,
              max: 1500
            }} start={selectedValue} connect={true} className="product-price-range" onSlide={handleSliderChange} />
              <div id="product-price-range" />
              <div className="formCost d-flex gap-2 align-items-center mt-2">
                <input className="form-control form-control-sm text-center w-50" type="text" id="maxCost" value={selectedValue[1]} onChange={handleInputChange} />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>Seller Product Information</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg={4}>
              <form>
                <div className="mb-3">
                  <label htmlFor="items-stock" className="form-label">
                    Items Stock
                  </label>
                  <input type="number" id="items-stock" className="form-control" placeholder={'000'} />
                </div>
              </form>
            </Col>
            <Col lg={4}>
              <form>
                <div className="mb-3">
                  <label htmlFor="items-sells" className="form-label">
                    Product Sells
                  </label>
                  <input type="number" id="items-sells" className="form-control" placeholder={'000'} />
                </div>
              </form>
            </Col>
            <Col lg={4}>
              <form>
                <div className="mb-3">
                  <label htmlFor="happy-client" className="form-label">
                    Happy Client
                  </label>
                  <input type="number" id="happy-client" className="form-control" placeholder={'000'} />
                </div>
              </form>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <div className="p-3 bg-light mb-3 rounded">
        <Row className="justify-content-end g-2">
          <Col lg={2}>
            <Link href="" className="btn btn-outline-secondary w-100">
              Save Change
            </Link>
          </Col>
          <Col lg={2}>
            <Link href="" className="btn btn-primary w-100">
              Cancel
            </Link>
          </Col>
        </Row>
      </div>
    </Col>;
};
export default SellerAddData;