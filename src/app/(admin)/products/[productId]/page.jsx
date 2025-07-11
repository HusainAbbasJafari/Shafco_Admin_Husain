import React from 'react';
import ProductDetails from './components/ProductDetails';
import Step from './components/Step';
import Review from './components/Review';
import ItemDetails from './components/ItemDetails';
import { Row } from 'react-bootstrap';
import { getProductById } from '@/helpers/data';
import { notFound } from 'next/navigation';
import PageTItle from '@/components/PageTItle';
export const generateMetadata = async ({
  params
}) => {
  const product = await getProductById(params.productId);
  return {
    title: product?.id ?? 'Product Details'
  };
};
const ProductDetailsPage = async ({
  params
}) => {
  const product = await getProductById(params.productId);
  if (!product) notFound();
  return <>
      <PageTItle title="PRODUCT DETAILS" />
      <ProductDetails />
      <Step />
      <Row>
        <ItemDetails />
        <Review />
      </Row>
    </>;
};
export default ProductDetailsPage;