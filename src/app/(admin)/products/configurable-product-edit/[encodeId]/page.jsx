import PageTItle from '@/components/PageTItle';
import { Col, Row } from 'react-bootstrap';
import ConfigurableProduct from '../component/edit-configurable-product';

export const metadata = {
    title: 'Edit Configurable Products'
};
const ProductListPage = () => {
    return <>
        <PageTItle title="EDIT CONFIGURABLE PRODUCTS" />
        <Row>
            <Col xl={12}>
                <ConfigurableProduct />
            </Col>
        </Row>
    </>;
};
export default ProductListPage;