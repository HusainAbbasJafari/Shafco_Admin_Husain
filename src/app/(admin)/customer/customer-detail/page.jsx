import userProfile from '@/assets/images/user-profile.png';
import avatar2 from '@/assets/images/users/avatar-2.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getAllOrders } from '@/helpers/data';
import Image from 'next/image';
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import CustomerChart from './components/CustomerChart';
import CustomerDetailsCard from './components/CustomerDetailsCard';
import { latestInvoice } from './data';
import PageTItle from '@/components/PageTItle';
import Link from 'next/link';
const ProfileCard = () => {
  return <Card className="overflow-hidden">
      <CardBody>
        <div className="bg-primary profile-bg rounded-top p-5 position-relative mx-n3 mt-n3">
          <Image src={avatar2} alt="avatar" className="avatar-lg border border-light border-3 rounded-circle position-absolute top-100 start-0 translate-middle ms-5" />
        </div>
        <div className="mt-4 pt-3">
          <h4 className="mb-1">
            {' '}
            Michael A. Miner
            <IconifyIcon icon="bxs:badge-check" className="text-success align-middle" />
          </h4>
          <div className="mt-2">
            <Link href="" className="link-primary fs-15">
              @michael_cus_2024
            </Link>
            <p className="fs-15 mb-1 mt-1">
              <span className="text-dark fw-semibold">Email : </span> michaelaminer@dayrep.com
            </p>
            <p className="fs-15 mb-0 mt-1">
              <span className="text-dark fw-semibold">Phone : </span> +28 (57) 760-010-27
            </p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="border-top gap-1 hstack">
        <Link href="" className="btn btn-primary w-100">
          Send Message
        </Link>
        <Link href="" className="btn btn-light w-100">
          Analytics
        </Link>
        <Link href="" className="btn btn-soft-dark d-inline-flex align-items-center justify-content-center rounded avatar-sm">
          {' '}
          <span>
            <IconifyIcon width={18} height={18} icon="bx:edit-alt" className="fs-18" />
          </span>
        </Link>
      </CardFooter>
    </Card>;
};
const CustomerDetails = () => {
  return <Card>
      <CardHeader className="d-flex align-items-center justify-content-between">
        <div>
          <CardTitle as={'h4'}>Customer Details</CardTitle>
        </div>
        <div>
          <span className="badge bg-success-subtle text-success px-2 py-1">Active User</span>
        </div>
      </CardHeader>
      <CardBody className=" py-2">
        <div className="table-responsive">
          <table className="table mb-0">
            <tbody>
              <tr>
                <td className="px-0">
                  <p className="d-flex mb-0 align-items-center gap-1 fw-semibold text-dark">Account ID : </p>
                </td>
                <td className="text-dark fw-medium px-0">#AC-278699</td>
              </tr>
              <tr>
                <td className="px-0">
                  <p className="d-flex mb-0 align-items-center gap-1 fw-semibold text-dark"> Invoice Email : </p>
                </td>
                <td className="text-dark fw-medium px-0">michaelaminer@dayrep.com</td>
              </tr>
              <tr>
                <td className="px-0">
                  <p className="d-flex mb-0 align-items-center gap-1 fw-semibold text-dark"> Delivery Address : </p>
                </td>
                <td className="text-dark fw-medium px-0">62, rue des Nations Unies 22000 SAINT-BRIEUC</td>
              </tr>
              <tr>
                <td className="px-0">
                  <p className="d-flex mb-0 align-items-center gap-1 fw-semibold text-dark"> Language : </p>
                </td>
                <td className="text-dark fw-medium px-0">English</td>
              </tr>
              <tr>
                <td className="px-0">
                  <p className="d-flex mb-0 align-items-center gap-1 fw-semibold text-dark"> Latest Invoice Id : </p>
                </td>
                <td className="text-dark fw-medium px-0">#INV2540</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>;
};
const LatestInvoiceCard = ({
  title,
  date
}) => {
  return <div className="d-flex p-2 rounded align-items-center gap-2 bg-light-subtle">
      <div className="avatar bg-primary-subtle d-flex align-items-center justify-content-center rounded-circle">
        <IconifyIcon icon="solar:file-download-bold" className="text-primary fs-3" />
      </div>
      <div className="d-block">
        <Link href="" className="text-dark fw-medium">
          {title}
        </Link>
        <p className="text-muted mb-0 fs-13">{date.toLocaleString('en-us', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })}</p>
      </div>
      <div className="ms-auto text-end">
        <Dropdown>
          <DropdownToggle as={'a'} className="dropdown-toggle arrow-none card-drop p-0" data-bs-toggle="dropdown" aria-expanded="false">
            <IconifyIcon icon="bx:dots-vertical-rounded" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <Link href="" className="dropdown-item">
              Download
            </Link>
            <Link href="" className="dropdown-item">
              Share
            </Link>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>;
};
export const metadata = {
  title: 'Customer Detail'
};
const CustomerDetailPage = async () => {
  const transactionHistoryData = await getAllOrders();
  return <>
      <PageTItle title="CUSTOMER DETAILS" />
      <Row>
        <Col lg={4}>
          <ProfileCard />
          <CustomerDetails />
          <Card>
            <CardHeader className="border-bottom border-dashed">
              <div className="d-flex align-items-center gap-2">
                <div className="d-block">
                  <CardTitle as={'h4'} className="card-title mb-1">
                    Latest Invoice
                  </CardTitle>
                  <p className="mb-0 text-muted">Total 234 file, 2.5GB space used</p>
                </div>
                <div className="ms-auto">
                  <Link href="" className="btn btn-primary btn-sm">
                    View All
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              {latestInvoice.map((item, idx) => <LatestInvoiceCard key={idx} {...item} />)}
            </CardBody>
          </Card>
        </Col>
        <Col lg={8}>
          <Row>
            <CustomerDetailsCard />
          </Row>

          <Card>
            <CardHeader>
              <CardTitle as={'h4'}>Transaction History</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover table-centered">
                  <thead className="bg-light-subtle">
                    <tr>
                      <th>Invoice ID</th>
                      <th>Status</th>
                      <th>Total Amount</th>
                      <th>Due Date</th>
                      <th>Payment Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionHistoryData.slice(0, 5).map((item, idx) => <tr key={idx}>
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
                        <td> ${item.total}.00 </td>
                        <td> {item.product?.date.toLocaleString('en-us', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}</td>
                        <td> {item.paymentMethod} </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </CardBody>
            <CardFooter className="border-top">
              <ul className="pagination pagination-rounded m-0 justify-content-end">
                <li className="page-item">
                  <Link href="" className="page-link">
                    <IconifyIcon icon="bx:left-arrow-alt" />
                  </Link>
                </li>
                <li className="page-item active">
                  <Link href="" className="page-link">
                    1
                  </Link>
                </li>
                <li className="page-item">
                  <Link href="" className="page-link">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link href="" className="page-link">
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link href="" className="page-link">
                    <IconifyIcon icon="bx:right-arrow-alt" />
                  </Link>
                </li>
              </ul>
            </CardFooter>
          </Card>

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody className=" text-center">
                  <Image src={userProfile} alt="use-profile" className="img-fluid" />
                  <h4>
                    <IconifyIcon icon="bxs:coin-stack" className="text-primary" /> 3,764 <span className="text-muted fw-medium">Points Earned</span>{' '}
                  </h4>
                  <p className="mb-0">Collect reward points with each purchase.</p>
                </CardBody>
                <CardFooter className="border-top gap-1 hstack">
                  <Link href="" className="btn btn-primary w-100">
                    Earn Point
                  </Link>
                  <Link href="" className="btn btn-light w-100">
                    View Items
                  </Link>
                </CardFooter>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <div className="d-flex gap-3">
                    <div className="avatar bg-light d-flex align-items-center justify-content-center rounded-circle">
                      <IconifyIcon icon="bx:down-arrow-alt" className="fs-30" />
                    </div>
                    <div className="d-block">
                      <h4 className="text-dark fw-medium mb-1">Payment Arrived</h4>
                      <p className="mb-0 text-muted">23 min ago</p>
                    </div>
                    <div className="ms-auto">
                      <h4 className="text-dark fw-medium mb-1">$ 1,340</h4>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <CustomerChart />
            </Col>
          </Row>
        </Col>
      </Row>
    </>;
};
export default CustomerDetailPage;