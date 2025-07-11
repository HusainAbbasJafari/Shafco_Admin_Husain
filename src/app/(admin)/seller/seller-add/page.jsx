import React from 'react';
import SellerAddDetails from './components/SellerAddDetails';
import SellerAddData from './components/SellerAddData';
import { Row } from 'react-bootstrap';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Seller Add'
};
const SellerAddPage = () => {
  return <>
      <PageTItle title="SELLER ADD" />
      <Row>
        <SellerAddDetails />
        <SellerAddData />
      </Row>
    </>;
};
export default SellerAddPage;