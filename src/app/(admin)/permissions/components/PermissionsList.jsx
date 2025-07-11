import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { getPermissionsListData } from '@/helpers/data';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { Card, CardFooter, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
const PermissionsList = async () => {
  const permissionsData = await getPermissionsListData();
  return <Row>
      <Col xl={12}>
        <Card>
          <div className="d-flex card-header justify-content-between align-items-center">
            <div>
              <CardTitle as={'h4'}>All Permissions List</CardTitle>
            </div>
            <Dropdown className="dropdown">
              <DropdownToggle as={'a'} href="#" className=" btn btn-sm btn-outline-light rounded content-none icons-center" data-bs-toggle="dropdown" aria-expanded="false">
                This Month <IconifyIcon className="ms-1" width={16} height={16} icon="bx:chevron-down" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem href="" className="dropdown-item">
                  Download
                </DropdownItem>
                <DropdownItem href="" className="dropdown-item">
                  Export
                </DropdownItem>
                <DropdownItem href="" className="dropdown-item">
                  Import
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div>
            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover table-centered">
                <thead className="bg-light-subtle">
                  <tr>
                    <th style={{
                    width: 20
                  }}>
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="customCheck1" />
                        <label className="form-check-label" htmlFor="customCheck1" />
                      </div>
                    </th>
                    <th>Name</th>
                    <th>Assigned To</th>
                    <th>Created Date &amp; Time</th>
                    <th>Last Update</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {permissionsData.map((item, idx) => <tr key={idx}>
                      <td>
                        <div className="form-check">
                          <input type="checkbox" className="form-check-input" id="customCheck2" />
                          <label className="form-check-label" htmlFor="customCheck2">
                            &nbsp;
                          </label>
                        </div>
                      </td>
                      <td>
                        <p className="fs-15 mb-0">{item.name}</p>
                      </td>
                      <td>
                        {item.assignedTo.map((assignItem, idx) => <Fragment key={idx}>
                            <span className={`badge bg-${assignItem == 'Administrator' ? 'info-subtle' : assignItem == 'Analyst' ? 'success-subtle' : assignItem == 'Trial' ? 'warning-subtle' : assignItem == 'Developer' ? 'light' : 'primary-subtle'} text-${assignItem == 'Administrator' ? 'info' : assignItem == 'Analyst' ? 'success' : assignItem == 'Trial' ? 'warning' : assignItem == 'Developer' ? 'dark' : 'primary'} py-1 px-2 fs-11`}>
                              {assignItem}
                            </span>
                            &nbsp;
                          </Fragment>)}
                      </td>
                      <td>
                        {item.date.toLocaleString('en-us', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: 'numeric'
                    })}
                      </td>
                      <td>{item.lastUpdate}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link href="" className="btn btn-light btn-sm">
                            <IconifyIcon icon="solar:eye-broken" className="align-middle fs-18" />
                          </Link>
                          <Link href="" className="btn btn-soft-primary btn-sm">
                            <IconifyIcon icon="solar:pen-2-broken" className="align-middle fs-18" />
                          </Link>
                          <Link href="" className="btn btn-soft-danger btn-sm">
                            <IconifyIcon icon="solar:trash-bin-minimalistic-2-broken" className="align-middle fs-18" />
                          </Link>
                        </div>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>
          <CardFooter className="border-top">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end mb-0">
                <li className="page-item">
                  <Link className="page-link" href="">
                    Previous
                  </Link>
                </li>
                <li className="page-item active">
                  <Link className="page-link" href="">
                    1
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" href="">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" href="">
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" href="">
                    Next
                  </Link>
                </li>
              </ul>
            </nav>
          </CardFooter>
        </Card>
      </Col>
    </Row>;
};
export default PermissionsList;