'use client';

import comingSoonImg from '@/assets/images/coming-soon.png';
import logoDark from '@/assets/images/logo-dark.png';
import logoLight from '@/assets/images/logo-light.png';
import smallImg from '@/assets/images/small/img-10.jpg';
import useCountdown from '@/hooks/useCountdown';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Col, Row } from 'react-bootstrap';
const Timer = () => {
  const {
    days,
    hours,
    minutes,
    seconds
  } = useCountdown();
  return <Row className="text-center my-4">
      <div className="col border-end">
        <h3 id="days" className="fw-bold fs-35">
          {days}
        </h3>
        <p className="text-uppercase fw-semibold mb-0">days</p>
      </div>
      <div className="col border-end">
        <h3 id="hours" className="fw-bold fs-35">
          {hours}
        </h3>
        <p className="text-uppercase fw-semibold mb-0">Hours</p>
      </div>
      <div className="col border-end">
        <h3 id="minutes" className="fw-bold fs-35">
          {minutes}
        </h3>
        <p className="text-uppercase fw-semibold mb-0">Minutes</p>
      </div>
      <div className="col">
        <h3 id="seconds" className="fw-bold fs-35">
          {seconds}
        </h3>
        <p className="text-uppercase fw-semibold mb-0">Seconds</p>
      </div>
    </Row>;
};
const ComingSoon = () => {
  return <div className="d-flex flex-column vh-100 p-3">
      <div className="d-flex flex-column flex-grow-1">
        <Row className="h-100">
          <Col xxl={7}>
            <Row className="align-items-center justify-content-center h-100">
              <Col lg={8}>
                <div className="auth-logo mb-3 text-center">
                  <Link href="/dashboard" className="logo-dark">
                    <Image src={logoDark} height={24} alt="logo dark" />
                  </Link>
                  <Link href="/dashboard" className="logo-light">
                    <Image src={logoLight} height={24} alt="logo light" />
                  </Link>
                </div>
                <div className="mx-auto text-center">
                  <Image src={comingSoonImg} alt="comingSoon" className="h-auto my-3" style={{
                  maxWidth: '80%'
                }} />
                </div>
                <Timer />
                <p className="text-muted text-center mt-1 mb-4">
                  Exciting news is on the horizon! We&apos;re thrilled to announce that something incredible is coming your way very soon. Our team
                  has been hard at work behind the scenes, crafting something special just for you.
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
                <Image src={smallImg} height={759} width={700} alt="small" className="w-100 h-100" />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>;
};
export default ComingSoon;