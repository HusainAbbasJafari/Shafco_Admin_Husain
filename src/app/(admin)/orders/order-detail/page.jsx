import React from 'react';
import ProgressCard from './components/ProgressCard';
import ProductDataList from './components/ProductDataList';
import OrderTimeline from './components/OrderTimeline';
import OrderTags from './components/OrderTags';
import OrderDetails from './components/OrderDetails';
import { Col, Row } from 'react-bootstrap';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Order Detail'
};
const OrderDetailPage = () => {
  return <>
      <PageTItle title="ORDER DETAILS" />
      <Row>
        <Col xl={9} lg={8}>
          <Row>
            <Col lg={12}>
              <ProgressCard />
              <ProductDataList />
              <OrderTimeline />
              <OrderTags />
            </Col>
          </Row>
        </Col>
        <Col xl={3} lg={4}>
          <OrderDetails />
        </Col>
      </Row>
    </>;
};
export default OrderDetailPage;