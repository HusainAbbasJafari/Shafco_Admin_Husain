import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllOrders } from '@/helpers/data';
import Link from 'next/link';
import { Card, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
const ReceivedOrderData = async () => {
  const receivedOrderData = await getAllOrders();
  return <Row>
      <Col xl={12}>
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center">
            <div>
              <CardTitle as={'h4'}>All Received Order</CardTitle>
            </div>
            <Dropdown>
              <DropdownToggle as={'a'} className="btn btn-sm btn-outline-light rounded" data-bs-toggle="dropdown" aria-expanded="false">
                This Month
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
          </CardHeader>
          <div>
            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover table-centered">
                <thead className="bg-light-subtle">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Payment Status</th>
                    <th>Received Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {receivedOrderData.map((item, idx) => <tr key={idx}>
                      <td>{item.id}/80</td>
                      <td>{item.customer?.name}</td>
                      <td>{item.orders}</td>
                      <td>${item.product?.price}.00</td>
                      <td>
                        <span className={`badge bg-${item.paymentStatus == 'Paid' ? 'secondary' : item.paymentStatus == 'Unpaid' ? 'warning' : 'primary'} text-white py-1 px-2`}>
                          {item.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <span className={`badge bg-${item.status == 'Delivered' ? 'success-subtle' : item.status == 'Processing' ? 'warning-subtle' : 'primary-subtle'}  text-${item.status == 'Delivered' ? 'success' : item.status == 'Processing' ? 'warning' : 'primary'}  py-1 px-2`}>
                          {item.status}
                        </span>
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
export default ReceivedOrderData;