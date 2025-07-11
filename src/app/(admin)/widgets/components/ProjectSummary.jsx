import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { getAllProjects } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, CardTitle, ProgressBar } from 'react-bootstrap';
const ProjectSummary = async () => {
  const projectData = await getAllProjects();
  return <>
      <Card>
        <CardBody className="p-0">
          <div className="pt-3 px-3">
            <div className="float-end">
              <Link href="" className="text-primary icons-center">
                Export
                <IconifyIcon icon="bx:export" className="ms-1" />
              </Link>
            </div>
            <CardTitle as={'h5'} className="mb-3">
              Recent Project Summary
            </CardTitle>
          </div>
          <SimplebarReactClient className="mb-3" style={{
          maxHeight: 324
        }}>
            <div className="table-responsive table-centered table-nowrap px-3">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Client</th>
                    <th>Team</th>
                    <th>Deadline</th>
                    <th>Work Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {projectData.map((item, idx) => <tr key={idx}>
                      <td>{item.projectName}</td>
                      <td>{item.client}</td>
                      <td className="avatar-group">
                        {item.teamMembers.map((avatar, idx) => <Link href="" className="avatar-group-item" key={idx}>
                            <Image src={avatar} alt="avatar-2" className="img-fluid avatar-xs rounded-circle avatar-border" />
                          </Link>)}
                      </td>
                      <td>{item.deadlineDate.toLocaleString('en-us', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}</td>
                      <td>
                        <ProgressBar now={item.progressValue} variant={item.variant} className=" progress-sm" role="progressbar" aria-valuenow={33} aria-valuemin={0} aria-valuemax={100} />
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </SimplebarReactClient>
        </CardBody>
      </Card>
    </>;
};
export default ProjectSummary;