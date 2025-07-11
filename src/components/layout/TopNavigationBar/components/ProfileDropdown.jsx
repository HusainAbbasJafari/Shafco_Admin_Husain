'use client';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { logout } from '@/redux/slices/authSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dropdown, DropdownHeader, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
const ProfileDropdown = () => {

  const dispatch = useDispatch();
  const router = useRouter()
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(
      logout()
    )
    router.push('/auth/sign-in')
  }


  return <Dropdown className="topbar-item">
    <DropdownToggle as={'a'} type="button" className="topbar-button content-none" id="page-header-user-dropdown " data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span className="d-flex align-items-center border border-1 border-primary rounded-circle p-1">
        <img className="rounded-circle" width={40} src={user?.profilePic} alt="avatar-3" height={40}/>
      </span>
    </DropdownToggle>
    <DropdownMenu className="dropdown-menu-end">
      <DropdownHeader as={'h6'} className="dropdown-header">
        Welcome {user?.fullName}!
      </DropdownHeader>
      <DropdownItem as={Link} href="/profile">
        <IconifyIcon icon="bx:user-circle" className="text-muted fs-18 align-middle me-1" />
        <span className="align-middle">Profile</span>
      </DropdownItem>

      {/* <DropdownItem as={Link} href="/auth/change-password">
        <IconifyIcon icon="bx:user-circle" className="text-muted fs-18 align-middle me-1" />
        <span className="align-middle">Change Password</span>
      </DropdownItem> */}
      {/* <DropdownItem as={Link} href="/apps/chat">
          <IconifyIcon icon="bx:message-dots" className="text-muted fs-18 align-middle me-1" />
          <span className="align-middle">Messages</span>
        </DropdownItem>
        <DropdownItem as={Link} href="/pages/pricing">
          <IconifyIcon icon="bx:wallet" className="text-muted fs-18 align-middle me-1" />
          <span className="align-middle">Pricing</span>
        </DropdownItem>
        <DropdownItem as={Link} href="/support/faqs">
          <IconifyIcon icon="bx:help-circle" className="text-muted fs-18 align-middle me-1" />
          <span className="align-middle">Help</span>
        </DropdownItem>
        <DropdownItem as={Link} href="/auth/lock-screen">
          <IconifyIcon icon="bx:lock" className="text-muted fs-18 align-middle me-1" />
          <span className="align-middle">Lock screen</span>
        </DropdownItem> */}
      <div className="dropdown-divider my-1" />
      <DropdownItem as={'div'} role='button' className=" text-danger" onClick={() => handleLogout()}>
        <IconifyIcon icon="bx:log-out" className="fs-18 align-middle me-1" />
        <span className="align-middle">Logout</span>
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>;
};
export default ProfileDropdown;