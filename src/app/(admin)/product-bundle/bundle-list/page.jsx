import PageTItle from '@/components/PageTItle';
import { Row } from 'react-bootstrap';
import ProductBundleList from './components/ProductBundleList';

export const metadata = {
    title: 'Product Bundle List'
};

const BundleListPage = () => {
    return (
            <>
            <PageTItle title="PRODUCT BUNDLE LIST" />
            <Row>
               <ProductBundleList/>
            </Row>
            </>
    )
}

export default BundleListPage