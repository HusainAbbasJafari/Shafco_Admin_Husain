import { Button, ButtonGroup } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
const EmailPagination = () => {
  return <div className="px-3 py-2 mt-auto">
      <div className="d-flex align-items-center justify-content-between">
        <div> Showing 1 - 20 of 289 </div>
        <ButtonGroup>
          <Button variant="light" size="sm" type="button" className="icons-center py-2">
            <IconifyIcon icon="bx:chevron-left" />
          </Button>
          <Button variant="primary" size="sm" type="button" className="icons-center py-2">
            <IconifyIcon icon="bx:chevron-right" />
          </Button>
        </ButtonGroup>
      </div>
    </div>;
};
export default EmailPagination;