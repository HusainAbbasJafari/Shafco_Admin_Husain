import React from 'react';
import InvoiceCard from './components/InvoiceCard';
import InvoiceList from './components/InvoiceList';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Invoice List'
};
const InvoiceListPage = () => {
  return <>
      <PageTItle title="INVOICES LIST" />
      <InvoiceCard />
      <InvoiceList />
    </>;
};
export default InvoiceListPage;