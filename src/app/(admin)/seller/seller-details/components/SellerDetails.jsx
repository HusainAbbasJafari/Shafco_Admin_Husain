import zaraImg from '@/assets/images/seller/zara.svg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import { Card, CardBody, CardTitle, Col, ProgressBar, Row } from 'react-bootstrap';
import { allSellsData, productCategoryData } from '../data';
import Link from 'next/link';
const ProductCategory = () => {
  return <div className="ps-lg-4">
      <CardTitle as={'h4'}>Profit by Product Category</CardTitle>
      {productCategoryData.map((item, idx) => <>
          <div className="d-flex align-items-center justify-content-between mt-3 mb-1" key={idx}>
            <p className="mb-0 fs-15 fw-medium text-dark">{item.title}</p>
            <div>
              <p className="mb-0 fs-15 fw-medium text-dark">
                ${item.amount}k{' '}
                <span className="ms-1">
                  <IconifyIcon icon="solar:course-up-outline" className="text-success" />
                </span>
              </p>
            </div>
          </div>
          <ProgressBar variant={item.variant} animated striped className="progress-md  progress-bar-striped progress-bar-animated" role="progressbar" now={item.progress} />
        </>)}
    </div>;
};
const SellerDetails = () => {
  return <Row>
      <Col lg={12}>
        <Card>
          <CardBody>
            <Row className="g-3">
              <Col lg={2} className="text-lg-center">
                <div className="bg-body d-flex align-items-center justify-content-center rounded py-4">
                  <Image src={zaraImg} alt="Zara-img" className="avatar-xxl flex-shrink-0" />
                </div>
                <div className="mt-3">
                  <Link href="" className="btn btn-primary w-100">
                    View Stock Detail
                  </Link>
                </div>
              </Col>
              <Col lg={3} className="border-end">
                <div>
                  <h4 className="mb-1"> ZARA International</h4>
                  <p className="mb-1">(Most Selling Fashion Brand)</p>
                  <Link href="" className="link-primary fs-16 fw-medium">
                    www.larkon.co
                  </Link>
                  <div className="d-flex align-items-center justify-content-satrt gap-2 mt-2 mb-1">
                    <ul className="d-flex text-warning m-0 fs-20 list-unstyled">
                      <li className="icons-center">
                        <IconifyIcon icon="bxs:star" />
                      </li>
                      <li className="icons-center">
                        <IconifyIcon icon="bxs:star" />
                      </li>
                      <li className="icons-center">
                        <IconifyIcon icon="bxs:star" />
                      </li>
                      <li className="icons-center">
                        <IconifyIcon icon="bxs:star" />
                      </li>
                      <li className="icons-center">
                        <IconifyIcon icon="bxs:star-half" />
                      </li>
                    </ul>
                    <p className="fw-medium mb-0 text-dark fs-15">
                      4.5/5 <span className="fs-13">(+23.3K Review)</span>
                    </p>
                  </div>
                  <div className="mt-2">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                        <IconifyIcon icon="solar:point-on-map-bold-duotone" className="fs-20 text-primary" />
                      </div>
                      <p className="mb-0 fs-15">4604 , Philli Lane Kiowa IN 47404</p>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                        <IconifyIcon icon="solar:letter-bold-duotone" className="fs-20 text-primary" />
                      </div>
                      <p className="mb-0 fs-15">zarafashionworld@dayrep.com</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                        <IconifyIcon icon="solar:outgoing-call-rounded-bold-duotone" className="fs-20 text-primary" />
                      </div>
                      <p className="mb-0 fs-15">+243 812-801-9335</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={7}>
                <ProductCategory />
              </Col>
            </Row>
            <hr className="my-4" />
            <CardTitle as={'h4'} className="mb-2">
              Social Media :
            </CardTitle>
            <ul className="list-inline d-flex gap-1 mb-0 mt-3  align-items-center">
              <li className="list-inline-item">
                <Link href="" className="btn btn-soft-primary avatar-sm d-flex align-items-center justify-content-center fs-20">
                  <span>
                    {' '}
                    <IconifyIcon width={20} height={20} icon="bxl:facebook" />{' '}
                  </span>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="" className="btn btn-soft-danger avatar-sm d-flex align-items-center justify-content-center fs-20">
                  <span>
                    {' '}
                    <IconifyIcon width={20} height={20} icon="bxl:instagram" />{' '}
                  </span>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="" className="btn btn-soft-info avatar-sm d-flex align-items-center justify-content-center  fs-20">
                  <span>
                    {' '}
                    <IconifyIcon width={20} height={20} icon="bxl:twitter" />{' '}
                  </span>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="" className="btn btn-soft-success avatar-sm d-flex align-items-center justify-content-center fs-20">
                  <span>
                    {' '}
                    <IconifyIcon width={20} height={20} icon="bxl:whatsapp" />{' '}
                  </span>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="" className="btn btn-soft-warning avatar-sm d-flex align-items-center justify-content-center fs-20">
                  <span>
                    {' '}
                    <IconifyIcon width={20} height={20} icon="bx:envelope" />{' '}
                  </span>
                </Link>
              </li>
            </ul>
            <CardTitle as={'h4'} className="mt-3 mb-2">
              Our Story :
            </CardTitle>
            <p>
              At ZARA, we believe that fashion is more than just clothing—it&apos;s an expression of individuality and a celebration of diversity.
              Founded in 2003, our journey began with a simple yet powerful vision: to create high-quality, stylish, and comfortable apparel that
              resonates with people from all walks of life.
            </p>
            <CardTitle as={'h4'} className="my-2">
              Our Mission :
            </CardTitle>
            <p>
              Our mission is to redefine fashion by merging timeless elegance with contemporary design. We strive to offer clothing that not only
              looks good but also feels good, making everyday wear an enjoyable experience. At the heart of our brand is a commitment to quality,
              sustainability, and customer satisfaction.
            </p>
            <Row className="text-center g-2 mt-2">
              {allSellsData.map((item, idx) => <Col lg={3} xs={4} key={idx}>
                  <div className="bg-body p-2 rounded">
                    <h5 className="mb-1">{item.item}</h5>
                    <p className="text-muted mb-0">{item.title}</p>
                  </div>
                </Col>)}
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>;
};
export default SellerDetails;