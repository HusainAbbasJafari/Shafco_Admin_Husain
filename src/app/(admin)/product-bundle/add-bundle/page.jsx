import PageTItle from '@/components/PageTItle';
import { Row } from 'react-bootstrap';
import AddBundle from './components/AddBundle';
import BundleOptions from './components/BundleOptions';
export const metadata = {
    title: 'Add Product Bundle'
};

const ProductBundlePage = () => {
    return (
            <>
            <PageTItle title="CREATE PRODUCT BUNDLE" />
            <Row>
                <AddBundle/>
                 {/* <BundleOptions/> */}
            </Row>
            </>
    )
}

export default ProductBundlePage