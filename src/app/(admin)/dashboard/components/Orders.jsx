import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllOrders } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, CardBody, CardFooter, CardTitle, Col, Row } from 'react-bootstrap';
const Orders = async () => {
  const orderData = await getAllOrders();
  return <Col>
      <Card>
        <CardBody>
          <div className="d-flex align-items-center justify-content-between">
            <CardTitle as={'h4'}>Recent Orders</CardTitle>
            <Button variant="soft-primary" size="sm">
              <IconifyIcon icon="bx:plus" className="me-1" />
              Create Order
            </Button>
          </div>
        </CardBody>
        <div className="table-responsive table-centered">
          <table className="table mb-0">
            <thead className="bg-light bg-opacity-50">
              <tr>
                <th className="ps-3">Order ID.</th>
                <th>Date</th>
                <th>Product</th>
                <th>Customer Name</th>
                <th>Email ID</th>
                <th>Phone No.</th>
                <th>Address</th>
                <th>Payment Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderData.slice(0, 5).map((item, idx) => <tr key={idx}>
                  <td className="ps-3">
                    <Link href="/orders/order-detail">#{item.id}</Link>
                  </td>
                  <td>29 April 2024</td>
                  <td>{item.product?.image && <Image src={item.product?.image} alt="product-1(1)" className="img-fluid avatar-sm" />}</td>
                  <td>
                    <Link href="">{item.customer?.name}</Link>
                  </td>
                  <td>{item.customer?.email}</td>
                  <td>{item.customer?.phone}</td>
                  <td>{item.customer?.address}</td>
                  <td>{item.paymentMethod}</td>
                  <td>
                    <IconifyIcon icon="bxs:circle" className={`text-${item.status == 'Completed' ? 'success' : item.status == 'Processing' ? 'warning' : 'primary'} me-1`} />
                    {item.status}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <CardFooter className="border-top">
          {}
          <Row className="g-3">
            <div className="col-sm">
              <div className="text-muted">
                Showing
                <span className="fw-semibold">5</span>
                of
                <span className="fw-semibold">90,521</span>
                orders
              </div>
            </div>
            <Col sm={'auto'}>
              <ul className="pagination m-0">
                <li className="page-item">
                  <span role="button" className="page-link">
                    <IconifyIcon icon="bx:left-arrow-alt" />
                  </span>
                </li>
                <li className="page-item active">
                  <span role="button" className="page-link">
                    1
                  </span>
                </li>
                <li className="page-item">
                  <span role="button" className="page-link">
                    2
                  </span>
                </li>
                <li className="page-item">
                  <span role="button" className="page-link">
                    3
                  </span>
                </li>
                <li className="page-item">
                  <span role="button" className="page-link">
                    <IconifyIcon icon="bx:right-arrow-alt" />
                  </span>
                </li>
              </ul>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </Col>;
};
export default Orders;