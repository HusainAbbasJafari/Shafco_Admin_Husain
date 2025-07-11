import { lazy, Suspense } from 'react';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import PageTItle from '@/components/PageTItle';
const CalendarPage = lazy(() => import('./components/CalendarPage'));
export const metadata = {
  title: 'Schedule'
};
const Schedule = () => {
  return <>
      <PageTItle title="CALENDAR" />
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <Row>
                <Suspense>
                  <CalendarPage />
                </Suspense>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>;
};
export default Schedule;