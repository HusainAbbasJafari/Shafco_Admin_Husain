import React from 'react';
import Statistic from './components/Statistic';
import Stats from './components/Stats';
import ProjectSummary from './components/ProjectSummary';
import Schedules from './components/Schedules';
import Statistic2 from './components/Statistic2';
import { Col, Row } from 'react-bootstrap';
import Conversions from './components/Conversions';
import Statistic3 from './components/Statistic3';
import Tasks from './components/Tasks';
import FriendsRequest from './components/FriendsRequest';
import RecentTransactions from './components/RecentTransactions';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Widgets'
};
const WidgetsPage = () => {
  return <>
      <PageTItle title="WIDGETS" />
      <Row>
        <Statistic />
      </Row>
      <Stats />
      <Row>
        <Col xl={6}>
          <ProjectSummary />
        </Col>
        <Col xl={6}>
          <Schedules />
        </Col>
      </Row>
      <Row>
        <Statistic2 />
      </Row>
      <Row>
        <Col xs={12}>
          <Conversions />
        </Col>
      </Row>
      <Statistic3 />
      <Row>
        <Col xl={4}>
          <Tasks />
        </Col>
        <Col xl={4}>
          <FriendsRequest />
        </Col>
        <Col xl={4}>
          <RecentTransactions />
        </Col>
      </Row>
    </>;
};
export default WidgetsPage;