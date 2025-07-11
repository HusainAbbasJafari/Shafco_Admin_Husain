'use client'
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useNotificationContext } from '@/context/useNotificationContext';
import api from '@/services/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import EditProfileModal from './EditProfileModal';
import { updateUser } from '@/redux/slices/authSlice';
const ProfileMain = () => {

  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null)
  const { showNotification } = useNotificationContext();
  const [loading, setLoading] = useState(true)
  const { push } = useRouter();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && loading) {
      getProfileDetails();
    }
  }, [user, loading]);


  const getProfileDetails = async () => {
    try {
      const response = await api.get("/api/Account/UserDetails");
      if (response.data.statusCode === 200 && response.data.isSuccess === true) {
        setUserData(response.data.data)
        dispatch(
          updateUser({
            user: response?.data.data,
          })
        );
        setLoading(false)
      } else {
        showNotification({
          message: response.data.message || "Login failed!",
          variant: "danger",
        });
        setLoading(false)
      }
    } catch (error) {
      showNotification({
        message: error?.message || "An error occurred during password change.",
        variant: "danger",
      });
      setLoading(false)
    }
  };


  return <Row className="justify-content-center my-4 ">
    {/* xl :9 lg : 8 */}
    {/* <Card className="overflow-hidden"> */}
    {/* <CardBody>
          <div className="bg-primary profile-bg rounded-top position-relative mx-n3 mt-n3">
            <Image src={user.profilePic} alt="avatar" width={100} height={100} className="avatar-xl border border-light border-3 rounded-circle position-absolute top-100 start-0 translate-middle ms-5" />
          </div>
          <div className="mt-5 d-flex flex-wrap align-items-center justify-content-between">
            <div>
              <h4 className="mb-1">
                {user?.fullName} <IconifyIcon icon="bxs:badge-check" className="text-success align-middle" />
              </h4>
              <p className="mb-0">{user?.roleName}</p>
            </div>
            <div className="d-flex align-items-center gap-2 my-2 my-lg-0">
              <Link href="" className="btn btn-info">
                <IconifyIcon icon="bx:message-dots" /> Message
              </Link>
              <Link href="" className="btn btn-outline-primary">
                <IconifyIcon icon="bx:plus" /> Follow
              </Link>
              <Dropdown>
                <DropdownToggle as={'a'} href="#" className="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                  <IconifyIcon icon="solar:menu-dots-bold" className="fs-20 align-middle text-muted" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <a href="" className="dropdown-item">
                    Download
                  </a>
                  <a href="" className="dropdown-item">
                    Export
                  </a>
                  <a href="" className="dropdown-item">
                    Import
                  </a>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <Row className="mt-3 gy-2">
            <Col lg={2} xs={6}>
              <div className="d-flex align-items-center gap-2 border-end">
                <div>
                  <IconifyIcon icon="solar:clock-circle-bold-duotone" className="fs-28 text-primary" />
                </div>
                <div>
                  <h5 className="mb-1">{user.email}</h5>
                  <p className="mb-0">Email</p>
                </div>
              </div>
            </Col>
            <Col lg={2} xs={6}>
              <div className="d-flex align-items-center gap-2">
                <div>
                  <IconifyIcon icon="solar:cup-star-bold-duotone" className="fs-28 text-primary" />
                </div>
                <div>
                  <h5 className="mb-1">{user.phoneNumber}</h5>
                  <p className="mb-0">Phone</p>
                </div>
              </div>
            </Col>
            <Col lg={2} xs={6}>
              <div className="d-flex align-items-center gap-2">
                <div>
                  <IconifyIcon icon="solar:notebook-bold-duotone" className="fs-28 text-primary" />
                </div>
                <div>
                  <h5 className="mb-1">2 Internship</h5>
                  <p className="mb-0">Completed</p>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody> */}
    {/* </Card> */}
    {/* <Col xl={12} lg={12}> */}
    <Col xl={4} lg={6} md={8} sm={12} xs={12} className='pr-0 pl-0' >
      <div className="card shadow-sm rounded-4 p-4">
        <h4 className="fw-semibold mb-4">Profile Details</h4>

        {/* <!-- Profile Box --> */}
        <div className="d-flex align-items-center justify-content-between p-3 border border-danger rounded-3 bg-light-subtle mb-4">
          <div className="d-flex align-items-center gap-3">
            {userData?.profilePic && (
              <img
                src={userData?.profilePic}
                alt="Avatar"
                className="rounded-circle"
                width="60"
                height="60"
              />
            )}
            <div>
              <h6 className="mb-0 fw-semibold">{userData?.fullName}</h6>
              <small className="text-muted">{userData?.email}</small>
            </div>
          </div>
          <>
            {/* Show text on small to tablet screens (lg and below) */}
            <a
              href="#"
              className="text-danger text-decoration-none fw-medium d-none d-md-block"
              onClick={() => setShowModal(true)}
            >
              Edit Profile
            </a>

            {/* Show icon on large screens and above */}
            <a
              href="#"
              className="text-danger text-decoration-none fw-medium d-md-none"
              onClick={() => setShowModal(true)}
              title="Edit Profile"
            >
              <IconifyIcon icon="solar:pen-2-bold" className="fs-18 align-middle" />
            </a>
          </>

        </div>

        {/* <!-- Info List --> */}
        <div className="mb-3 d-flex align-items-center">
          <div className="bg-light-subtle rounded-circle p-2 me-3">
            {/* <i class="bi bi-telephone text-danger fs-4"></i> */}
            <IconifyIcon icon="bx:phone-call" className="fs-22 text-danger" />
          </div>
          <div>
            <small className="text-muted">Phone Number</small><br />
            <span className="fw-semibold">{userData?.phoneNumber}</span>
          </div>
        </div>

        <div className="mb-3 d-flex align-items-center">
          <div className="bg-light-subtle rounded-circle p-2 me-3">
            {/* <i class="bi bi-person text-danger fs-4"></i> */}
            <IconifyIcon icon="mdi:account-badge" className="fs-22 text-danger" />
          </div>
          <div>
            <small className="text-muted">Role</small><br />
            <span className="fw-semibold">{userData?.roleName}</span>
          </div>
        </div>

        <div className="mb-4 d-flex align-items-center">
          <div className="bg-light-subtle rounded-circle p-2 me-3">
            <IconifyIcon icon="bx:user-circle" className="fs-22 text-danger" />
          </div>
          <div>
            <small className="text-muted">Gender</small><br />
            <span className="fw-semibold">{userData?.gender}</span>
          </div>
        </div>

        <div className="d-flex gap-3 justify-content-center">
          {/* <button class="btn btn-outline-dark rounded-pill px-4">Change Password</button> */}
          <button className="btn btn-danger rounded-pill px-4" onClick={() => push('/auth/change-password')} >Change Password</button>
        </div>
      </div>

      <EditProfileModal show={showModal} onHide={() => setShowModal(false)} userData={userData} getProfileDetails={getProfileDetails} />
    </Col>
    {/* </Col> */}
    {/* <Col xl={3} lg={4}>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'}>Personal Information</CardTitle>
          </CardHeader>
          <CardBody>
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                  <IconifyIcon icon="solar:backpack-bold-duotone" className="fs-20 text-secondary" />
                </div>
                <p className="mb-0 fs-14">Project Head Manager</p>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                  <IconifyIcon icon="solar:square-academic-cap-2-bold-duotone" className="fs-20 text-secondary" />
                </div>
                <p className="mb-0 fs-14">
                  Went to <span className="text-dark fw-semibold">Oxford International</span>
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                  <IconifyIcon icon="solar:map-point-bold-duotone" className="fs-20 text-secondary" />
                </div>
                <p className="mb-0 fs-14">
                  Lives in <span className="text-dark fw-semibold">Pittsburgh, PA 15212</span>
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                  <IconifyIcon icon="solar:users-group-rounded-bold-duotone" className="fs-20 text-secondary" />
                </div>
                <p className="mb-0 fs-14">
                  Followed by <span className="text-dark fw-semibold">16.6k People</span>
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                  <IconifyIcon icon="solar:letter-bold-duotone" className="fs-20 text-secondary" />
                </div>
                <p className="mb-0 fs-14">
                  Email{' '}
                  <Link href="" className="text-primary fw-semibold">
                    hello@dundermuffilin.com
                  </Link>
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                  <IconifyIcon icon="solar:link-bold-duotone" className="fs-20 text-secondary" />
                </div>
                <p className="mb-0 fs-14">
                  Website{' '}
                  <Link href="" className="text-primary fw-semibold">
                    www.larkon.co
                  </Link>
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                  <IconifyIcon icon="solar:global-bold-duotone" className="fs-20 text-secondary" />
                </div>
                <p className="mb-0 fs-14">
                  Language <span className="text-dark fw-semibold">English , Spanish , German</span>
                </p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
                  <IconifyIcon icon="solar:check-circle-bold-duotone" className="fs-20 text-secondary" />
                </div>
                <p className="mb-0 fs-14">
                  Status <span className="badge bg-success-subtle text-success ms-1">Active</span>
                </p>
              </div>
              <div className="mt-2">
                <Link href="" className="text-primary">
                  View More
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col> */}
  </Row>;
};
export default ProfileMain;