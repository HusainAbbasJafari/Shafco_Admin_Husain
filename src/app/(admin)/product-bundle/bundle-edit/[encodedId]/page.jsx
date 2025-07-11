import React from 'react';
import { Row } from 'react-bootstrap';

import PageTItle from '@/components/PageTItle';
import EditBundle from '../components/EditBundle';
export const metadata = {
  title: 'Product Edit'
};
const BundleEditPage = () => {
  return <>
      <PageTItle title="EDIT BUNDLE" />
      <Row>
        
       <EditBundle/>
      </Row>
    </>;
};
export default BundleEditPage;