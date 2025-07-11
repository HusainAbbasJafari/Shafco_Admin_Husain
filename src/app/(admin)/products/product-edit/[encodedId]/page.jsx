import React from 'react';
import { Row } from 'react-bootstrap';

import PageTItle from '@/components/PageTItle';
import AddProduct from '../components/AddProduct';
export const metadata = {
  title: 'Product Edit'
};
const ProductEditPage = () => {
  return <>
      <PageTItle title="EDIT PRODUCT" />
      <Row>
        {/* <ProductDetails /> */}
        <AddProduct />
      </Row>
    </>;
};
export default ProductEditPage;