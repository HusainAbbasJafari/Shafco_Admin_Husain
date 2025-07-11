import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllOrders } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Card, CardBody, CardFooter, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Purchase List'
};
const PurchaseListPage = async () => {
  const PurchaseListPage = await getAllOrders();
  return <>
      <PageTItle title="PURCHASE LIST" />
      <Row>
        <Col xl={12}>
          <Card>
            <div className="d-flex card-header justify-content-between align-items-center">
              <div>
                <CardTitle as={'h4'}>All Purchase Items</CardTitle>
              </div>
              <Dropdown>
                <DropdownToggle as={'a'} href="#" className="btn btn-sm btn-outline-light rounded content-none icons-center" data-bs-toggle="dropdown" aria-expanded="false">
                  This Month <IconifyIcon className="ms-1" width={16} height={16} icon="bx:chevron-down" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem href="" className="dropdown-item">
                    Download
                  </DropdownItem>
                  <DropdownItem href="" className="dropdown-item">
                    Export
                  </DropdownItem>
                  <DropdownItem href="" className="dropdown-item">
                    Import
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <CardBody className="p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th style={{
                      width: 20
                    }}>
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="customCheck1" />
                          <label className="form-check-label" htmlFor="customCheck1" />
                        </div>
                      </th>
                      <th>ID</th>
                      <th>Order By</th>
                      <th>Items</th>
                      <th>Purchase Status</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Payment Method</th>
                      <th>Payment Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PurchaseListPage.map((item, idx) => <tr key={idx}>
                        <td>
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="customCheck2" />
                            <label className="form-check-label" htmlFor="customCheck2">
                              &nbsp;
                            </label>
                          </div>
                        </td>
                        <td>
                          <Link href="" className="text-body">
                            {item.id}
                          </Link>{' '}
                        </td>
                        <td>
                          {item.customer?.image && <Image src={item.customer?.image} className="avatar-sm rounded-circle me-2" alt="..." />}{' '}
                          {item.customer?.name}
                        </td>
                        <td>{item.product?.title}</td>
                        <td>
                          {' '}
                          <span className="badge bg-success text-white py-1 px-2">Items Received</span>{' '}
                        </td>
                        <td>{item.product?.date.toLocaleString('en-us', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}</td>
                        <td> ${item.product?.price} </td>
                        <td> {item.paymentMethod} </td>
                        <td>
                          {' '}
                          <span className={`badge bg-${item.orderStatus == 'Packaging' ? 'primary-subtle' : item.orderStatus == 'Canceled' ? 'danger-subtle' : 'success-subtle'} text-${item.orderStatus == 'Packaging' ? 'primary' : item.orderStatus == 'Canceled' ? 'danger' : 'success'} py-1 px-2`}>
                            {item.orderStatus}
                          </span>{' '}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Link href="" className="btn btn-light btn-sm">
                              <IconifyIcon icon="solar:eye-broken" className="align-middle fs-18" />
                            </Link>
                            <Link href="" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                              <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                            </Link>
                            <Link href="" className="btn btn-soft-danger btn-sm">
                              <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                            </Link>
                          </div>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </CardBody>
            <CardFooter className="border-top">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mb-0">
                  <li className="page-item">
                    <Link className="page-link" href="">
                      Previous
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="">
                      Next
                    </Link>
                  </li>
                </ul>
              </nav>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </>;
};
export default PurchaseListPage;