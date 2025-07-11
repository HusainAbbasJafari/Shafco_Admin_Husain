import Link from 'next/link';
import { Button, Card, CardBody, Col, Row } from 'react-bootstrap';
import { getAllTasks } from '@/helpers/data';
import Image from 'next/image';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Todo'
};
const TodoPage = async () => {
  const allTasks = await getAllTasks();
  return <>
      <PageTItle title="TODO" />
      <Row>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex flex-wrap justify-content-between gap-3">
                <div className="search-bar">
                  <span>
                    <IconifyIcon icon="bx:search-alt" className="mb-1" />
                  </span>
                  <input type="search" className="form-control" id="search" placeholder="Search task..." />
                </div>
                <div>
                  <Button variant="primary" className="d-inline-flex align-items-center">
                    <IconifyIcon icon="bx:plus" className="me-1" />
                    Create Task
                  </Button>
                </div>
              </div>
            </CardBody>
            <div>
              <div className="table-responsive table-centered">
                <table className="table text-nowrap mb-0">
                  <thead className="bg-light bg-opacity-50">
                    <tr>
                      <th className="border-0 py-2">Task Name</th>
                      <th className="border-0 py-2">Created Date</th>
                      <th className="border-0 py-2">Due Date</th>
                      <th className="border-0 py-2">Assigned</th>
                      <th className="border-0 py-2">Status</th>
                      <th className="border-0 py-2">Priority</th>
                      <th className="border-0 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTasks?.map((task, idx) => {
                    return <tr key={idx}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div className="form-check form-todo ps-4">
                                <input type="checkbox" className="form-check-input rounded-circle mt-0 fs-18" id={`customCheck${idx}`} defaultChecked={task.status === 'Completed' ? true : false} />
                                <label className="form-check-label" htmlFor={`customCheck${idx}`}>
                                  {task.task}
                                </label>
                              </div>
                            </div>
                          </td>
                          <td>{new Date(task.createdAt).toDateString()}&nbsp;</td>
                          <td>{new Date(task.dueDate).toDateString()}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              {task.employee && <Image src={task.employee?.image} alt="avatar" className="avatar-xs rounded-circle me-2" />}
                              <div>
                                <h5 className="fs-14 mt-1 fw-normal">{task.employee?.name}</h5>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`badge badge-soft-${task.status === 'Pending' ? 'primary' : task.status === 'In-Progress' ? 'warning' : 'success'}`}>
                              {task.status}
                            </span>
                          </td>
                          <td className={`text-${task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'success'}`}>
                            <IconifyIcon icon="bxs:circle" className="me-1 mb-1" />
                            {task.priority}
                          </td>
                          <td>
                            <Button variant="soft-secondary" size="sm" className="me-2">
                              <IconifyIcon icon="bx:edit" className="fs-16" />
                            </Button>
                            <Button variant="soft-danger" size="sm" type="button">
                              <IconifyIcon icon="bx:trash" className="fs-16" />
                            </Button>
                          </td>
                        </tr>;
                  })}
                  </tbody>
                </table>
              </div>
              <div className="align-items-center justify-content-between row g-0 text-center text-sm-start p-3 border-top">
                <div className="col-sm">
                  <div className="text-muted">
                    Showing&nbsp;
                    <span className="fw-semibold">10</span> of&nbsp;
                    <span className="fw-semibold">52</span> tasks
                  </div>
                </div>
                <Col sm="auto" className="mt-3 mt-sm-0">
                  <ul className="pagination pagination-rounded m-0">
                    <li className="page-item">
                      <Link href="" className="page-link">
                        <IconifyIcon icon="bx:left-arrow-alt" />
                      </Link>
                    </li>
                    <li className="page-item active">
                      <Link href="" className="page-link">
                        1
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link href="" className="page-link">
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link href="" className="page-link">
                        3
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link href="" className="page-link">
                        <IconifyIcon icon="bx:right-arrow-alt" />
                      </Link>
                    </li>
                  </ul>
                </Col>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>;
};
export default TodoPage;