import logoDark from '@/assets/images/logo-dark.png';
import CustomFlatpickr from '@/components/CustomFlatpickr';
import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';
import { Alert, Card, CardBody, Col, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Invoice Add'
};
const InvoiceAddPage = () => {
  return <>
      <PageTItle title="INVOICES CREATE" />
      <Row className="justify-content-center">
        <Col lg={10}>
          <Card>
            <CardBody>
              <div className="pb-3 mb-4 position-relative border-bottom">
                <Row className="justify-content-between">
                  <Col lg={5}>
                    <div>
                      <div className="w-50 auth-logo  bg-light-subtle p-2 border-primary rounded" style={{
                      borderStyle: 'dashed',
                      border: '1',
                      borderWidth: 1
                    }}>
                        <div className="profile-photo-edit">
                          <input id="profile-img-file-input" type="file" className="profile-img-file-input" />
                          <label htmlFor="profile-img-file-input" className="profile-photo-edit avatar-xs">
                            <Image src={logoDark} className="logo-dark me-1 user-profile-image" alt="user-profile-image" height={24} />
                          </label>
                        </div>
                      </div>
                      <div className="mt-5 pt-2">
                        <form>
                          <div className="mb-3">
                            <label htmlFor="sender-name" className="form-label text-dark">
                              Sender Name
                            </label>
                            <input type="text" id="sender-name" className="form-control" placeholder="First name" />
                          </div>
                        </form>
                        <form>
                          <div className="mb-3">
                            <label htmlFor="sender-address" className="form-label text-dark">
                              Sender Full Address
                            </label>
                            <textarea className="form-control" id="sender-address" rows={3} placeholder="Enter address" defaultValue={''} />
                          </div>
                        </form>
                        <form>
                          <div className="mb-3">
                            <label htmlFor="sender-number" className="form-label text-dark">
                              Phone number
                            </label>
                            <input type="number" id="sender-number" className="form-control" placeholder="Number" />
                          </div>
                        </form>
                      </div>
                    </div>
                  </Col>
                  <Col lg={5}>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="invoice-no" className="form-label text-dark">
                          Invoice Number :
                        </label>
                        <input type="text" id="invoice-no" className="form-control" placeholder="#INV-****" defaultValue="#INV-0758267/90" />
                      </div>
                    </form>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="schedule-date" className="form-label text-dark">
                          Issue Date :
                        </label>
                        <CustomFlatpickr className="form-control" placeholder="Basic datepicker" options={{
                        enableTime: false
                      }} />
                      </div>
                    </form>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="due-date" className="form-label text-dark">
                          Due Date :
                        </label>
                        <CustomFlatpickr className="form-control flatpickr-input active" placeholder="dd-mm-yyyy" options={{
                        enableTime: false
                      }} />
                      </div>
                    </form>
                    <form>
                      <label htmlFor="product-price" className="form-label text-dark">
                        Amount :
                      </label>
                      <div className="input-group mb-3">
                        <span className="input-group-text fs-20 bg-light text-dark">
                          <IconifyIcon icon="bx:dollar" />
                        </span>
                        <input type="number" id="product-price" className="form-control" placeholder={'000'} />
                      </div>
                    </form>
                    <form>
                      <label htmlFor="status" className="form-label text-dark">
                        Status :
                      </label>
                      <ChoicesFormInput className="form-select" id="status" aria-label="Default select example">
                        <option>Paid</option>
                        <option value="Cancel">Cancel</option>
                        <option value="Pending">Pending</option>
                      </ChoicesFormInput>
                    </form>
                  </Col>
                </Row>
              </div>
              <Row className="justify-content-between">
                <Col lg={5}>
                  <h4 className="mb-3">Issue From :</h4>
                  <form>
                    <div className="mb-2">
                      <input type="text" id="buyer-from" className="form-control" placeholder="First name" />
                    </div>
                  </form>
                  <form>
                    <div className="mb-2">
                      <textarea className="form-control" id="buyer-address" rows={3} placeholder="Enter address" defaultValue={''} />
                    </div>
                  </form>
                  <form>
                    <div className="mb-2">
                      <input type="number" id="buyer-number" className="form-control" placeholder="Number" />
                    </div>
                  </form>
                  <form>
                    <div className="mb-2">
                      <input type="email" id="buyer-email" className="form-control" placeholder="Email Address" />
                    </div>
                  </form>
                </Col>
                <Col lg={5}>
                  <h4 className="mb-3">Issue For :</h4>
                  <form>
                    <div className="mb-2">
                      <input type="text" id="issuer-from" className="form-control" placeholder="First name" />
                    </div>
                  </form>
                  <form>
                    <div className="mb-2">
                      <textarea className="form-control" id="issuer-address" rows={3} placeholder="Enter address" defaultValue={''} />
                    </div>
                  </form>
                  <form>
                    <div className="mb-2">
                      <input type="number" id="issuer-number" className="form-control" placeholder="Number" />
                    </div>
                  </form>
                  <form>
                    <div className="mb-2">
                      <input type="email" id="issuer-email" className="form-control" placeholder="Email Address" />
                    </div>
                  </form>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col xs={12}>
                  <div className="table-responsive table-borderless text-nowrap table-centered">
                    <table className="table mb-0">
                      <thead className="bg-light bg-opacity-50">
                        <tr>
                          <th className="border-0 py-2">Product Name</th>
                          <th className="border-0 py-2">Quantity</th>
                          <th className="border-0 py-2">Price</th>
                          <th className="border-0 py-2">Tax</th>
                          <th className="border-0 py-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="d-flex gap-3">
                              <div className="auth-logo border-0 rounded" style={{
                              borderStyle: 'dashed !important'
                            }}>
                                <div className="profile-photo-edit">
                                  <input id="profile-img-file-input1" type="file" className="profile-img-file-input1" />
                                  <label htmlFor="profile-img-file-input1" className="profile-photo-edit avatar bg-light rounded"></label>
                                </div>
                              </div>
                              <div className="w-75">
                                <form>
                                  <div className="mb-3">
                                    <input type="text" id="product-name" className="form-control" placeholder="Product Name" />
                                  </div>
                                </form>
                                <form>
                                  <div className="mb-3">
                                    <input type="text" id="product-name" className="form-control" placeholder="Product Size" />
                                  </div>
                                </form>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="quantity">
                              <div className="input-step border bg-body-secondary p-1 rounded d-inline-flex overflow-visible">
                                <button type="button" className="minus bg-light text-dark border-0 rounded-1 fs-20 lh-1 h-100">
                                  -
                                </button>
                                <input type="number" className="text-dark text-center border-0 bg-body-secondary rounded h-100" defaultValue={1} min={0} max={100} readOnly />
                                <button type="button" className="plus bg-light text-dark border-0 rounded-1 fs-20 lh-1 h-100">
                                  +
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>
                            <form>
                              <div className="input-group">
                                <span className="input-group-text fs-20 bg-light text-dark">
                                  <IconifyIcon icon="bx:dollar" />
                                </span>
                                <input type="number" id="product-price-table" className="form-control" placeholder={'000'} />
                              </div>
                            </form>
                          </td>
                          <td>
                            <form>
                              <div className="input-group">
                                <span className="input-group-text fs-20 bg-light text-dark">
                                  <IconifyIcon icon="bx:dollar" />
                                </span>
                                <input type="number" id="product-tax" className="form-control" placeholder={'000'} />
                              </div>
                            </form>
                          </td>
                          <td>
                            <form>
                              <div className="input-group">
                                <span className="input-group-text fs-20 bg-light text-dark">
                                  <IconifyIcon icon="bx:dollar" />
                                </span>
                                <input type="number" id="total" className="form-control" placeholder={'000'} />
                              </div>
                            </form>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-end border-top">
                    <div className="pt-3">
                      <Link href="" className="btn btn-primary">
                        Clear Product
                      </Link>
                      &nbsp;
                      <Link href="" className="btn btn-outline-primary">
                        Add More
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-end">
                <Col lg={4}>
                  <label htmlFor="sub-total" className="form-label text-dark">
                    Sub Total :
                  </label>
                  <div className="input-group mb-3">
                    <span className="input-group-text fs-20 bg-light text-dark">
                      <IconifyIcon icon="bx:dollar" />
                    </span>
                    <input type="number" id="sub-total" className="form-control" />
                  </div>
                  <label htmlFor="discount-price" className="form-label text-dark">
                    Discount :
                  </label>
                  <div className="input-group mb-3">
                    <span className="input-group-text fs-20 bg-light text-dark">
                      <IconifyIcon icon="bx:dollar" />
                    </span>
                    <input type="number" id="discount-price" className="form-control" />
                  </div>
                  <label htmlFor="discount-price" className="form-label text-dark">
                    Estimated Tax (15.5%) :
                  </label>
                  <div className="input-group mb-3">
                    <span className="input-group-text fs-20 bg-light text-dark">
                      <IconifyIcon icon="bx:dollar" />
                    </span>
                    <input type="number" id="discount-price" className="form-control" />
                  </div>
                  <div className="border-top">
                    <label htmlFor="grand-total" className="form-label text-dark pt-3">
                      Grand Amount :
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text fs-20 bg-light text-dark">
                        <IconifyIcon icon="bx:dollar" />
                      </span>
                      <input type="number" id="grand-total" className="form-control" />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={12}>
                  <Alert className="alert-danger alert-icon p-2" role="alert">
                    <div className="d-flex align-items-center">
                      <div className="avatar-sm rounded bg-danger d-flex justify-content-center align-items-center fs-18 me-2 flex-shrink-0">
                        <IconifyIcon icon="bx-info-circle" className="text-white" />
                      </div>
                      <div className="flex-grow-1">
                        All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment
                        online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged
                        the agreed quoted fee noted above.
                      </div>
                    </div>
                  </Alert>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>;
};
export default InvoiceAddPage;