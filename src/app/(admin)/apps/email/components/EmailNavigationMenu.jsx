'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Card, CardBody, Nav, NavLink, Offcanvas, ProgressBar } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { useEmailContext } from '@/context/useEmailContext';
import useViewPort from '@/hooks/useViewPort';
import { getEmailsCategoryCount } from '@/helpers/data';
const EmailSidebar = () => {
  const {
    activeLabel,
    changeActiveLabel,
    composeEmail: {
      toggle
    }
  } = useEmailContext();
  const [emailsCount, setEmailsCount] = useState({
    inbox: 0,
    starred: 0,
    draft: 0,
    sent: 0,
    deleted: 0,
    important: 0
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmailsCategoryCount();
      if (data) setEmailsCount(data);
    };
    fetchData();
  }, []);
  return <Card>
      <SimplebarReactClient className="h-100 mb-0">
        <CardBody>
          <div className="d-grid">
            <button onClick={toggle} type="button" className="btn btn-danger">
              Compose
            </button>
          </div>
          <Nav className="nav flex-column mt-3" id="email-tab" role="tablist" aria-orientation="vertical">
            <NavLink as="span" role="button" eventKey="Inbox" onClick={() => changeActiveLabel('Primary')} className="px-0 py-1">
              <span className="text-danger fw-bold">
                <IconifyIcon icon="bxs:inbox" className="fs-16 me-2 align-middle" /> Inbox
                <span className="badge badge-soft-danger float-end ms-2">{emailsCount.inbox}</span>
              </span>
            </NavLink>
            <NavLink as="span" role="button" eventKey="Starred" className="px-0 py-1">
              <IconifyIcon icon="bx:star" className="fs-16 align-middle me-2" />
              Starred
              <span className="badge badge-soft-warning float-end ms-2">{emailsCount.starred}</span>
            </NavLink>
            <NavLink as="span" role="button" eventKey="Draft" className="px-0 py-1">
              <IconifyIcon icon="bxs:file-doc" className="fs-16 align-middle me-2" />
              Draft
              <span className="badge badge-soft-dark float-end ms-2">{emailsCount.draft}</span>
            </NavLink>
            <NavLink as="span" role="button" eventKey="Sent" className="px-0 py-1">
              <IconifyIcon icon="bx:send" className="fs-16 align-middle me-2" />
              Sent Mail
              <span className="badge badge-soft-info float-end ms-2">{emailsCount.sent}</span>
            </NavLink>
            <NavLink as="span" role="button" eventKey="Trash" className="px-0 py-1">
              <IconifyIcon icon="bx:trash" className="fs-16 align-middle me-2" />
              Trash Mail
              <span className="badge badge-soft-primary float-end ms-2">{emailsCount.deleted}</span>
            </NavLink>
            <NavLink as="span" role="button" eventKey="Important" className="px-0 py-1">
              <IconifyIcon icon="bx:tag" className="fs-16 align-middle me-2" />
              Important
              <span className="badge badge-soft-success float-end ms-2">{emailsCount.important}</span>
            </NavLink>
            <h6 className="text-uppercase mt-4">Labels</h6>
            <NavLink as="span" role="button" onClick={() => changeActiveLabel('Social')} eventKey="Inbox" className={clsx('px-0 py-1 icons-center', {
            'text-muted': activeLabel !== 'Social'
          })}>
              <IconifyIcon icon="bxs:circle" className="font-13 text-primary me-2" />
              Social
            </NavLink>
            <NavLink as="span" role="button" onClick={() => changeActiveLabel('Promotions')} eventKey="Inbox" className={clsx('px-0 py-1 icons-center', {
            'text-muted': activeLabel !== 'Promotions'
          })}>
              <IconifyIcon icon="bxs:circle" className="font-13 text-secondary me-2" />
              Promotions
            </NavLink>
            <NavLink as="span" role="button" onClick={() => changeActiveLabel('Updates')} eventKey="Inbox" className={clsx('px-0 py-1 icons-center', {
            'text-muted': activeLabel !== 'Updates'
          })}>
              <IconifyIcon icon="bxs:circle" className="font-13 text-info me-2" />
              Updates
            </NavLink>
            <NavLink as="span" role="button" onClick={() => changeActiveLabel('Forums')} eventKey="Inbox" className={clsx('px-0 py-1 icons-center', {
            'text-muted': activeLabel !== 'Forums'
          })}>
              <IconifyIcon icon="bxs:circle" className="font-13 text-success me-2" />
              Forums
            </NavLink>
          </Nav>
          <div className="mt-5">
            <h4>
              <span className="badge rounded-pill p-1 px-2 badge-soft-secondary">FREE</span>
            </h4>
            <h6 className="text-uppercase mt-3">Storage</h6>
            <ProgressBar variant="success" className="my-2 progress-sm" now={46} />
            <p className="text-muted font-13 mb-0">7.02 GB (46%) of 15 GB used</p>
          </div>
        </CardBody>
      </SimplebarReactClient>
    </Card>;
};
const EmailNavigationMenu = () => {
  const {
    width
  } = useViewPort();
  const {
    navigationBar: {
      open,
      toggle
    }
  } = useEmailContext();
  return width > 1400 ? <EmailSidebar /> : <Offcanvas show={open} onHide={toggle} placement="start" tabIndex={-1} className="offcanvas-xxl h-100">
      <EmailSidebar />
    </Offcanvas>;
};
export default EmailNavigationMenu;