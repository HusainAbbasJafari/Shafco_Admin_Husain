'use client';

import mastercardImg from '@/assets/images/card/mastercard.svg';
import partyImage from '@/assets/images/party.png';
import avatar1 from '@/assets/images/users/avatar-1.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import { getAllOrders } from '@/helpers/data';
import { useFetchData } from '@/hooks/useFetchData';
import useToggle from '@/hooks/useToggle';
import Image from 'next/image';
import Link from 'next/link';
import { Alert, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Modal, ModalBody, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
const OrderSummary = () => {
  const productData = useFetchData(getAllOrders);
  const {
    isTrue,
    toggle
  } = useToggle();
  return <>
      <Card>
        <CardHeader>
          <CardTitle as={'h4'}>Order Summary</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="table-responsive">
            {productData?.slice(0, 4).map((item, idx) => <div className="d-flex align-items-center gap-3 mb-4" key={idx}>
                <div className="rounded bg-light avatar d-flex align-items-center justify-content-center">
                  {item.product?.image && <Image src={item.product.image} alt="product" className="avatar" />}
                </div>
                <div>
                  <Link href="" className="text-dark fw-medium fs-15">
                    {item.product?.title}
                  </Link>
                  <p className="text-muted mb-0 mt-1 fs-13">
                    <span>Size : </span>
                    {item.product?.size}
                  </p>
                </div>
                <div className="ms-auto text-end">
                  <p className="text-dark fw-medium mb-1">${item.product?.price}.00</p>
                  <p className="mb-0">Q. {item.product?.quantity}</p>
                </div>
              </div>)}
            <table className="table mb-0">
              <tbody>
                <tr>
                  <td className="px-0">
                    <p className="d-flex mb-0 align-items-center gap-1">
                      <IconifyIcon icon="solar:clipboard-text-broken" /> Sub Total :{' '}
                    </p>
                  </td>
                  <td className="text-end text-dark fw-medium px-0">{currency}777.00</td>
                </tr>
                <tr>
                  <td className="px-0">
                    <p className="d-flex mb-0 align-items-center gap-1">
                      <IconifyIcon icon="solar:ticket-broken" className="align-middle" /> Discount :{' '}
                    </p>
                  </td>
                  <td className="text-end text-dark fw-medium px-0">-{currency}60.00</td>
                </tr>
                <tr>
                  <td className="px-0">
                    <p className="d-flex mb-0 align-items-center gap-1">
                      <IconifyIcon icon="solar:kick-scooter-broken" className="align-middle" /> Delivery Charge :{' '}
                    </p>
                  </td>
                  <td className="text-end text-dark fw-medium px-0">{currency}00.00</td>
                </tr>
                <tr>
                  <td className="px-0">
                    <p className="d-flex mb-0 align-items-center gap-1">
                      <IconifyIcon icon="solar:calculator-minimalistic-broken" className="align-middle" /> Estimated Tax (15.5%) :{' '}
                    </p>
                  </td>
                  <td className="text-end text-dark fw-medium px-0">{currency}20.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
        <CardFooter className="bg-light-subtle">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <p className="fw-medium text-dark mb-0">Total Amount</p>
            </div>
            <div>
              <p className="fw-medium text-dark mb-0">{currency}737.00</p>
            </div>
          </div>
          <Alert className="alert-warning alert-icon mt-3 mb-0" role="alert">
            <div className="d-flex align-items-center">
              <div className="avatar-sm rounded bg-warning d-flex justify-content-center align-items-center fs-22 me-2 flex-shrink-0">
                <IconifyIcon icon="solar:kick-scooter-broken" className="align-middle text-white" />
              </div>
              <div className="flex-grow-1">Estimated Delivery by 25 April, 2024</div>
            </div>
          </Alert>
        </CardFooter>
      </Card>
      <div className="main-btn my-4 text-end">
        <Link href="/orders/order-cart" className="btn btn-danger">
          Back To Cart
        </Link>
        &nbsp;
        <Link href="" onClick={toggle} className="btn btn-success" data-bs-toggle="modal" data-bs-target="#checkoutModal">
          Checkout Order
        </Link>
      </div>

      <Modal show={isTrue} onHide={toggle} className="fade" id="checkoutModal" tabIndex={-1} aria-labelledby="checkoutModalLabel" aria-hidden="true">
        <ModalBody>
          <Card className="border-0 mb-0">
            <CardBody>
              <form>
                <Row className="align-items-center">
                  <Col lg={12}>
                    <div className="check-icon text-center">
                      <Image src={partyImage} alt="party" className="img-fluid" />
                      <h4 className="fw-semibold mt-3">Thank You !</h4>
                      <p className="mb-1">Your Transaction Was Successful</p>
                      <p>
                        <span className="text-dark fw-medium">Order Id</span> : #0758267/90
                      </p>
                    </div>
                    <hr />
                    <Row className="justify-content-between">
                      <Col lg={4} xs={6}>
                        <span className="fw-semibold text-muted fs-14">Date</span>
                        <p className="text-dark fw-medium mt-1">23 April, 2024</p>
                      </Col>
                      <Col lg={4} xs={6} className="text-end">
                        <span className="fw-semibold text-muted fs-14">Time</span>
                        <p className="text-dark fw-medium">11:28 AM</p>
                      </Col>
                    </Row>
                    <div className="row justify-content-between mt-3 align-items-center">
                      <Col lg={6} xs={6}>
                        <span className="fw-semibold text-muted fs-14">To</span>
                        <p className="text-dark fw-medium mb-0 mt-1">Gaston Lapierre</p>
                        <p className="mb-0">hello@dundermuffilin.com</p>
                      </Col>
                      <Col lg={4} xs={6} className="text-end">
                        <Image src={avatar1} alt="avatar-1" className="avatar rounded-circle" />
                      </Col>
                    </div>
                    <div className="row justify-content-between mt-3 align-items-center">
                      <Col lg={6} xs={6}>
                        <span className="fw-semibold text-muted fs-14">Amount</span>
                        <h5 className="fw-medium mt-1">$737.00</h5>
                      </Col>
                      <Col lg={4} xs={6} className="text-end">
                        <span className="text-success fw-semibold">
                          Completed <IconifyIcon icon="bx:check-circle" className="align-middle" />
                        </span>
                      </Col>
                    </div>
                  </Col>
                </Row>
              </form>
            </CardBody>
            <div data-bs-theme="dark">
              <CardFooter className="d-flex align-items-center border-0 bg-body gap-3 rounded">
                <div className="rounded-3 avatar bg-light d-flex align-items-center justify-content-center">
                  <Image src={mastercardImg} alt="mastercard-Img" className="avatar-sm" />
                </div>
                <div className="d-block">
                  <p className="text-white fw-semibold mb-0">Credit/Debit Card</p>
                  <p className="mb-0 text-white-50">
                    <span>Master Card ending **** 7812</span>
                  </p>
                </div>
                <div className="ms-auto">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Download Invoice</Tooltip>}>
                    <Link href="" className="text-primary fs-30" data-bs-toggle="tooltip" data-bs-title="Download Invoice" data-bs-placement="bottom">
                      <IconifyIcon icon="solar:download-square-bold" className="align-middle" />
                    </Link>
                  </OverlayTrigger>
                </div>
              </CardFooter>
            </div>
          </Card>
        </ModalBody>
      </Modal>
    </>;
};
export default OrderSummary;