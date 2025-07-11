import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { getAllTasks } from '@/helpers/data';
import Link from 'next/link';
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
const Tasks = async () => {
  const tasksData = await getAllTasks();
  return <>
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <CardTitle as={'h4'}>My Tasks</CardTitle>
          <div>
            <Link href="" className="btn btn-sm btn-primary icons-center">
              <IconifyIcon icon="bx:plus" className="me-1" />
              Create Task
            </Link>
          </div>
        </CardHeader>
        <CardBody className="p-0 pb-3">
          <SimplebarReactClient className="p-3" style={{
          maxHeight: 386
        }}>
            {tasksData.map((item, idx) => <div className={`form-check form-todo ${idx == 0 ? 'ps-4' : 'py-1 my-2 ps-4'}  `} key={idx}>
                {item.status == 'Completed' ? <input type="checkbox" className="form-check-input rounded-circle mt-0 fs-18" defaultChecked id="customCheck2" /> : <input type="checkbox" className="form-check-input rounded-circle mt-0 fs-18" id="customCheck1" />}
                <label className="form-check-label" htmlFor="customCheck1">
                  {item.task}
                </label>
              </div>)}
          </SimplebarReactClient>
        </CardBody>
      </Card>
    </>;
};
export default Tasks;