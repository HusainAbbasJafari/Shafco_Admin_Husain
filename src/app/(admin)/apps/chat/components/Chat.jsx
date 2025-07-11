import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { timeSince } from '@/utils/date';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const Chat = ({
  onUserSelect,
  users,
  selectedUser
}) => {
  return <SimplebarReactClient className="px-3 mb-3 chat-setting-height">
      {users.map((user, idx) => <Link href="" className="text-body" key={idx}>
          <div className={clsx('d-flex align-items-center p-2', {
        'bg-light bg-opacity-50 rounded-1': selectedUser.id === user.id
      })} onClick={() => {
        onUserSelect(user);
      }}>
            <div className="flex-shrink-0 position-relative">
              <Image src={user.image} className="me-2 rounded-circle" height={36} alt="avatar-2" />
            </div>
            <div className="flex-grow-1 overflow-hidden">
              <h5 className="my-0">
                <span className="float-end text-muted fs-13">{timeSince(new Date(user.time))}</span>
                {user.name}
              </h5>
              <p className="mt-1 mb-0 fs-13 text-muted d-flex align-items-end justify-content-between">
                {selectedUser.activityStatus === 'typing' && selectedUser.id === user.id ? <span className="w-75 text-primary">typing...</span> : <>
                    <span className="w-75">{user.message}</span>
                    <IconifyIcon icon="bx:check-double" className="text-success" />
                  </>}
              </p>
            </div>
          </div>
        </Link>)}
    </SimplebarReactClient>;
};
export default Chat;