import zaraImg from '@/assets/images/seller/zara.svg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, Col, Dropdown, DropdownMenu, DropdownToggle, ProgressBar, Row } from 'react-bootstrap';
const SellerDetails = () => {
  return <Col xl={3} md={6}>
      <Card>
        <CardBody>
          <div className="position-relative bg-light p-2 rounded text-center">
            <Image src={zaraImg} alt="zaraImg" className="avatar-xxl" />
            <div className="position-absolute top-0 end-0 m-1">
              <Dropdown>
                <DropdownToggle as={'a'} className="arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                  <IconifyIcon icon="iconamoon:menu-kebab-vertical-circle-duotone" className="fs-20 align-middle text-muted" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <Link href="" className="dropdown-item">
                    Download
                  </Link>
                  <Link href="" className="dropdown-item">
                    Export
                  </Link>
                  <Link href="" className="dropdown-item">
                    Import
                  </Link>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-between my-3">
            <div>
              <h4 className="mb-1">
                ZARA International<span className="text-muted fs-13 ms-1">(Fashion) </span>
              </h4>
              <div>
                <Link href="" className="link-primary fs-16 fw-medium">
                  www.zarafashion.co
                </Link>
              </div>
            </div>
            <div>
              <p className="mb-0">
                <span className="badge bg-light text-dark fs-12 me-1">
                  <IconifyIcon icon="bxs:star" className="align-text-top fs-14 text-warning me-1" /> 4.5
                </span>
                3.5k
              </p>
            </div>
          </div>
          <div>
            <p className="d-flex align-items-center gap-2 mb-1">
              <IconifyIcon icon="solar:point-on-map-bold-duotone" className="fs-18 text-primary" />
              4604 , Philli Lane Kiowa IN 47404
            </p>
            <p className="d-flex align-items-center gap-2 mb-1">
              <IconifyIcon icon="solar:letter-bold-duotone" className="fs-18 text-primary" />
              zarafashionworld@dayrep.com
            </p>
            <p className="d-flex align-items-center gap-2 mb-0">
              <IconifyIcon icon="solar:outgoing-call-rounded-bold-duotone" className="fs-20 text-primary" />
              +243 812-801-9335
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-3 mb-1">
            <p className="mb-0 fs-15 fw-medium text-dark">Fashion</p>
            <div>
              <p className="mb-0 fs-15 fw-medium text-dark">
                {currency}200k{' '}
                <span className="ms-1">
                  <IconifyIcon icon="solar:course-up-outline" className="text-success" />
                </span>
              </p>
            </div>
          </div>
          <ProgressBar variant="danger" striped animated className="progress-soft progress-md" role="progressbar" now={80} aria-valuemin={0} aria-valuemax={100} />
          <div className="p-2 pb-0 mx-n3 mt-2">
            <Row className="text-center g-2">
              <Col lg={4} xs={4} className=" border-end">
                <h5 className="mb-1">865</h5>
                <p className="text-muted mb-0">Item Stock</p>
              </Col>
              <Col lg={4} xs={4} className=" border-end">
                <h5 className="mb-1">+4.5k</h5>
                <p className="text-muted mb-0">Sells</p>
              </Col>
              <Col lg={4} xs={4}>
                <h5 className="mb-1">+2k</h5>
                <p className="text-muted mb-0">Happy Client</p>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </Col>;
};
export default SellerDetails;