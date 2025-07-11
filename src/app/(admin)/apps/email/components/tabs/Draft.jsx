'use client';

import { useEffect, useState } from 'react';
import { TabPane } from 'react-bootstrap';
import { getAllEmails } from '@/helpers/data';
import EmailsList from '../EmailsList';
const Draft = () => {
  const [emails, setEmails] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEmails('draft');
      if (data) setEmails(data);
    };
    fetchData();
  }, []);
  return <TabPane eventKey="Draft" className="fade" role="tabpanel">
      {!!emails?.length ? <EmailsList emails={emails} /> : <>
          <hr />
          <div className="text-center mt-2">
            <p className="mb-0">You don&apos;t have any saved drafts.</p>
            <p className="mb-0">Saving a draft allows you to keep a message you aren&apos;t ready to send yet.</p>
          </div>
          <hr className="mb-0" />
        </>}
    </TabPane>;
};
export default Draft;