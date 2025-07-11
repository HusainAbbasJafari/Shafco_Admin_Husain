import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getSellersData } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, CardFooter, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ProgressBar, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Seller List'
};
const SellersCard = ({
  address,
  amount,
  category,
  clients,
  email,
  image,
  itemStock,
  phone,
  progress,
  rating,
  sells,
  title,
  url
}) => {
  return <Card>
      <CardBody>
        <div className="position-relative bg-light p-2 rounded text-center">
          <Image src={image} alt="SellersImage" className="avatar-xxl" />
          <div className="position-absolute top-0 end-0 m-1">
            <Dropdown>
              <DropdownToggle as={'a'} className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                <IconifyIcon icon="iconamoon:menu-kebab-vertical-circle-duotone" className="fs-20 align-middle text-muted" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>Download</DropdownItem>
                <DropdownItem>Export</DropdownItem>
                <DropdownItem>Import</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-between my-3">
          <div>
            <h4 className="mb-1">
              {title}
              <span className="text-muted fs-13 ms-1">({category}) </span>
            </h4>
            <div>
              <Link href="" className="link-primary fs-16 fw-medium">
                {url}
              </Link>
            </div>
          </div>
          <div>
            <p className="mb-0">
              <span className="badge bg-light text-dark fs-12 me-1">
                <IconifyIcon icon="bxs-star" className="align-text-top fs-14 text-warning me-1" />
                {rating.star}
              </span>
              {rating.review}k
            </p>
          </div>
        </div>
        <div>
          <p className="d-flex align-items-center gap-2 mb-1">
            <IconifyIcon icon="solar:point-on-map-bold-duotone" className="fs-18 text-primary" />
            {address}
          </p>
          <p className="d-flex align-items-center gap-2 mb-1">
            <IconifyIcon icon="solar:letter-bold-duotone" className="fs-18 text-primary" />
            {email}
          </p>
          <p className="d-flex align-items-center gap-2 mb-0">
            <IconifyIcon icon="solar:outgoing-call-rounded-bold-duotone" className="fs-20 text-primary" />
            {phone}
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-3 mb-1">
          <p className="mb-0 fs-15 fw-medium text-dark">{category}</p>
          <div>
            <p className="mb-0 fs-15 fw-medium text-dark">
              ${amount}k{' '}
              <span className="ms-1">
                <IconifyIcon icon="solar:course-up-outline" className="text-success" />
              </span>
            </p>
          </div>
        </div>
        <ProgressBar animated striped variant="danger" className="progress-md" role="progressbar" now={progress} />
        <div className="p-2 pb-0 mx-n3 mt-2">
          <Row className="text-center g-2">
            <Col lg={4} xs={4} className=" border-end">
              <h5 className="mb-1">{itemStock}</h5>
              <p className="text-muted mb-0">Item Stock</p>
            </Col>
            <Col lg={4} xs={4} className=" border-end">
              <h5 className="mb-1">+{sells}k</h5>
              <p className="text-muted mb-0">Sells</p>
            </Col>
            <Col lg={4} xs={4}>
              <h5 className="mb-1">+{clients}k</h5>
              <p className="text-muted mb-0">Happy Client</p>
            </Col>
          </Row>
        </div>
      </CardBody>
      <CardFooter className="border-top gap-1 hstack">
        <Link href="" className="btn btn-primary w-100">
          View Profile
        </Link>
        <Link href="" className="btn btn-light w-100">
          Edit Profile
        </Link>
        <Link href="" className="btn btn-soft-danger d-inline-flex align-items-center justify-content-center rounded-circle avatar-sm">
          <span>
            <IconifyIcon width={18} height={18} icon="bx-heart" className="fs-4 align-middle" />
          </span>
        </Link>
      </CardFooter>
    </Card>;
};
const SellerListPage = async () => {
  const sellersData = await getSellersData();
  return <>
      <PageTItle title="SELLERS LIST" />
      <Row>
        {sellersData.map((item, idx) => <Col xl={3} md={6} key={idx}>
            <SellersCard {...item} />
          </Col>)}
      </Row>
    </>;
};
export default SellerListPage;