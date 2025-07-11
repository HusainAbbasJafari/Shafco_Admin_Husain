import { currency } from '@/context/constants';
import { getAllOrders } from '@/helpers/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
const ProductDataList = async () => {
  const productData = await getAllOrders();
  return <Card>
      <CardHeader>
        <CardTitle as={'h4'}>Product</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="table-responsive">
          <table className="table align-middle mb-0 table-hover table-centered">
            <thead className="bg-light-subtle border-bottom">
              <tr>
                <th>Product Name &amp; Size</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Text</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {productData.slice(0, 4).map((item, idx) => <tr key={idx}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded bg-light avatar-md d-flex align-items-center justify-content-center">
                        {item.product?.image && <Image src={item.product.image} alt="productImg" className="avatar-md" />}
                      </div>
                      <div>
                        <Link href="" className="text-dark fw-medium fs-15">
                          {item.product?.title}
                        </Link>
                        <p className="text-muted mb-0 mt-1 fs-13">
                          <span>Size : </span>
                          {item.product?.size}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge bg-${item.orderStatus == 'Packaging' ? 'light' : item.orderStatus == 'Canceled' ? 'danger-subtle' : 'success-subtle'} text-${item.orderStatus == 'Packaging' ? 'dark' : item.orderStatus == 'Canceled' ? 'danger' : 'success'}  px-2 py-1 fs-13`}>
                      {item.orderStatus}
                    </span>
                  </td>
                  <td> {item.product?.quantity}</td>
                  <td>
                    {currency}
                    {item.product?.price}.00
                  </td>
                  <td>
                    {currency}
                    {item.product?.tex}.00
                  </td>
                  <td>{currency}83.00</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>;
};
export default ProductDataList;