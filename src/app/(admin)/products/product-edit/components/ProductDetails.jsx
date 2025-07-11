import product1 from '@/assets/images/product/p-1.png';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import Image from 'next/image';
import { Card, CardBody, Col } from 'react-bootstrap';
const ProductDetails = () => {
  return <Col xl={3} lg={4}>
      <Card>
        <CardBody>
          <Image src={product1} alt="product" className="img-fluid rounded bg-light" />
          <div className="mt-3">
            <h4>
              Men Black Slim Fit T-shirt <span className="fs-14 text-muted ms-1">(Fashion)</span>
            </h4>
            <h5 className="text-dark fw-medium mt-3">Price :</h5>
            <h4 className="fw-semibold text-dark mt-2 d-flex align-items-center gap-2">
              <span className="text-muted text-decoration-line-through">{currency}100</span> {currency}80{' '}
              <small className="text-muted"> (30% Off)</small>
            </h4>
            <div className="mt-3">
              <h5 className="text-dark fw-medium">Size :</h5>
              <div className="d-flex flex-wrap gap-2" role="group" aria-label="Basic checkbox toggle button group">
                <input type="checkbox" className="btn-check" id="size-s" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="size-s">
                  S
                </label>
                <input type="checkbox" className="btn-check" id="size-m" defaultChecked />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="size-m">
                  M
                </label>
                <input type="checkbox" className="btn-check" id="size-xl" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="size-xl">
                  Xl
                </label>
                <input type="checkbox" className="btn-check" id="size-xxl" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="size-xxl">
                  XXL
                </label>
              </div>
            </div>
            <div className="mt-3">
              <h5 className="text-dark fw-medium">Colors :</h5>
              <div className="d-flex flex-wrap gap-2" role="group" aria-label="Basic checkbox toggle button group">
                <input type="checkbox" className="btn-check" id="color-dark" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="color-dark">
                  {' '}
                  <span>
                    {' '}
                    <IconifyIcon icon="bxs:circle" height={18} width={18} className="fs-18 text-dark" />
                  </span>
                </label>
                <input type="checkbox" className="btn-check" id="color-yellow" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="color-yellow">
                  {' '}
                  <span>
                    {' '}
                    <IconifyIcon icon="bxs:circle" height={18} width={18} className="fs-18 text-warning" />
                  </span>
                </label>
                <input type="checkbox" className="btn-check" id="color-white" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="color-white">
                  {' '}
                  <span>
                    {' '}
                    <IconifyIcon icon="bxs:circle" height={18} width={18} className="fs-18 text-white" />
                  </span>
                </label>
                <input type="checkbox" className="btn-check" id="color-red" />
                <label className="btn btn-light avatar-sm rounded d-flex justify-content-center align-items-center" htmlFor="color-red">
                  {' '}
                  <span>
                    {' '}
                    <IconifyIcon icon="bxs:circle" height={18} width={18} className="fs-18 text-danger" />
                  </span>
                </label>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>;
};
export default ProductDetails;