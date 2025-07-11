'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import smallImg from '@/assets/images/small/img-2.jpg';
import { getHelpData } from '@/helpers/data';
import Image from 'next/image';
import { Card, CardBody, CardTitle, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'react-bootstrap';
import useToggle from '@/hooks/useToggle';
import { useFetchData } from '@/hooks/useFetchData';
import Link from 'next/link';
const HelpBanner = () => {
  return <Row className="justify-content-center">
      <Col lg={12}>
        <Card className="overflow-hidden" style={{
        background: `url(${smallImg.src})`
      }}>
          <div className="position-absolute top-0 end-0 bottom-0 start-0 bg-dark opacity-75" />
          <CardBody>
            <Row className="justify-content-center">
              <Col lg={7} className="text-center">
                <h3 className="text-white">Help Center</h3>
                <p className="text-white-50">How can we help you ?</p>
                <div className="search-bar">
                  <span className="icons-center">
                    <IconifyIcon icon="bx:search-alt" />
                  </span>
                  <input type="search" className="form-control rounded-pill bg-white border-0" id="search" placeholder="Search ..." />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>;
};
const HelpCard = ({
  avatar,
  description,
  icon,
  name,
  title,
  video,
  toggle
}) => {
  return <Card>
      <CardBody>
        <div className="avatar bg-primary-subtle d-flex align-items-center justify-content-center rounded mb-2">
          <IconifyIcon icon={icon} className="fs-24 text-primary" />
        </div>
        <h4 className="mt-3">{title}</h4>
        <p>{description}</p>
        <div className="d-flex align-items-center gap-2">
          <Image src={avatar} alt="user photo" className="avatar-sm rounded-circle" />
          <p className="mb-0">by {name}</p>
          <div className="vr bg-dark-subtle h-75 my-auto" />
          <Link href="" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="link-primary" onClick={toggle}>
            {video} Video
          </Link>
        </div>
      </CardBody>
    </Card>;
};
const HelpCenter = () => {
  const helpData = useFetchData(getHelpData);
  const {
    isTrue,
    toggle
  } = useToggle();
  return <>
      <HelpBanner />
      <Row>
        {helpData?.map((item, idx) => <Col lg={4} key={idx}>
            <HelpCard {...item} toggle={toggle} />
          </Col>)}
        <Modal show={isTrue} onHide={toggle} centered scrollable className="fade" id="staticBackdrop" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <ModalHeader className="modal-header border-bottom">
            <h1 className="modal-title fs-18" id="staticBackdropLabel">
              Show Video
            </h1>
            <button type="button" onClick={toggle} className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </ModalHeader>
          <ModalBody>
            <CardTitle as={'h4'}>Getting Started with Larkon</CardTitle>
            <Row className="g-2 mt-2">
              <Col lg={6}>
                <div className="ratio ratio-16x9">
                  <iframe src="https://www.youtube.com/embed/PrUxWZiQfy4?autohide=0&showinfo=0&controls=0" className="rounded" />
                </div>
              </Col>
              <Col lg={6}>
                <div className="ratio ratio-16x9">
                  <iframe width={560} height={315} src="https://www.youtube.com/embed/D89Dgg32yLk?si=hxvuTzNEzCyfuBN1" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" className="rounded" allowFullScreen />
                </div>
              </Col>
              <Col lg={6}>
                <div className="ratio ratio-16x9">
                  <iframe width={560} height={315} src="https://www.youtube.com/embed/qBpY4MJt6lc?si=LXHNQxR1XHEt_5VT" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="rounded" />
                </div>
              </Col>
              <Col lg={6}>
                <div className="ratio ratio-16x9">
                  <iframe width={560} height={315} src="https://www.youtube.com/embed/wEw4A7CcSWU?si=BWA7J4IpWkiYvypk" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="rounded" />
                </div>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="p-2">
            <Link href="" className="btn btn-primary">
              More Video
            </Link>
          </ModalFooter>
        </Modal>
      </Row>
    </>;
};
export default HelpCenter;