import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { getAllUsers } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
const FriendsRequest = async () => {
  const friendsRequestData = await getAllUsers();
  return <Card>
      <CardHeader className="d-flex justify-content-between align-items-center">
        <CardTitle as={'h4'}>Friends Request (10)</CardTitle>
      </CardHeader>
      <CardBody className="p-0 pb-3">
        <SimplebarReactClient className="p-3" data-simplebar style={{
        maxHeight: 400
      }}>
          {friendsRequestData.map((item, idx) => <div className="d-flex align-items-center mb-3" key={idx}>
              <div className="flex-shrink-0">
                <Image src={item.image} width={36} height={36} className="img-fluid avatar-sm rounded me-2" alt="avatar-5" />
              </div>
              <div className="flex-grow-1">
                <h5 className="mb-1 fs-14">
                  <Link href="">{item.name}</Link>
                </h5>
                <p className="mb-0">{item.mutualCount == 0 ? 'no' : item.mutualCount} mutual friends</p>
              </div>
              <Dropdown>
                <DropdownToggle as={'a'} role="button" className="arrow-none text-dark">
                  <IconifyIcon icon="bx:dots-vertical-rounded" className="fs-18" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem>
                    <IconifyIcon icon="bxs:user-detail" className="me-1" />
                    See Profile
                  </DropdownItem>
                  <DropdownItem>
                    <IconifyIcon icon="bxl:telegram" className="me-1" />
                    Message to {item.name}
                  </DropdownItem>
                  <DropdownItem>
                    <IconifyIcon icon="bx:user-x" className="me-1" />
                    Unfriend {item.name}
                  </DropdownItem>
                  <DropdownItem>
                    <IconifyIcon icon="bx:block" className="me-1" />
                    Block {item.name}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>)}
        </SimplebarReactClient>
      </CardBody>
    </Card>;
};
export default FriendsRequest;