import data from '@emoji-mart/data';
import EmojiPicker from '@emoji-mart/react';
import clsx from 'clsx';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Card, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalHeader, Offcanvas, OffcanvasHeader, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFormInput from '@/components/form/TextFormInput';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { useChatContext } from '@/context/useChatContext';
import { useLayoutContext } from '@/context/useLayoutContext';
import { addOrSubtractMinutesFromDate, timeSince } from '@/utils/date';
import { getFileExtensionIcon } from '@/utils/get-icons';
import small1 from '@/assets/images/small/img-1.jpg';
import small2 from '@/assets/images/small/img-2.jpg';
import small3 from '@/assets/images/small/img-3.jpg';
import avatar10 from '@/assets/images/users/avatar-10.jpg';
import Image from 'next/image';
import { messages } from '@/assets/data/products';
const MessageDropdown = ({
  message,
  toUser
}) => {
  return <Dropdown drop={message.from.id === toUser.id ? 'end' : 'start'} className="chat-conversation-actions">
      <DropdownToggle as={'a'} role="button" className="ps-1">
        <IconifyIcon icon="bx:dots-vertical-rounded" className="fs-18" />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <IconifyIcon icon="bx:share" className="me-2" />
          Reply
        </DropdownItem>
        <DropdownItem>
          <IconifyIcon icon="bx:share-alt" className="me-2" />
          Forward
        </DropdownItem>
        <DropdownItem>
          <IconifyIcon icon="bx:copy" className="me-2" />
          Copy
        </DropdownItem>
        <DropdownItem>
          <IconifyIcon icon="bx:bookmark" className="me-2" />
          Bookmark
        </DropdownItem>
        <DropdownItem>
          <IconifyIcon icon="bx:star" className="me-2" />
          Starred
        </DropdownItem>
        <DropdownItem>
          <IconifyIcon icon="bx:info-square" className="me-2" />
          Mark as Unread
        </DropdownItem>
        <DropdownItem>
          <IconifyIcon icon="bx:trash" className="me-2" />
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>;
};
const VideoCall = ({
  selectedUser
}) => {
  const {
    videoCall
  } = useChatContext();
  return <>
      <li className="list-inline-item fs-20 dropdown">
        <div role="button" className="text-dark" onClick={videoCall.toggle}>
          <IconifyIcon icon="bx:video" />
        </div>
      </li>

      <Modal show={videoCall.open} onHide={videoCall.toggle} centered size="sm" contentClassName="video-call" className="fade" id="videocall" aria-hidden="true">
        <ModalHeader className="border-0 mb-5 justify-content-end">
          <div className="video-call-head">
            <Image src={selectedUser.image} className="rounded" alt="avatar-4" />
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="video-call-action text-center pt-4 pb-2">
            <ul className="list-inline">
              <li className="list-inline-item avatar-sm fw-bold me-2">
                <div role="button" className="avatar-title rounded-circle bg-soft-light text-white fs-16">
                  <IconifyIcon icon="bx:microphone-off" />
                </div>
              </li>
              <li className="list-inline-item avatar fw-bold me-2">
                <div role="button" className="avatar-title rounded-circle bg-danger text-white fs-18">
                  <IconifyIcon icon="bx:video-off" onClick={videoCall.toggle} />
                </div>
              </li>
              <li className="list-inline-item avatar-sm fw-bold">
                <div role="button" className="avatar-title rounded-circle bg-soft-light text-white fs-16">
                  <IconifyIcon icon="bx:volume-full" />
                </div>
              </li>
            </ul>
          </div>
        </ModalBody>
      </Modal>
    </>;
};
const VoiceCall = ({
  selectedUser
}) => {
  const {
    voiceCall
  } = useChatContext();
  return <>
      <li className="list-inline-item fs-20 dropdown">
        <div role="button" className="text-dark" onClick={voiceCall.toggle}>
          <IconifyIcon icon="bx:phone-call" />
        </div>
      </li>

      <Modal show={voiceCall.open} onHide={voiceCall.toggle} centered size="sm" contentClassName="voice-call" className="fade" id="voicecall" aria-hidden="true">
        <ModalHeader className="border-0 mt-5 justify-content-center">
          <div className="voice-call-head">
            <Image src={selectedUser.image} className="rounded-circle" alt="avatar-4" />
          </div>
        </ModalHeader>
        <ModalBody className="pt-0 text-center">
          <h5>{selectedUser.name}</h5>
          <p className="mb-5">Calling...</p>
          <div className="voice-call-action pt-4 pb-2">
            <ul className="list-inline">
              <li className="list-inline-item avatar-sm fw-bold me-2">
                <div role="button" className="avatar-title rounded-circle bg-soft-secondary text-dark fs-16">
                  <IconifyIcon icon="bx:microphone-off" />
                </div>
              </li>
              <li className="list-inline-item avatar fw-bold me-2" onClick={voiceCall.toggle}>
                <div role="button" className="avatar-title rounded-circle bg-danger text-white fs-18">
                  <IconifyIcon icon="bx:phone-off" />
                </div>
              </li>
              <li className="list-inline-item avatar-sm fw-bold">
                <div role="button" className="avatar-title rounded-circle bg-soft-secondary text-dark fs-16">
                  <IconifyIcon icon="bx:volume-full" />
                </div>
              </li>
            </ul>
          </div>
        </ModalBody>
      </Modal>
    </>;
};
const ProfileDetail = ({
  selectedUser
}) => {
  const {
    chatProfile
  } = useChatContext();
  return <>
      <li className="list-inline-item fs-20 dropdown">
        <div role="button" onClick={chatProfile.toggle}>
          <IconifyIcon icon="bx:user" />
        </div>
      </li>

      <Offcanvas show={chatProfile.open} onHide={chatProfile.toggle} placement="end" className="shadow border-start" data-bs-scroll="true" tabIndex={-1}>
        <OffcanvasHeader closeButton>
          <h5 className="offcanvas-title text-truncate w-50" id="user-profileLabel">
            Profile
          </h5>
        </OffcanvasHeader>
        <SimplebarReactClient className="offcanvas-body p-0 h-100">
          <div className="p-3">
            <div className="text-center">
              <Image src={selectedUser.image} alt="shreyu" className="img-thumbnail avatar-lg rounded-circle mb-1" />
              <h4>{selectedUser.name}</h4>
              <Button variant="primary" size="sm" className="mt-1">
                <IconifyIcon icon="bi:envelope" className="me-1" />
                Send Email
              </Button>
              <p className="text-muted mt-2 fs-14">
                Last Interacted:
                <strong className={`text-${selectedUser.activityStatus === 'offline' ? 'danger' : 'success'}`}> {selectedUser.activityStatus}</strong>
              </p>
            </div>
            <div className="mt-3">
              <hr />
              <p className="mt-3 mb-1">
                <strong className="icons-center">
                  <IconifyIcon icon="bi:phone" className="me-1" />
                  Phone Number:
                </strong>
              </p>
              <p>+1 {selectedUser.phone}</p>
              <p className="mt-3 mb-1">
                <strong className="icons-center">
                  <IconifyIcon icon="bi:geo-alt" className="me-1" />
                  Location:
                </strong>
              </p>
              <p>{selectedUser.location}</p>
              <p className="mt-3 mb-1">
                <strong className="icons-center">
                  <IconifyIcon icon="bi:globe" className="me-1" />
                  Languages:
                </strong>
              </p>
              <p>
                {selectedUser.languages.map((language, idx) => <Fragment key={idx}>{language}, </Fragment>)}
              </p>
              <p className="mt-3 mb-2">
                <strong className="icons-center">
                  <IconifyIcon icon="bi:people" className="me-1" />
                  Groups:
                </strong>
              </p>
              <p className="mb-0">
                <span className="badge badge-soft-success p-1 fs-14 me-1">Work</span>
                <span className="badge badge-soft-primary p-1 fs-14">Friends</span>
              </p>
            </div>
            <h5 className="mt-3">
              <span role="button" className="my-0">
                <span className="float-end">See All</span>
                Shared Photoes
              </span>
            </h5>
            <Row className="gx-1 pt-2">
              <Col xs={4}>
                <div role="button">
                  <Image src={small1} alt="img-1" className="img-fluid rounded" />
                </div>
              </Col>
              <Col xs={4}>
                <div role="button">
                  <Image src={small2} alt="img-2" className="img-fluid rounded" />
                </div>
              </Col>
              <Col xs={4}>
                <div className="position-relative overflow-hidden rounded">
                  <div role="button">
                    <Image src={small3} alt="img-3" className="img-fluid rounded" />
                    <div className="bg-overlay bg-dark" />
                    <h3 className="position-absolute top-50 start-50 translate-middle my-0 text-white">+3</h3>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </SimplebarReactClient>
      </Offcanvas>
    </>;
};
const UserMessage = ({
  message,
  toUser
}) => {
  return <li className={clsx('clearfix', {
    odd: message.from.id === toUser.id
  })}>
      <div className={clsx('chat-conversation-text', {
      'ms-0': message.from.id === toUser.id
    })}>
        <div className={clsx('d-flex', {
        'justify-content-end': message.from.id === toUser.id
      })}>
          {message.from.id === toUser.id && <MessageDropdown message={message} toUser={toUser} />}
          <div className="chat-ctext-wrap d-flex">
            {message.message.type === 'text' && typeof message.message.value === 'string' && <p>{message.message.value}</p>}
            {message.message.type === 'file' && typeof message.message.value === 'object' && message.message.value.map((item, idx) => <Fragment key={idx}>
                  {item.preview && <div role=" button" key={idx}>
                      <Image src={item.preview} alt="attachment" height={84} width={121} className="img-thumbnail me-1" />
                    </div>}
                  {item.name && <div className="d-flex align-items-center justify-content-center">
                      <div className="flex-shrink-0">
                        <IconifyIcon icon={getFileExtensionIcon(item.name)} className="fs-24 me-1" />
                      </div>
                      <div className="flex-grow-1">
                        <span role="button" className="text-white">
                          {item.name}
                        </span>
                        <p className="mb-0">{item.size} MB</p>
                      </div>
                    </div>}
                </Fragment>)}
          </div>
          {message.from.id != toUser.id && <MessageDropdown message={message} toUser={toUser} />}
        </div>
        <p className="text-muted fs-12 mb-0 mt-1 ms-2">
          {message.sentOn && <>
              {timeSince(new Date(message.sentOn))}{' '}
              {message.from.id === toUser.id && <IconifyIcon icon="bx:check-double" className="ms-1 text-primary" />}
            </>}
        </p>
      </div>
    </li>;
};
const ChatArea = ({
  selectedUser
}) => {
  const [userMessages, setUserMessages] = useState([]);
  const messageSchema = yup.object({
    newMessage: yup.string().required('Please enter message')
  });
  const {
    reset,
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(messageSchema)
  });
  const [toUser] = useState({
    id: '112',
    name: 'Gilbert Chicoine',
    image: avatar10,
    address: '',
    compony: '',
    position: '',
    hasRequested: false,
    email: 'jamesbridge@teleworm.us',
    message: 'Hey! Okay, thank you for letting me know. See you!',
    time: addOrSubtractMinutesFromDate(650),
    phone: '456 9595 9594',
    mutualCount: 56,
    location: 'California, USA',
    languages: ['English', 'German', 'Spanish'],
    activityStatus: 'typing'
  });
  const getMessagesForUser = useCallback(() => {
    if (selectedUser) {
      setUserMessages([...messages].filter(m => m.to.id === toUser.id && m.from.id === selectedUser.id || toUser.id === m.from.id && m.to.id === selectedUser.id));
    }
  }, [selectedUser, toUser]);
  useEffect(() => {
    getMessagesForUser();
  }, [getMessagesForUser]);

  /**
   * sends the chat message
   */
  const sendChatMessage = values => {
    const newUserMessages = [...userMessages];
    newUserMessages.push({
      id: (userMessages.length + 1).toString(),
      from: toUser,
      to: selectedUser,
      message: {
        type: 'text',
        value: values.newMessage ?? ''
      },
      sentOn: addOrSubtractMinutesFromDate(0.1)
    });
    setTimeout(() => {
      const otherNewMessages = [...newUserMessages];
      otherNewMessages.push({
        id: (userMessages.length + 1).toString(),
        from: selectedUser,
        to: toUser,
        message: {
          type: 'text',
          value: values.newMessage ?? ''
        },
        sentOn: addOrSubtractMinutesFromDate(0.1)
      });
      setUserMessages(otherNewMessages);
    }, 1000);
    setUserMessages(newUserMessages);
    reset();
  };
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef(null);
    useEffect(() => {
      if (elementRef && elementRef.current && elementRef.current.scrollIntoView) {
        elementRef.current.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
    return <div ref={elementRef} />;
  };
  const {
    chatList,
    chatProfile
  } = useChatContext();
  const {
    theme
  } = useLayoutContext();
  return <Card className="position-relative overflow-hidden mb-0">
      <CardHeader className="d-flex align-items-center h-100">
        <Button variant="light" onClick={chatList.toggle} className="d-xxl-none d-flex align-items-center px-2 me-2" type="button">
          <IconifyIcon icon="bx:menu" className="fs-18" />
        </Button>
        <div className="d-flex align-items-center">
          <Image src={selectedUser.image} className="me-2 rounded" width={36} height={36} alt="avatar-4" />
          <div className="d-none d-md-flex flex-column">
            <h5 className="my-0 fs-16 fw-semibold">
              <span role="button" onClick={chatProfile.toggle} className="text-dark">
                {selectedUser.name}
              </span>
            </h5>
            <p className={`mb-0 text-${selectedUser.activityStatus === 'offline' ? 'danger' : 'success'} fw-semibold fst-italic`}>
              {selectedUser.activityStatus != 'typing' && <IconifyIcon icon="bxs:circle" className="fs-13" />}
              {selectedUser.activityStatus}
              {selectedUser.activityStatus === 'typing' && '...'}
            </p>
          </div>
        </div>
        <div className="flex-grow-1">
          <ul className="list-inline float-end d-flex gap-3 mb-0">
            <VideoCall selectedUser={selectedUser} />

            <VoiceCall selectedUser={selectedUser} />

            <ProfileDetail selectedUser={selectedUser} />

            <Dropdown className="list-inline-item fs-20 d-none d-md-flex">
              <DropdownToggle as={'a'} role="button" className="arrow-none text-dark" data-bs-toggle="dropdown" aria-expanded="false">
                <IconifyIcon icon="bx:dots-vertical-rounded" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>
                  <IconifyIcon icon="bx:user-circle" className="me-2" />
                  View Profile
                </DropdownItem>
                <DropdownItem>
                  <IconifyIcon icon="bx:music" className="me-2" />
                  Media, Links and Docs
                </DropdownItem>
                <DropdownItem>
                  <IconifyIcon icon="bx:search" className="me-2" />
                  Search
                </DropdownItem>
                <DropdownItem>
                  <IconifyIcon icon="bx:image" className="me-2" />
                  Wallpaper
                </DropdownItem>
                <DropdownItem>
                  <IconifyIcon icon="bx:right-arrow-circle" className="me-2" />
                  More
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ul>
        </div>
      </CardHeader>
      <div className="chat-box">
        <SimplebarReactClient className="chat-conversation-list p-3 chatbox-height">
          {userMessages.map((message, idx) => <UserMessage message={message} toUser={toUser} key={idx} />)}
          <AlwaysScrollToBottom />
        </SimplebarReactClient>

        <div className="bg-light bg-opacity-50 p-2">
          <form className="needs-validation" name="chat-form" id="chat-form" onSubmit={handleSubmit(sendChatMessage)}>
            <Row className="align-items-center">
              <Col className="mb-2 mb-sm-0 d-flex">
                <div className="input-group flex-nowrap">
                  <Dropdown drop="up">
                    <DropdownToggle type="button" className="btn h-100 btn-sm btn-light d-flex align-items-center input-group-text content-none">
                      <IconifyIcon icon="bx:smile" className="fs-18" />
                    </DropdownToggle>
                    <DropdownMenu className="p-0 rounded-4">
                      <EmojiPicker data={data} theme={theme} onEmojiSelect={e => console.info(e.native)} />
                    </DropdownMenu>
                  </Dropdown>
                  <TextFormInput noValidate control={control} name="newMessage" containerClassName="w-100" className="border-0" placeholder="Enter your message" />
                </div>
              </Col>
              <Col sm="auto">
                <div>
                  <div className="btn-group btn-toolbar">
                    <Button variant="light" size="sm">
                      <IconifyIcon icon="bx:paperclip" className="fs-18" />
                    </Button>
                    <Button variant="light" size="sm">
                      <IconifyIcon icon="bx:video" className="fs-18" />
                    </Button>
                    <Button variant="primary" size="sm" type="submit" className="chat-send">
                      <IconifyIcon icon="bx:send" className="fs-18" />
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </Card>;
};
export default ChatArea;