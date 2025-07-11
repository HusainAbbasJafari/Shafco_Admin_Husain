import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { getAllUsers } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
const Contact = () => {
  const [allContacts, setAllContacts] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const fetchedContacts = await getAllUsers();
      setAllContacts(fetchedContacts);
    };
    fetchData();
  }, []);
  return <SimplebarReactClient className="px-3 mb-3 chat-setting-height">
      <div className="d-flex align-items-center position-relative py-2">
        <Link href="" className="me-2 stretched-link rounded-circle text-bg-primary avatar d-flex align-items-center justify-content-center fs-18">
          <IconifyIcon icon="bx:group" />
        </Link>
        <div className="flex-grow-1">
          <h5 className="my-0 fs-14">New Group</h5>
        </div>
      </div>
      <div className="d-flex align-items-center position-relative py-2">
        <Link href="" className="me-2 stretched-link rounded-circle text-bg-primary avatar d-flex align-items-center justify-content-center fs-18">
          <IconifyIcon icon="bx:user-plus" />
        </Link>
        <div className="flex-grow-1">
          <h5 className="my-0 fs-14">New Contact</h5>
        </div>
      </div>
      {allContacts?.map((contact, idx) => <div className="d-flex align-items-center position-relative py-2" key={idx}>
          <Link href="" className="stretched-link">
            <Image src={contact.image} className="me-2 rounded-circle" height={36} alt="avatar-2" />
          </Link>
          <div className="flex-grow-1">
            <h5 className="my-0 fs-14">{contact.name}</h5>
            <p className="mt-1 mb-0 text-muted">
              <span className="w-75">{contact.status ? contact.status : 'Hey there! I am using Chat.'}</span>
            </p>
          </div>
        </div>)}
    </SimplebarReactClient>;
};
export default Contact;