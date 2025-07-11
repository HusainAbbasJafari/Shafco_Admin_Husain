import React from 'react';
import ReceivedOrdersDetails from './components/ReceivedOrdersDetails';
import ReceivedOrderData from './components/ReceivedOrderData';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Received Orders'
};
const ReceivedOrdersPage = () => {
  return <>
      <PageTItle title="RECEIVED ORDERS" />
      <ReceivedOrdersDetails />
      <ReceivedOrderData />
    </>;
};
export default ReceivedOrdersPage;