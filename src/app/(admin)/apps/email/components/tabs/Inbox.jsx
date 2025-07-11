'use client';

import { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import clsx from 'clsx';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useEmailContext } from '@/context/useEmailContext';
import EmailsList from '../EmailsList';
import { getAllEmails } from '@/helpers/data';
const Inbox = () => {
  const {
    activeLabel,
    changeActiveLabel
  } = useEmailContext();
  const [emails, setEmails] = useState();
  const fetchData = async () => {
    const data = await getAllEmails();
    if (data) setEmails(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <TabPane eventKey="Inbox" className="fade" role="tabpanel">
      <div>
        <Nav variant="underline" justify>
          <NavItem>
            <NavLink as="span" role="button" className={clsx('d-flex align-items-center px-3', {
            active: activeLabel === 'Primary'
          })} onClick={() => changeActiveLabel('Primary')}>
              <span className="me-2 d-flex">
                <IconifyIcon icon="bxs:inbox" className="fs-18" />
              </span>
              <span className="d-none d-md-block">Primary</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink as="span" role="button" className={clsx('d-flex align-items-center px-3', {
            active: activeLabel === 'Social'
          })} onClick={() => changeActiveLabel('Social')}>
              <span className="me-2 d-flex">
                <IconifyIcon icon="bxs:group" className="fs-18" />
              </span>
              <span className="d-none d-md-block">Social</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink as="span" role="button" className={clsx('d-flex align-items-center px-3', {
            active: activeLabel === 'Promotions'
          })} onClick={() => changeActiveLabel('Promotions')}>
              <span className="me-2 d-flex">
                <IconifyIcon icon="bxs:purchase-tag" className="fs-18" />
              </span>
              <span className="d-none d-md-block">Promotions</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink as="span" role="button" className={clsx('d-flex align-items-center px-3', {
            active: activeLabel === 'Updates'
          })} onClick={() => changeActiveLabel('Updates')}>
              <span className="me-2 d-flex">
                <IconifyIcon icon="bxs-info-circle" className="fs-18" />
              </span>
              <span className="d-none d-md-block">Updates</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink as="span" role="button" className={clsx('d-flex align-items-center px-3', {
            active: activeLabel === 'Forums'
          })} onClick={() => changeActiveLabel('Forums')}>
              <span className="me-2 d-flex">
                <IconifyIcon icon="bxs-chat" className="fs-18" />
              </span>
              <span className="d-none d-md-block">Forums</span>
            </NavLink>
          </NavItem>
        </Nav>

        <TabContainer activeKey={activeLabel}>
          {!!emails?.length && <TabContent className="text-muted pt-0">
              <TabPane eventKey="Primary" mountOnEnter unmountOnExit>
                <EmailsList emails={emails.filter(email => email.label === 'Primary')} />
              </TabPane>
              <TabPane eventKey="Social" mountOnEnter unmountOnExit>
                <EmailsList emails={emails.filter(email => email.label === 'Social')} />
              </TabPane>
              <TabPane eventKey="Promotions" mountOnEnter unmountOnExit>
                <EmailsList emails={emails.filter(email => email.label === 'Promotions')} />
              </TabPane>
              <TabPane eventKey="Updates" mountOnEnter unmountOnExit>
                <EmailsList emails={emails.filter(email => email.label === 'Updates')} />
              </TabPane>
              <TabPane eventKey="Forums" mountOnEnter unmountOnExit>
                <EmailsList emails={emails.filter(email => email.label === 'Forums')} />
              </TabPane>
            </TabContent>}
        </TabContainer>
      </div>
    </TabPane>;
};
export default Inbox;