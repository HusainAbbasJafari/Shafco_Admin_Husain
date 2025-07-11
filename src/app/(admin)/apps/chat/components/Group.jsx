import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { getJoinedGroups } from '@/helpers/data';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
const Group = () => {
  const [groups, setGroups] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const fetchedGroups = await getJoinedGroups();
      setGroups(fetchedGroups);
    };
    fetchData();
  }, []);
  return <SimplebarReactClient className="px-3 mb-3 chat-setting-height">
      <div className="d-flex align-items-center position-relative mb-3">
        <Link href="" className="me-2 stretched-link rounded text-bg-primary avatar d-flex align-items-center justify-content-center fs-18">
          <IconifyIcon icon="bxs:user" />
        </Link>
        <div className="flex-grow-1">
          <h5 className="my-0 fs-14">New Group</h5>
        </div>
      </div>
      {groups?.map((group, idx) => <div className="d-flex mb-3 align-items-center position-relative" key={idx}>
          <Link href="" className="me-2 stretched-link rounded bg-soft-primary text-primary avatar d-flex align-items-center justify-content-center fs-18">
            G
          </Link>
          <div className="flex-grow-1 ps-1 overflow-hidden">
            <h5 className="fs-14 m-0">#{group.name}</h5>
          </div>
        </div>)}
    </SimplebarReactClient>;
};
export default Group;