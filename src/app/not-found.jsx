'use client';

import error404Img from '@/assets/images/404-error.png';
import logoDark from '@/assets/images/logo-dark.png';
import logoLight from '@/assets/images/logo-light.png';
import smallImg from '@/assets/images/small/img-10.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Col, Row } from 'react-bootstrap';
const NotFound = () => {
  return <div className="d-flex flex-column vh-100 p-3">
      <div className="d-flex flex-column flex-grow-1">
        <Row className="h-100">
          <Col xxl={7}>
            <Row className="align-items-center justify-content-center h-100">
              <Col lg={10}>
                <div className="auth-logo mb-3 text-center">
                  {/* <Link href="/dashboard" className="logo-dark">
                    <Image src={logoDark} height={24} alt="logo dark" />
                  </Link>
                  <Link href="/dashboard" className="logo-light">
                    <Image src={logoLight} height={24} alt="logo light" />
                  </Link> */}
                </div>
                <div className="mx-auto text-center">
                  <Image src={error404Img} alt="error-404" className="img-fluid my-3" />
                </div>
                <h2 className="fw-bold text-center lh-base">Ooops! The Page You&apos;re Looking For Was Not Found</h2>
                <p className="text-muted text-center mt-1 mb-4">
                  Sorry, we couldn&apos;t find the page you were looking for. We suggest that you return to main sections
                </p>
                <div className="text-center">
                  <Link href="/dashboard" className="btn btn-primary">
                    Back To Home
                  </Link>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xxl={5} className="d-none d-xxl-flex">
            <Card className="h-100 mb-0 overflow-hidden">
              <div className="d-flex flex-column h-100">
                <Image src={smallImg} alt="smallImg" className="w-100 h-100" />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>;
};
export default NotFound;