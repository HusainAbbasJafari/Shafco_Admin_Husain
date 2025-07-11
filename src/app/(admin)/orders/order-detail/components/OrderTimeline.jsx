import React from 'react';
import { timelineData } from '../data';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
import Link from 'next/link';
const OrderTimeline = () => {
  return <Card>
      <CardHeader>
        <CardTitle as={'h4'}>Order Timeline</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="position-relative ms-2">
          <span className="position-absolute start-0  top-0 border border-dashed h-100" />
          {timelineData.map((item, idx) => <div className="position-relative ps-4" key={idx}>
              <div className="mb-4">
                {idx == 0 ? <span className="position-absolute start-0 avatar-sm translate-middle-x bg-light d-inline-flex align-items-center justify-content-center rounded-circle">
                    <div className="spinner-border spinner-border-sm text-warning" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </span> : <span className="position-absolute start-0 avatar-sm translate-middle-x bg-light d-inline-flex align-items-center justify-content-center rounded-circle text-success fs-20">
                    <IconifyIcon icon="bx:check-circle" />
                  </span>}
                <div className="ms-2 d-flex flex-wrap gap-2 align-items-center justify-content-between">
                  <div>
                    <h5 className="mb-1 text-dark fw-medium fs-15">{item.title}</h5>
                    <p className="mb-2">{item.description}</p>
                    {item.isInvoice && <Link href="" className="btn btn-light">
                        Resend Invoice
                      </Link>}
                    {item.downloadInvoice && <Link href="" className="btn btn-primary">
                        Download Invoice
                      </Link>}
                    {item.statusInvoice && <div className="d-flex align-items-center gap-2">
                        <p className="mb-1 text-dark fw-medium">Status :</p>
                        <span className="badge bg-success-subtle text-success  px-2 py-1 fs-13">Paid</span>
                      </div>}
                    {item.orderButton && item.orderButton.map((item, idx) => <>
                          <Link href="" key={idx} className="badge bg-light text-dark fw-normal  px-2 py-1 fs-13">
                            {item}
                          </Link>{' '}
                          &nbsp;
                        </>)}
                  </div>
                  <p className="mb-0">
                    {item.date.toLocaleString('en-us', {
                  day: 'numeric',
                  month: '2-digit',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                })}
                  </p>
                </div>
              </div>
            </div>)}
        </div>
      </CardBody>
    </Card>;
};
export default OrderTimeline;