import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllOrders } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Card, CardFooter, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
const CustomerDataList = async () => {
  const customerData = await getAllOrders();
  return <Row>
      <Col xl={12}>
        <Card>
          <div className="d-flex card-header justify-content-between align-items-center">
            <div>
              <CardTitle as={'h4'}>All Customers List</CardTitle>
            </div>
            <Dropdown>
              <DropdownToggle className="btn btn-sm btn-outline-light content-none icons-center" data-bs-toggle="dropdown" aria-expanded="false">
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
          <div>
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
                    <th>Customer Name</th>
                    <th>Invoice ID</th>
                    <th>Status</th>
                    <th>Total Amount</th>
                    <th>Amount Due</th>
                    <th>Due Date</th>
                    <th>Payment Method</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customerData.map((item, idx) => <tr key={idx}>
                      <td>
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="customCheck2" />
                          <label className="form-check-label" htmlFor="customCheck2">
                            &nbsp;
                          </label>
                        </div>
                      </td>
                      <td>
                        {' '}
                        {item.customer?.image && <Image src={item.customer.image} className="avatar-sm rounded-circle me-2" alt="..." />}{' '}
                        {item.customer?.name}
                      </td>
                      <td>
                        <Link href="" className="text-body">
                          {item.id}
                        </Link>{' '}
                      </td>
                      <td>
                        {' '}
                        <span className={`badge bg-${item.orderStatus == 'Canceled' ? 'danger' : item.orderStatus == 'Packaging' ? 'primary' : item.orderStatus == 'Draft' ? 'warning' : 'success'}-subtle text-${item.orderStatus == 'Canceled' ? 'danger' : item.orderStatus == 'Packaging' ? 'primary' : item.orderStatus == 'Draft' ? 'warning' : 'success'} py-1 px-2`}>
                          {item.orderStatus}
                        </span>{' '}
                      </td>
                      <td> ${item.total} </td>
                      <td> ${item.amountDue} </td>
                      <td> {item.product?.date.toLocaleString('en-us', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}</td>
                      <td> {item.paymentMethod} </td>
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
          </div>
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
    </Row>;
};
export default CustomerDataList;