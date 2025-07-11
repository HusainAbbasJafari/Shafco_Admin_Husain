import PageTItle from '@/components/PageTItle';
import { Col, Row } from 'react-bootstrap';
import ConfigurableProduct from './component/add-configurable-product';
export const metadata = {
    title: 'Configurable Products'
};
const ProductListPage = () => {
    return <>
        <PageTItle title="CONFIGURABLE PRODUCTS" />
        <Row>
            <Col xl={12}>
            <ConfigurableProduct/>
            </Col>
        </Row>
    </>;
};
export default ProductListPage;