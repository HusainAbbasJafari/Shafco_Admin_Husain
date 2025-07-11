import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Link from 'next/link';
import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Container, Row } from 'react-bootstrap';
export const metadata = {
  title: 'Solar Icons'
};
const SolarIconsPage = () => {
  return <>
      <PageTItle title="SOLAR ICONS" />
      <Container>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'}>Solar Icons</CardTitle>
          </CardHeader>
          <CardBody>
            <Row className="row-cols-4 text-muted g-4">
              <Col>
                <Link href="" className="link-reset fs-16 user-select-all">
                  <div className="d-flex align-items-center gap-1">
                    <IconifyIcon icon="solar:4k-bold" className="fs-24" />
                    4k-bold
                  </div>
                </Link>
              </Col>
              <Col>
                <Link href="" className="link-reset fs-16 user-select-all">
                  <div className="d-flex align-items-center gap-1">
                    <IconifyIcon icon="solar:accessibility-bold-duotone" className="fs-24" />
                    accessibility-bold-duotone
                  </div>
                </Link>
              </Col>
              <Col>
                <Link href="" className="link-reset fs-16 user-select-all">
                  <div className="d-flex align-items-center gap-1">
                    <IconifyIcon icon="solar:accumulator-broken" className="fs-24" />
                    accumulator-broken
                  </div>
                </Link>
              </Col>
              <Col>
                <Link href="" className="link-reset fs-16 user-select-all">
                  <div className="d-flex align-items-center gap-1">
                    <IconifyIcon icon="solar:add-circle-line-duotone" className="fs-24" />
                    add-circle-line-duotone
                  </div>
                </Link>
              </Col>
              <Col>
                <Link href="" className="link-reset fs-16 user-select-all">
                  <div className="d-flex align-items-center gap-1">
                    <IconifyIcon icon="solar:add-folder-linear" className="fs-24" />
                    add-folder-linear
                  </div>
                </Link>
              </Col>
              <Col>
                <Link href="" className="link-reset fs-16 user-select-all">
                  <div className="d-flex align-items-center gap-1">
                    <IconifyIcon icon="solar:add-square-outline" className="fs-24" />
                    add-square-outline
                  </div>
                </Link>
              </Col>
              <Col>
                <Link href="" className="link-reset fs-16 user-select-all">
                  <div className="d-flex align-items-center gap-1">
                    <IconifyIcon icon="solar:adhesive-plaster-2-bold" className="fs-24" />
                    adhesive-plaster-2-bold
                  </div>
                </Link>
              </Col>
              <Col>
                <Link href="" className="link-reset fs-16 user-select-all">
                  <div className="d-flex align-items-center gap-1">
                    <IconifyIcon icon="solar:adhesive-plaster-bold-duotone" className="fs-24" />
                    adhesive-plaster-bold-duotone
                  </div>
                </Link>
              </Col>
              <Col>
                <Link href="" className="link-reset fs-16 user-select-all">
                  <div className="d-flex align-items-center gap-1">
                    <IconifyIcon icon="solar:airbuds-broken" className="fs-24" />
                    airbuds-broken
                  </div>
                </Link>
              </Col>
              <Col>
                <Link href="" className="link-reset fs-16 user-select-all">
                  <div className="d-flex align-items-center gap-1">
                    <IconifyIcon icon="solar:airbuds-case-charge-linear" className="fs-24" />
                    airbuds-case-charge-linear
                  </div>
                </Link>
              </Col>
              <Col>
                <Link href="" className="link-reset fs-16 user-select-all">
                  <div className="d-flex align-items-center gap-1">
                    <IconifyIcon icon="solar:airbuds-case-minimalistic-outline" className="fs-24" />
                    airbuds-case-minimalistic-outline
                  </div>
                </Link>
              </Col>
              <Col>
                <Link href="" className="link-reset fs-16 user-select-all">
                  <div className="d-flex align-items-center gap-1">
                    <IconifyIcon icon="solar:alarm-add-bold" className="fs-24" />
                    alarm-add-bold
                  </div>
                </Link>
              </Col>
              <Col>
                <Link href="" className="link-reset fs-16 user-select-all">
                  <div className="d-flex align-items-center gap-1">
                    <IconifyIcon icon="solar:album-bold-duotone" className="fs-24" />
                    album-bold-duotone
                  </div>
                </Link>
              </Col>
              <Col>
                <Link href="" className="link-reset fs-16 user-select-all">
                  <div className="d-flex align-items-center gap-1">
                    <IconifyIcon icon="solar:align-bottom-broken" className="fs-24" />
                    align-bottom-broken
                  </div>
                </Link>
              </Col>
              <Col>
                <Link href="" className="link-reset fs-16 user-select-all">
                  <div className="d-flex align-items-center gap-1">
                    <IconifyIcon icon="solar:archive-check-linear" className="fs-24" />
                    archive-check-linear
                  </div>
                </Link>
              </Col>
              <Col>
                <Link href="" className="link-reset fs-16 user-select-all">
                  <div className="d-flex align-items-center gap-1">
                    <IconifyIcon icon="solar:armchair-2-outline" className="fs-24" />
                    armchair-2-outline
                  </div>
                </Link>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <div className="my-4 text-center">
          <a href="https://icon-sets.iconify.design/solar/" target="_blank" className="btn btn-primary">
            View All Icons
          </a>
        </div>
      </Container>
    </>;
};
export default SolarIconsPage;