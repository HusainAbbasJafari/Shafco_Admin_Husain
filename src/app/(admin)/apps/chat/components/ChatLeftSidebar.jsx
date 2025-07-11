import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useChatContext } from '@/context/useChatContext';
import Image from 'next/image';
import { useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardHeader, CardTitle, Nav, NavItem, NavLink, Offcanvas, OffcanvasHeader, TabContainer, TabContent, TabPane } from 'react-bootstrap';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Chat from './Chat';
import Contact from './Contact';
import Group from './Group';
import avatar1 from '@/assets/images/users/avatar-1.jpg';
import Link from 'next/link';
const ChatLeftSidebar = ({
  users,
  onUserSelect,
  selectedUser
}) => {
  const {
    chatSetting
  } = useChatContext();
  const [user, setUser] = useState([...users]);
  const search = text => {
    setUser(text ? [...users].filter(u => u.name.toLowerCase().indexOf(text.toLowerCase()) >= 0) : [...users]);
  };
  return <Card className="position-relative overflow-hidden">
      <CardHeader className="border-0 d-flex justify-content-between align-items-center">
        <CardTitle as={'h4'}>Chat</CardTitle>
        <span onClick={chatSetting.toggle} className="fs-18" role="button" data-bs-toggle="offcanvas">
          <IconifyIcon icon="bx:cog" />
        </span>
      </CardHeader>
      <form className="chat-search px-3">
        <div className="chat-search-box">
          <input className="form-control" type="text" name="search" placeholder="Search ..." onKeyUp={e => search(e.target.value)} />
          <button type="submit" className="btn btn-sm btn-link search-icon p-0">
            <IconifyIcon icon="bx:search-alt" />
          </button>
        </div>
      </form>
      <Swiper loop pagination={{
      el: '.swiper-pagination',
      clickable: true
    }} slidesPerView={7} spaceBetween={8} breakpoints={{
      0: {
        slidesPerView: 5
      },
      1400: {
        slidesPerView: 6
      }
    }} autoHeight className="mySwiper p-1 mx-3" style={{
      minHeight: 45
    }}>
        {users.map(user => <SwiperSlide className="avatar-sm" key={user.id}>
            <div className="chat-user-status-box">
              <span>
                <Image src={user.image} alt="avatar-1" className="img-fluid avatar-sm rounded-circle avatar-border" />
              </span>
            </div>
          </SwiperSlide>)}
      </Swiper>
      <TabContainer defaultActiveKey={1}>
        <Nav variant="underline" className="nav-justified border-bottom border-top mt-2">
          <NavItem>
            <NavLink eventKey={1} href="#chat-list" data-bs-toggle="tab" aria-expanded="false" className=" py-2">
              Chat
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey={2} href="#group-list" data-bs-toggle="tab" aria-expanded="true" className="py-2">
              Group
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink eventKey={3} href="#contact-list" data-bs-toggle="tab" aria-expanded="true" className="py-2">
              Contact
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent>
          <TabPane eventKey={1} className="" id="chat-list">
            <Chat onUserSelect={onUserSelect} users={user} selectedUser={selectedUser} />
          </TabPane>
          <TabPane eventKey={2} className="" id="group-list">
            <Group />
          </TabPane>
          <TabPane eventKey={3} className="" id="contact-list">
            <Contact />
          </TabPane>
        </TabContent>
      </TabContainer>
      <Offcanvas show={chatSetting.open} placement="start" onHide={chatSetting.toggle} className="offcanvas-start position-absolute shadow w-20" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="user-setting" aria-labelledby="user-settingLabel">
        <OffcanvasHeader>
          <h5 className="offcanvas-title text-truncate w-50" id="user-settingLabel">
            Profile
          </h5>
          <button type="button" onClick={chatSetting.toggle} className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </OffcanvasHeader>
        <div className="offcanvas-body p-0 h-100" data-simplebar>
          <h4 className="page-title p-3 my-0">Setting</h4>
          <div className="d-flex align-items-center px-3 pb-3 border-bottom">
            <Image src={avatar1} className="me-2 rounded-circle" height={36} alt="avatar-1" />
            <div className="flex-grow-1">
              <div className="float-end">
                <Link href="">
                  <IconifyIcon icon="bx:qr-scan" className="fs-20" />
                </Link>
              </div>
              <h5 className="my-0 fs-14">Gaston Lapierre</h5>
              <p className="mt-1 mb-0 text-muted">
                <span className="w-75">Hey there! I am using Larkon Chat.</span>
              </p>
            </div>
          </div>
          <div className="px-3 my-3 app-chat-setting">
            <Accordion className="custom-accordion" id="accordionSetting">
              <AccordionItem eventKey="1" className="border-0">
                <AccordionHeader as={'h5'} className="my-0" id="headingAccount">
                  <span className="d-flex align-items-center">
                    <div>
                      <IconifyIcon icon="bx:key" width={20} height={20} className="me-3 fs-20" />
                    </div>
                    <span className="flex-grow-1">
                      <span className="fs-14 h5 mt-0 mb-1 d-block">Account</span>
                      <span className="mt-1 mb-0 text-muted w-75">Privacy, security, change number</span>
                    </span>
                  </span>
                </AccordionHeader>
                <AccordionBody className="pb-0">
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <Link href="">
                        <IconifyIcon icon="bx:lock-alt" className="fs-18 me-2" />
                        Privacy
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="">
                        <IconifyIcon icon="bx:check-Larkon" className="fs-18 me-2" />
                        Security
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="">
                        <IconifyIcon icon="bx:badge-check" className="fs-18 me-2" />
                        Two-step verification
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="">
                        <IconifyIcon icon="bx:arrow-from-left" className="fs-18 me-2" />
                        Change number
                      </Link>
                    </li>
                    <li className="mb-2">
                      <Link href="">
                        <IconifyIcon icon="bx:info-circle" className="fs-18 me-2" />
                        Request account info
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <IconifyIcon icon="bx:trash" className="fs-18 me-2" />
                        Delete my account
                      </Link>
                    </li>
                  </ul>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="2" className="border-0">
                <AccordionHeader as={'h5'} className="my-0" id="headingChats">
                  <span className="d-flex align-items-center">
                    <div>
                      {' '}
                      <IconifyIcon width={20} height={20} icon="bx:message-dots" className="me-3 fs-20" />
                    </div>
                    <span className="flex-grow-1">
                      <span className="fs-14 h5 mt-0 mb-1 d-block">Chats</span>
                      <span className="mt-1 mb-0 text-muted w-75">Theme, wallpapers, chat history</span>
                    </span>
                  </span>
                </AccordionHeader>
                <AccordionBody className="accordion-body pb-0">
                  <h5 className="mb-2">Display</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2 d-flex">
                      <i className="bx bx-palette fs-18 me-2" />
                      <div className="flex-grow-1">
                        <Link href="">Theme</Link>
                        <p className="mb-0 text-muted fs-12">System default</p>
                      </div>
                    </li>
                    <li className="mb-2">
                      <Link href="">
                        <i className="bx bx-image fs-16 me-2" />
                        Wallpaper
                      </Link>
                    </li>
                  </ul>
                  <hr />
                  <h5>Chat Setting</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2 ms-2">
                      <div className="float-end">
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="media" defaultChecked />
                        </div>
                      </div>
                      <Link href="">Media Visibility</Link>
                      <p className="mb-0 text-muted fs-12">Show Newly downloaded media in your phone&apos;s gallery</p>
                    </li>
                    <li className="mb-2 ms-2">
                      <div className="float-end">
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="enter" />
                        </div>
                      </div>
                      <Link href="">Enter is send</Link>
                      <p className="mb-0 text-muted fs-12">Enter key will send your message</p>
                    </li>
                    <li className="mb-2 ms-2">
                      <Link href="">Font size</Link>
                      <p className="mb-0 text-muted fs-12">small</p>
                    </li>
                  </ul>
                  <hr />
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <div className="d-flex">
                        <i className="bx bx-text fs-16 me-2" />
                        <div className="flex-grow-1">
                          <Link href="">App Language</Link>
                          <p className="mb-0 text-muted fs-12">English</p>
                        </div>
                      </div>
                    </li>
                    <li className="mb-2">
                      <Link href="">
                        <i className="bx bx-cloud-upload fs-16 me-2" />
                        Chat Backup
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <i className="bx bx-history fs-16 me-2" />
                        Chat History
                      </Link>
                    </li>
                  </ul>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="3" className="border-0">
                <AccordionHeader as={'h5'} className="accordion-header my-0" id="headingNotification">
                  <span className="d-flex align-items-center">
                    <div>
                      {' '}
                      <IconifyIcon icon="bx:bell" width={20} height={20} className="me-3 fs-20" />{' '}
                    </div>
                    <span className="flex-grow-1">
                      <span className="fs-14 h5 mt-0 mb-1 d-block">Notification</span>
                      <span className="mt-1 mb-0 text-muted w-75">Message, group, call tones</span>
                    </span>
                  </span>
                </AccordionHeader>
                <AccordionBody className="accordion-body pb-0">
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <div className="float-end">
                        <div className="form-check form-switch">
                          <input className="form-check-input" type="checkbox" id="conversation" defaultChecked />
                        </div>
                      </div>
                      <Link href="">Conversation Tones</Link>
                      <p className="mb-0 text-muted fs-12">Play sound for incoming and outgoing message.</p>
                    </li>
                  </ul>
                  <hr />
                  <h5>Messages</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <Link href="">Notification Tone</Link>
                      <p className="mb-0 text-muted fs-12">Default ringtone</p>
                    </li>
                    <li className="mb-2">
                      <Link href="">Vibrate</Link>
                      <p className="mb-0 text-muted fs-12">Default</p>
                    </li>
                    <li className="mb-2">
                      <Link href="">Light</Link>
                      <p className="mb-0 text-muted fs-12">White</p>
                    </li>
                  </ul>
                  <hr />
                  <h5>Groups</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <Link href="">Notification Tone</Link>
                      <p className="mb-0 text-muted fs-12">Default ringtone</p>
                    </li>
                    <li className="mb-2">
                      <Link href="">Vibrate</Link>
                      <p className="mb-0 text-muted fs-12">Off</p>
                    </li>
                    <li className="mb-2">
                      <Link href="">Light</Link>
                      <p className="mb-0 text-muted fs-12">Dark</p>
                    </li>
                  </ul>
                  <hr />
                  <h5>Calls</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <Link href="">Ringtone</Link>
                      <p className="mb-0 text-muted fs-12">Default ringtone</p>
                    </li>
                    <li>
                      <Link href="">Vibrate</Link>
                      <p className="mb-0 text-muted fs-12">Default</p>
                    </li>
                  </ul>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="3" className="border-0">
                <AccordionHeader as={'h5'} className="my-0" id="headingStorage">
                  <span className="d-flex align-items-center">
                    <div>
                      {' '}
                      <IconifyIcon width={20} height={20} icon="bx:history" className="me-3 fs-20" />
                    </div>
                    <span className="flex-grow-1">
                      <span className="fs-14 h5 mt-0 mb-1 d-block">Storage and data</span>
                      <span className="mt-1 mb-0 text-muted w-75">Network usage, auto download</span>
                    </span>
                  </span>
                </AccordionHeader>
                <AccordionBody className=" pb-0">
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex">
                      <i className="bx bx-folder fs-16 me-2" />
                      <div className="flex-grow-1">
                        <Link href="">Manage storage</Link>
                        <p className="mb-0 text-muted fs-12">2.4 GB</p>
                      </div>
                    </li>
                  </ul>
                  <hr />
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex">
                      <i className="bx bx-wifi fs-16 me-2" />
                      <div className="flex-grow-1">
                        <Link href="">Network usage</Link>
                        <p className="mb-0 text-muted fs-12">7.2 GB sent - 13.8 GB received</p>
                      </div>
                    </li>
                  </ul>
                  <hr />
                  <h5 className="mb-0">Media auto-download</h5>
                  <p className="mb-0 text-muted fs-12">Voice message are always automatically downloaded</p>
                  <ul className="list-unstyled mb-0 mt-2">
                    <li className="mb-2">
                      <Link href="">When using mobile data</Link>
                      <p className="mb-0 text-muted fs-12">No media</p>
                    </li>
                    <li className="mb-2 ms-2">
                      <Link href="">When connected on wi-fi</Link>
                      <p className="mb-0 text-muted fs-12">No media</p>
                    </li>
                    <li className="mb-2 ms-2">
                      <Link href="">When roaming</Link>
                      <p className="mb-0 text-muted fs-12">No media</p>
                    </li>
                  </ul>
                  <hr />
                  <h5 className="mb-0">Media upload quality</h5>
                  <p className="mb-0 text-muted fs-12">Choose the quality of media files to be sent</p>
                  <ul className="list-unstyled mb-0 mt-2">
                    <li className="ms-2">
                      <Link href="">Photo upload quality</Link>
                      <p className="mb-0 text-muted fs-12">Auto (recommended)</p>
                    </li>
                  </ul>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="4" className="border-0">
                <AccordionHeader as={'h5'} className="my-0" id="headingHelp">
                  <span className="d-flex align-items-center">
                    <div>
                      {' '}
                      <IconifyIcon icon="bx:info-circle" width={20} height={20} className="me-3 fs-20" />
                    </div>
                    <span className="flex-grow-1">
                      <span className="fs-14 h5 mt-0 mb-1 d-block">Help</span>
                      <span className="mt-1 mb-0 text-muted w-75">Help center, contact us, privacy policy</span>
                    </span>
                  </span>
                </AccordionHeader>
                <AccordionBody className="pb-0">
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <Link href="">
                        <IconifyIcon icon="bx:info-circle" className="fs-16 me-2" />
                        Help center
                      </Link>
                    </li>
                    <li className="mb-2 d-flex">
                      <div>
                        {' '}
                        <IconifyIcon icon="bxs-contact" width={20} height={20} className="fs-16 me-2" />
                      </div>
                      <div className="flex-grow-1">
                        <Link href="">Contact us</Link>
                        <p className="mb-0 text-muted fs-12">Questions?</p>
                      </div>
                    </li>
                    <li className="mb-2">
                      <Link href="">
                        <IconifyIcon icon="bx:book-content" className="fs-16 me-2" />
                        Teams and Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <IconifyIcon icon="bx:info-circle" className="fs-16 me-2" />
                        App info
                      </Link>
                    </li>
                  </ul>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Offcanvas>
    </Card>;
};
export default ChatLeftSidebar;