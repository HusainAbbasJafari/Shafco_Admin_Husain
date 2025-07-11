import { Col, Row } from 'react-bootstrap';
import ProductList from './Components/ProductList';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Product List'
};
const ProductListPage = () => {
  return <>
      <PageTItle title="PRODUCT LIST" />
      <Row>
        <Col xl={12}>
          <ProductList />
        </Col>
      </Row>
    </>;
};
export default ProductListPage;