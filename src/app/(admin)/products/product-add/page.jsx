import React from 'react';
import { Row } from 'react-bootstrap';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/AddProduct';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Product Add'
};
const ProductAddPage = () => {
  return <>
      <PageTItle title="CREATE PRODUCT" />
      <Row>
        {/* <ProductDetails /> */}
        <AddProduct />
      </Row>
    </>;
};
export default ProductAddPage;