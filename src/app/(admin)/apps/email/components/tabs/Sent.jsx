'use client';

import { useEffect, useState } from 'react';
import { TabPane } from 'react-bootstrap';
import EmailsList from '../EmailsList';
import { getAllEmails } from '@/helpers/data';
const Sent = () => {
  const [emails, setEmails] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEmails('sent');
      if (data) setEmails(data);
    };
    fetchData();
  }, []);
  return <TabPane eventKey="Sent" className="fade" role="tabpanel">
      {!!emails?.length ? <EmailsList emails={emails} sent /> : <>
          <hr />
          <div className="text-center mt-2">
            <p className="mb-0">You don&apos;t have any sent emails.</p>
            <p className="mb-0">Send Emails to someone to see them here</p>
          </div>
          <hr className="mb-0" />
        </>}
    </TabPane>;
};
export default Sent;