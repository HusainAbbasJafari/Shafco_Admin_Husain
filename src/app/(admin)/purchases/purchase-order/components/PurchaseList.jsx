import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import { getAllOrders } from '@/helpers/data';
import Link from 'next/link';
import React from 'react';
import { Card, CardBody, CardFooter, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
const PurchaseList = async () => {
  const purchaseData = await getAllOrders();
  return <Row>
      <Col xl={12}>
        <Card>
          <div className="d-flex card-header justify-content-between align-items-center">
            <div>
              <CardTitle as={'h4'}>All Order Items</CardTitle>
            </div>
            <Dropdown>
              <DropdownToggle as={'a'} href="#" className="btn btn-sm btn-outline-light rounded content-none icons-center" data-bs-toggle="dropdown" aria-expanded="false">
                This Month <IconifyIcon className='ms-1' width={16} height={16} icon='bx:chevron-down' />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>Download</DropdownItem>
                <DropdownItem>Export</DropdownItem>
                <DropdownItem>Import</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <CardBody className="p-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover table-centered">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Order Date</th>
                    <th>Total</th>
                    <th>Order Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseData.map((item, idx) => <tr key={idx}>
                        <td>{item.customer?.name}</td>
                        <td>{item.customer?.email}</td>
                        <td>{item.product?.date.toLocaleString('en-us', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}</td>
                        <td>{currency}289.00</td>
                        <td><span className={`badge bg-${item.orderStatus == 'Canceled' ? 'danger-subtle' : item.orderStatus == 'Packaging' ? 'warning-subtle' : 'success-subtle'} text-${item.orderStatus == 'Canceled' ? 'danger' : item.orderStatus == 'Packaging' ? 'warning' : 'success'} py-1 px-2`}>{item.status}</span></td>
                        <td>
                          <div className="d-flex gap-2">
                            <Link href="" className="btn btn-light btn-sm"><IconifyIcon icon="solar:eye-broken" className="align-middle fs-18" /></Link>
                            <Link href="" className="btn btn-soft-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" /></Link>
                            <Link href="" className="btn btn-soft-danger btn-sm"><IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" /></Link>
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
                <li className="page-item"><Link className="page-link" href="">Previous</Link></li>
                <li className="page-item active"><Link className="page-link" href="">1</Link></li>
                <li className="page-item"><Link className="page-link" href="">2</Link></li>
                <li className="page-item"><Link className="page-link" href="">3</Link></li>
                <li className="page-item"><Link className="page-link" href="">Next</Link></li>
              </ul>
            </nav>
          </CardFooter>
        </Card>
      </Col>
    </Row>;
};
export default PurchaseList;