'use client';

import { useChatContext } from '@/context/useChatContext';
import { getAllUsers, getUserById } from '@/helpers/data';
import React, { useEffect, useState } from 'react';
import { Col, Offcanvas } from 'react-bootstrap';
import ChatLeftSidebar from './ChatLeftSidebar';
import ChatArea from './ChatArea';
const fetchSingleUser = async id => {
  const data = await getUserById(id);
  if (data) return data;
};
const fetchUsers = async () => {
  const data = await getAllUsers();
  if (data) return data;
};
const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState();
  const {
    chatList
  } = useChatContext();
  useEffect(() => {
    const fetchInitial = async () => {
      setSelectedUser(await fetchSingleUser('101'));
      setUsers(await fetchUsers());
    };
    fetchInitial();
  }, []);
  const onUserChange = async user => {
    setSelectedUser(await fetchSingleUser(user.id));
  };
  return <>
      <Col xxl={3}>
        {users && selectedUser && <>
            <Offcanvas show={chatList.open} onHide={chatList.toggle} className="offcanvas-xxl offcanvas-start h-100" tabIndex={-1} id="Contactoffcanvas" aria-labelledby="ContactoffcanvasLabel">
              <ChatLeftSidebar users={users} onUserSelect={onUserChange} selectedUser={selectedUser} />
            </Offcanvas>
            <div className="d-none d-xxl-block">
              <ChatLeftSidebar users={users} onUserSelect={onUserChange} selectedUser={selectedUser} />
            </div>
          </>}
      </Col>
      <Col xxl={9}>{selectedUser && <ChatArea selectedUser={selectedUser} />}</Col>
    </>;
};
export default ChatApp;