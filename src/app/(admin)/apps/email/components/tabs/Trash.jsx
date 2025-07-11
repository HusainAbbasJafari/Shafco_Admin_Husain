'use client';

import { useEffect, useState } from 'react';
import { TabPane } from 'react-bootstrap';
import EmailsList from '../EmailsList';
import { getAllEmails } from '@/helpers/data';
const Trash = () => {
  const [emails, setEmails] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEmails('deleted');
      if (data) setEmails(data);
    };
    fetchData();
  }, []);
  return <TabPane eventKey="Trash" className="fade" role="tabpanel">
      {!!emails?.length ? <>
          <hr />
          <div className="text-center mt-2">
            <p className="mb-0">
              Emails that have been since more than 30 days will be automatically deleted.{' '}
              <button className="btn p-0 btn-link text-primary ms-2">Empty Trash Now</button>
            </p>
          </div>
          <hr className="mb-3" />
          <EmailsList emails={emails} />
        </> : <>
          <hr />
          <div className="text-center mt-2">
            <p className="mb-0">You don&apos;t have any deleted emails.</p>
            <p className="mb-0">Deleted Emails to see them here</p>
          </div>
          <hr className="mb-0" />
        </>}
    </TabPane>;
};
export default Trash;