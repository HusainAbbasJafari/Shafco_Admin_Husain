'use client';

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { Button, ButtonGroup, Card, Col, Offcanvas, OffcanvasHeader, OffcanvasTitle, Row } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { useEmailContext } from '@/context/useEmailContext';
import { getEmailDetails } from '@/helpers/data';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
const FilePreview = ({
  file
}) => {
  return <Card className="p-2 mb-0 shadow-none border position-relative h-100">
      {file.preview ? <Image src={file.preview} height={90} width={140} className="rounded bg-light" alt={file.name ?? ''} /> : <div className="rounded bg-light text-center flex-centered fs-1" style={{
      height: 90,
      width: 140
    }}>
          {file.name?.split('.')[file.name?.split('.').length - 1]?.toUpperCase()}
        </div>}
      <div className="mt-2">
        <p role="button" className="text-body-secondary fw-bold">
          {file.name}
        </p>
      </div>
    </Card>;
};
const EmailViewOffcanvas = () => {
  const [mail, setMail] = useState();
  const [quillEditorContent, setQuillEditorContent] = useState(`
<h3>This is an Air-mode editable area.</h3>
<p><br /></p>
<ul>
  <li>Select a text to reveal the toolbar.</li>
  <li>Edit rich document on-the-fly, so elastic!</li>
</ul>
<p><br /></p>
<p>End of air-mode area</p>
  `);
  const {
    emailDetails: {
      open,
      toggle
    },
    activeMail
  } = useEmailContext();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmailDetails(activeMail);
      if (data) setMail(data);
    };
    fetchData();
  }, [activeMail]);
  return <Offcanvas show={open} onHide={toggle} placement="end" className="email-offcanvas w-50">
      <OffcanvasHeader>
        <div className="d-flex gap-2 align-items-center w-50">
          <button onClick={toggle} className="btn btn-link p-0 icons-center">
            <IconifyIcon icon="bx:arrow-back" className="fs-18" />
          </button>
          <OffcanvasTitle className="text-truncate w-50 lh-1">{mail?.from?.name}</OffcanvasTitle>
        </div>
        <div className="ms-auto">
          <ButtonGroup>
            <button type="button" className="btn btn-light" aria-label="Archive">
              <IconifyIcon icon="bx:archive" className="fs-18" />
            </button>
            <button type="button" className="btn btn-light" aria-label="Mark as spam">
              <IconifyIcon icon="bx:info-square" className="fs-18" />
            </button>
            <button type="button" className="btn btn-light" aria-label="Delete">
              <IconifyIcon icon="bx:trash" className="fs-18" />
            </button>
          </ButtonGroup>
        </div>
      </OffcanvasHeader>
      <SimplebarReactClient className="offcanvas-body p-0 h-100">
        <div className="px-3">
          <div className="mt-2">
            <h5>{mail?.subject}</h5>
            <hr />
            <div className="d-flex mb-4 mt-1">
              {mail?.from?.image && <Image className="me-2 rounded-circle avatar-sm" src={mail.from.image} alt={mail.from.name + '-avatar'} />}
              <div className="flex-grow-1">
                {mail?.createdAt && <span className="float-end">{new Date(mail?.createdAt).toDateString()}</span>}
                <h6 className="m-0">{mail?.from?.name}</h6>
                <small className="text-muted">From: {mail?.from?.email}</small>
              </div>
            </div>
            <p>
              <b>{mail?.content}</b>
            </p>
            <div className="text-muted">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
                et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
              </p>
              <p>
                Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
                semper nisi.
              </p>
              <p>
                Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies
                nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus,
                sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
              </p>
            </div>
            <hr />
            {mail?.attachments && <>
                <h6 className="icons-center">
                  {' '}
                  <IconifyIcon icon="fa:paperclip" className="me-1" /> Attachments&nbsp;<span>({mail.attachments.length})</span>
                </h6>
                <Row className="row-gap-3">
                  {mail.attachments.map((file, idx) => <Col xl={3} md={4} sm={6} key={file.name}>
                      <FilePreview key={idx} file={file} />
                    </Col>)}
                </Row>
              </>}
          </div>
        </div>
      </SimplebarReactClient>
      <div className="p-3">
        <div className="d-flex">
          {mail?.to?.image && <Image className="me-2 rounded-circle avatar-sm" src={mail.to.image} alt={mail.to.name + 'avatar'} />}
          <div className="flex-grow-1">
            <div className="mb-5">
              <ReactQuill className="pb-2 pb-sm-0" theme="snow" style={{
              height: 150
            }} value={quillEditorContent} onChange={setQuillEditorContent} />
            </div>
          </div>
        </div>
        <div className="text-end">
          <Button variant="primary" onClick={toggle} type="button" className="btn btn-primary width-sm" aria-label="Close">
            Send
          </Button>
        </div>
      </div>
    </Offcanvas>;
};
export default EmailViewOffcanvas;