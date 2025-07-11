import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Link from 'next/link';
import { Card, CardHeader, Col, Row } from 'react-bootstrap';
const ProductHead = () => {
  return <Card className="bg-light-subtle">
      <CardHeader className="border-0">
        <Row className="justify-content-between align-items-center">
          <Col lg={6}>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item fw-medium">
                <Link href="" className="text-dark">
                  Categories
                </Link>
              </li>
              <li className="breadcrumb-item active">All Product</li>
            </ol>
            <p className="mb-0 text-muted">
              Showing all <span className="text-dark fw-semibold">5,786</span> items results
            </p>
          </Col>
          <Col lg={6}>
            <div className="text-md-end mt-3 mt-md-0">
              <button type="button" className="btn btn-outline-secondary me-1">
                <IconifyIcon icon="bx-cog" className="me-1" />
                More Setting
              </button>
              <button type="button" className="btn btn-outline-secondary me-1">
                <IconifyIcon icon="bx-filter-alt" className="me-1" /> Filters
              </button>
              <Link href="/products/product-add" className="btn btn-success me-1">
                <IconifyIcon icon="bx-plus" /> New Product
              </Link>
            </div>
          </Col>
        </Row>
      </CardHeader>
    </Card>;
};
export default ProductHead;