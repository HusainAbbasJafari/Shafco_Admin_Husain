import qrCodeImg from '@/assets/images/qr-code.png';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
const ProfileAbout = () => {
  return <Row>
    {/* xl : 8 lg : 7 */}
      <Col xl={12} lg={12}>
        {/* <Card>
          <CardHeader>
            <CardTitle as={'h4'}>About</CardTitle>
          </CardHeader>
          <CardBody>
            <p>
              I&apos;m the model of the new Project Head Manager. I&apos;ve combined a deep background in brand management at blue chip CPG companies
              with eCommerce growth marketing at the world&apos;s biggest retailer. I&apos;ve run SingleFire I&apos;ve created world-class campaigns;
              I&apos;ve built digital marketing organizations from the ground up. I have over 20 years&apos; experience leading...{' '}
              <Link href="" className="text-primary">
                See more
              </Link>
            </p>
            <CardTitle as={'h4'} className="mb-2">
              My Approach :
            </CardTitle>
            <p>
              When it comes to Project Head Manager, I believe in a holistic approach that combines creativity with technical expertise. I start by
              understanding your unique vision and goals, then work tirelessly to bring that vision to life. Whether you need a sleek portfolio site,
              an engaging e-commerce platform, or anything in between, I&apos;ve got you covered.
            </p>
            <Row className="g-2 mt-2 mb-4">
              <Col lg={6}>
                <div className="border p-3 rounded">
                  <CardTitle as={'h4'}>Marketing expertise</CardTitle>
                  <div className="d-flex gap-2 flex-wrap mt-3">
                    <span className="badge bg-body text-muted px-2 py-1 fs-12">#Leadership</span>
                    <span className="badge bg-body text-muted px-2 py-1 fs-12">#Advertising</span>
                    <span className="badge bg-body text-muted px-2 py-1 fs-12">#Public-relations</span>
                    <span className="badge bg-body text-muted px-2 py-1 fs-12">#Branding-manage</span>
                  </div>
                  <p className="mb-0 text-dark mt-3">
                    Open to networking :<span className="badge bg-success-subtle text-success ms-1">Yes</span>
                  </p>
                </div>
              </Col>
              <Col lg={6}>
                <div className="border p-3 rounded">
                  <CardTitle as={'h4'}>Marketing interests</CardTitle>
                  <div className="d-flex gap-2 flex-wrap mt-3">
                    <span className="badge bg-body text-muted px-2 py-1 fs-12">#Event-marketing</span>
                    <span className="badge bg-body text-muted px-2 py-1 fs-12">#Performance-marketing</span>
                    <span className="badge bg-body text-muted px-2 py-1 fs-12">#Account-based-marketing</span>
                  </div>
                  <p className="mb-0 text-dark mt-3">
                    Open to advising :<span className="badge bg-success-subtle text-success ms-1">Yes</span>
                  </p>
                </div>
              </Col>
            </Row>
            <CardTitle as={'h4'}>My Core Skills :</CardTitle>
            <Row className="mt-2">
              <Col lg={4}>
                <div className="d-flex align-items-center justify-content-satrt gap-2">
                  <ul className="d-flex text-warning m-0 fs-20 list-unstyled ">
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
                  </ul>
                  <p className="fw-medium mb-0 text-dark fs-15">Inbound Marketing</p>
                </div>
              </Col>
              <Col lg={4}>
                <div className="d-flex align-items-center justify-content-satrt gap-2">
                  <ul className="d-flex text-warning m-0 fs-20 list-unstyled">
                    <li>
                      <IconifyIcon icon="bxs:star" />
                    </li>
                    <li>
                      <IconifyIcon icon="bxs:star" />
                    </li>
                    <li>
                      <IconifyIcon icon="bxs:star" />
                    </li>
                  </ul>
                  <p className="fw-medium mb-0 text-dark fs-15">Entrepreneurship</p>
                </div>
              </Col>
              <Col lg={4}>
                <div className="d-flex align-items-center justify-content-satrt gap-2">
                  <ul className="d-flex text-warning m-0 fs-20 list-unstyled">
                    <li>
                      <IconifyIcon icon="bxs:star" />
                    </li>
                    <li>
                      <IconifyIcon icon="bxs:star" />
                    </li>
                  </ul>
                  <p className="fw-medium mb-0 text-dark fs-15">Growth Marketing</p>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card> */}
      </Col>
      {/* <Col xl={4} lg={5}>
        <Row>
          <Col lg={6}>
            <Card>
              <CardBody className="text-center">
                <div className="avatar bg-info d-flex align-items-center justify-content-center rounded mx-auto mb-2">
                  <IconifyIcon icon="solar:cup-star-bold" className="fs-34 text-white" />
                </div>
                <h3 className="mb-1">+12</h3>
                <p className="mb-0 fw-semibold fs-16">Achievements</p>
              </CardBody>
            </Card>
          </Col>
          <Col lg={6}>
            <Card>
              <CardBody className="text-center">
                <div className="avatar bg-info d-flex align-items-center justify-content-center rounded mx-auto mb-2">
                  <IconifyIcon icon="solar:medal-star-circle-bold-duotone" className="fs-34 text-white" />
                </div>
                <h3 className="mb-1">+24</h3>
                <p className="mb-0 fw-semibold fs-16">Accomplishments</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Card className="overflow-hidden z-1">
          <CardBody className="text-center">
            <CardTitle as={'h4'} className="mb-2">
              Share your profile
            </CardTitle>
            <p className="text-muted">Now that your agency is created, go ahead and share it to start generating leads.</p>
            <Image src={qrCodeImg} alt="qrCodeImg" className="avatar-xl" />
            <ul className="list-inline d-flex gap-1 my-3  align-items-center justify-content-center">
              <li className="list-inline-item">
                <Link href="" className="btn btn-soft-primary avatar-sm d-flex align-items-center justify-content-center fs-20">
                  <span>
                    {' '}
                    <IconifyIcon height={20} width={20} icon="bxl:facebook" />
                  </span>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="" className="btn btn-soft-danger avatar-sm d-flex align-items-center justify-content-center fs-20">
                  <span>
                    {' '}
                    <IconifyIcon width={20} height={20} icon="bxl:instagram" />
                  </span>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="" className="btn btn-soft-info avatar-sm d-flex align-items-center justify-content-center  fs-20">
                  <span>
                    {' '}
                    <IconifyIcon width={20} height={20} icon="bxl:twitter" />
                  </span>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="" className="btn btn-soft-success avatar-sm d-flex align-items-center justify-content-center fs-20">
                  <span>
                    {' '}
                    <IconifyIcon width={20} height={20} icon="bxl:whatsapp" />
                  </span>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="" className="btn btn-soft-warning avatar-sm d-flex align-items-center justify-content-center fs-20">
                  <span>
                    {' '}
                    <IconifyIcon width={20} height={20} icon="bx:envelope" />
                  </span>
                </Link>
              </li>
            </ul>
            <p className="text-muted">Copy the URL below and share it with your friends:</p>
            <p className="d-flex align-items-center border p-2 rounded-2 border-dashed bg-body text-start mb-0">
              https://larkon-mileage.com{' '}
              <Link href="" className="ms-auto fs-4">
                <IconifyIcon icon="bx:copy" />
              </Link>
            </p>
          </CardBody>
        </Card>
      </Col> */}
    </Row>;
};
export default ProfileAbout;