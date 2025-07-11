'use client';

import clsx from 'clsx';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useEmailContext } from '@/context/useEmailContext';
import { getFileExtensionIcon } from '@/utils/get-icons';
const AttachmentItem = ({
  name
}) => {
  return <span className="badge bg-light border text-dark fw-semibold ms-1">
      {name && <IconifyIcon icon={getFileExtensionIcon(name)} className="text-primary me-2" />}
      {name}
    </span>;
};
const EmailItem = ({
  createdAt,
  id,
  attachments,
  content,
  from,
  important,
  read,
  starred,
  subject,
  to,
  sent
}) => {
  const {
    changeActiveMail
  } = useEmailContext();
  return <li className={clsx(!read && 'unread')}>
      <div className="col-mail col-mail-1">
        <div className="checkbox-wrapper-mail">
          <input type="checkbox" id={id} />
          <label htmlFor={id} className="toggle" />
        </div>
        <IconifyIcon icon={starred ? 'bxs:star' : 'bx:star'} className={clsx('star-toggle', {
        'text-warning': starred
      })} />
        <IconifyIcon icon={important ? 'bxs:tag-alt' : 'bx:tag-alt'} className={clsx('important-toggle', {
        'text-warning': important
      })} />
        <p role="button" onClick={() => changeActiveMail(id)} className="title mb-0">
          {sent ? `To: ${to?.name}` : from?.name}
        </p>
      </div>
      <div className="col-mail col-mail-2">
        <p role="button" onClick={() => changeActiveMail(id)} className="subject mb-0">
          {subject ?? '(No Subject)'}
          {content && <span>{' — ' + content}</span>}
          {attachments?.slice(0, 3)?.map((attachment, idx) => <AttachmentItem key={idx} {...attachment} />)}
          {attachments && attachments.length > 3 && <span className="badge ms-1 bg-light border text-dark fw-semibold rounded-circle">+{attachments?.length - 3}</span>}
        </p>
        <div className="date">{new Date(createdAt).toLocaleDateString()}</div>
      </div>
    </li>;
};
const EmailsList = ({
  emails,
  sent
}) => {
  return <ul className="message-list mb-0">
      {emails.map(email => <EmailItem key={email.id} {...email} sent={sent} />)}
    </ul>;
};
export default EmailsList;