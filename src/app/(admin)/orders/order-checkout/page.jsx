import React from 'react';
import CheckoutForm from './components/CheckoutForm';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Checkout'
};
const CheckoutPage = () => {
  return <>
      <PageTItle title="ORDER CHECKOUT" />
      <CheckoutForm />
    </>;
};
export default CheckoutPage;