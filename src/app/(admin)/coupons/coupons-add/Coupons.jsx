'use client';

import CustomFlatpickr from '@/components/CustomFlatpickr';
import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import PageTItle from '@/components/PageTItle';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
export const metadata = {
  title: 'Coupons Add'
};
const Coupons = () => {
  const couponSchema = yup.object({
    code: yup.string().required('Please enter Coupons Code'),
    discount: yup.string().required('Please enter Discount Value')
  });
  const {
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(couponSchema)
  });
  return <>
      <PageTItle title="COUPONS ADD" />
      <Row>
        <Col lg={5}>
          <Card>
            <CardHeader>
              <CardTitle as={'h4'}>Coupon Status</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg={4}>
                  <div className="d-flex gap-2 align-items-center">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault5" id="flexRadioDefault9" defaultChecked />
                      <label className="form-check-label" htmlFor="flexRadioDefault9">
                        Active
                      </label>
                    </div>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault5" id="flexRadioDefault10" />
                    <label className="form-check-label" htmlFor="flexRadioDefault10">
                      In Active
                    </label>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault5" id="flexRadioDefault11" />
                    <label className="form-check-label" htmlFor="flexRadioDefault11">
                      Future Plan
                    </label>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle as={'h4'}>Date Schedule</CardTitle>
            </CardHeader>
            <CardBody>
              <form>
                <div className="mb-3">
                  <label htmlFor="start-date" className="form-label text-dark">
                    Start Date
                  </label>
                  <CustomFlatpickr className="form-control flatpickr-input active" placeholder="dd-mm-yyyy" options={{
                  enableTime: false
                }} />
                </div>
              </form>
              <form>
                <div className="mb-3">
                  <label htmlFor="end-date" className="form-label text-dark">
                    End Date
                  </label>
                  <CustomFlatpickr className="form-control flatpickr-input active" placeholder="dd-mm-yyyy" options={{
                  enableTime: false
                }} />
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
        <Col lg={7}>
          <form onClick={handleSubmit(() => {})}>
            <Card>
              <CardHeader>
                <CardTitle as={'h4'} className="card-title">
                  Coupon Information
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <TextFormInput control={control} type="text" name="code" label="Coupons Code" placeholder="Code enter" />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="product-categories" className="form-label">
                      Discount Products
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
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="choices-country" className="form-label">
                      Discount Country
                    </label>
                    <ChoicesFormInput className="form-control" id="choices-country" data-choices data-choices-groups data-placeholder="Select Country">
                      <option>Choose a country</option>
                      <optgroup>
                        <option>United Kingdom</option>
                        <option value="Fran">France</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="U.S.A">U.S.A</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="India">India</option>
                        <option value="Germany">Germany</option>
                        <option value="Spain">Spain</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                      </optgroup>
                    </ChoicesFormInput>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label htmlFor="coupons-limits" className="form-label">
                        Coupons Limits
                      </label>
                      <input type="number" id="coupons-limits" name="coupons-limits" className="form-control" placeholder="limits nu" />
                    </div>
                  </Col>
                </Row>
                <CardTitle as={'h4'} className="card-title mb-3 mt-2">
                  Coupons Types
                </CardTitle>
                <Row className="mb-3">
                  <Col lg={4}>
                    <div className="d-flex gap-2 align-items-center">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault6" id="flexRadioDefault12" defaultChecked />
                        <label className="form-check-label" htmlFor="flexRadioDefault12">
                          Free Shipping
                        </label>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault6" id="flexRadioDefault13" />
                      <label className="form-check-label" htmlFor="flexRadioDefault13">
                        Percentage
                      </label>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault6" id="flexRadioDefault14" />
                      <label className="form-check-label" htmlFor="flexRadioDefault14">
                        Fixed Amount
                      </label>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <div>
                      <TextFormInput control={control} type="text" name="discount" label="Discount Value" placeholder="value enter" />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="border-top">
                <Button as="a" type="submit" className="btn btn-primary">
                  Create Coupon
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Col>
      </Row>
    </>;
};
export default Coupons;