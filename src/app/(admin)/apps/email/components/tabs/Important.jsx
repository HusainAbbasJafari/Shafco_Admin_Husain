'use client';

import { useEffect, useState } from 'react';
import { TabPane } from 'react-bootstrap';
import EmailsList from '../EmailsList';
import { getAllEmails } from '@/helpers/data';
const Important = () => {
  const [emails, setEmails] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEmails('important');
      if (data) setEmails(data);
    };
    fetchData();
  }, []);
  return <TabPane eventKey="Important" className="fade" role="tabpanel">
      {!!emails?.length ? <EmailsList emails={emails} /> : <>
          <hr />
          <div className="text-center mt-2">
            <p className="mb-0">You don&apos;t have any starred emails.</p>
            <p className="mb-0">Star Emails to see them here</p>
          </div>
          <hr className="mb-0" />
        </>}
    </TabPane>;
};
export default Important;