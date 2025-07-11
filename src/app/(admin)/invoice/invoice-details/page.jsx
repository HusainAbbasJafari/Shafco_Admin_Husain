import Image from 'next/image';
import logoDark from '@/assets/images/logo-dark.png';
import checkImg from '@/assets/images/check-2.png';
import { getProductData } from '@/helpers/data';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Alert, Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap';
import { currency } from '@/context/constants';
import PageTItle from '@/components/PageTItle';
import Link from 'next/link';
export const metadata = {
  title: 'Invoice Details'
};
const ProductData = async () => {
  const productData = await getProductData();
  return <Row>
      <Col xs={12}>
        <div className="table-responsive table-borderless text-nowrap table-centered">
          <table className="table mb-0">
            <thead className="bg-light bg-opacity-50">
              <tr>
                <th className="border-0 py-2">Product Name</th>
                <th className="border-0 py-2">Quantity</th>
                <th className="border-0 py-2">Price</th>
                <th className="border-0 py-2">Tax</th>
                <th className="text-end border-0 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {productData.slice(0, 4).map((item, idx) => <tr key={idx}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded bg-light avatar d-flex align-items-center justify-content-center">
                        <Image src={item.image} alt="product-Image" className="avatar" />
                      </div>
                      <div>
                        <Link href="" className="text-dark fw-medium fs-15">
                          {item.title}
                        </Link>
                        <p className="text-muted mb-0 mt-1 fs-13">
                          <span>Size : </span>
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>${item.price}.00</td>
                  <td>${item.tex}.00</td>
                  <td className="text-end">${item.total}.00</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </Col>
    </Row>;
};
const page = () => {
  return <>
      <PageTItle title="INVOICE DETAILS" />
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card>
            <CardBody>
              <div className="clearfix pb-3 bg-info-subtle p-lg-3 p-2 m-n2 rounded position-relative">
                <div className="float-sm-start">
                  <div className="auth-logo">
                    <Image className="logo-dark me-1" src={logoDark} alt="logo-dark" height={24} />
                  </div>
                  <div className="mt-4">
                    <h4>Larkon Admin.</h4>
                    <address className="mt-3 mb-0">
                      1729 Bangor St,
                      <br />
                      Houlton, ME, 04730 , United States <br />
                      <abbr title="Phone">Phone:</abbr> +1(142)-532-9109
                    </address>
                  </div>
                </div>
                <div className="float-sm-end">
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td className="p-0 pe-5 py-1">
                            <p className="mb-0 text-dark fw-semibold"> Invoice : </p>
                          </td>
                          <td className="text-end text-dark fw-semibold px-0 py-1">#INV-0758267/90</td>
                        </tr>
                        <tr>
                          <td className="p-0 pe-5 py-1">
                            <p className="mb-0">Issue Date: </p>
                          </td>
                          <td className="text-end text-dark fw-medium px-0 py-1">23 April 2024</td>
                        </tr>
                        <tr>
                          <td className="p-0 pe-5 py-1">
                            <p className="mb-0">Due Date : </p>
                          </td>
                          <td className="text-end text-dark fw-medium px-0 py-1">26 April 2024</td>
                        </tr>
                        <tr>
                          <td className="p-0 pe-5 py-1">
                            <p className="mb-0">Amount : </p>
                          </td>
                          <td className="text-end text-dark fw-medium px-0 py-1">{currency}737.00</td>
                        </tr>
                        <tr>
                          <td className="p-0 pe-5 py-1">
                            <p className="mb-0">Status : </p>
                          </td>
                          <td className="text-end px-0 py-1">
                            <span className="badge bg-success text-white  px-2 py-1 fs-13">Paid</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="position-absolute top-100 start-50 translate-middle">
                  <Image src={checkImg} alt="check-2" className="img-fluid" />
                </div>
              </div>
              <div className="clearfix pb-3 mt-4">
                <div className="float-sm-start">
                  <div>
                    <CardTitle as={'h4'}>Issue From :</CardTitle>
                    <div className="mt-3">
                      <h4>Larkon Admin.INC</h4>
                      <p className="mb-2">2437 Romano Street Cambridge, MA 02141</p>
                      <p className="mb-2">
                        <span className="text-decoration-underline">Phone :</span> +(31)781-417-2004
                      </p>
                      <p className="mb-2">
                        <span className="text-decoration-underline">Email :</span> JulianeKuhn@jourrapide.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="float-sm-end">
                  <div>
                    <CardTitle as={'h4'}>Issue For :</CardTitle>
                    <div className="mt-3">
                      <h4>Gaston Lapierre</h4>
                      <p className="mb-2">1344 Hershell Hollow Road WA 98168 , USA</p>
                      <p className="mb-2">
                        <span className="text-decoration-underline">Phone :</span> +(123) 732-760-5760
                      </p>
                      <p className="mb-2">
                        <span className="text-decoration-underline">Email :</span> hello@dundermuffilin.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <ProductData />
              <Row className="justify-content-end">
                <Col lg={5} xs={6}>
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td className="text-end p-0 pe-5 py-2">
                            <p className="mb-0"> Sub Total : </p>
                          </td>
                          <td className="text-end text-dark fw-medium  py-2">{currency}777.00</td>
                        </tr>
                        <tr>
                          <td className="text-end p-0 pe-5 py-2">
                            <p className="mb-0">Discount : </p>
                          </td>
                          <td className="text-end text-dark fw-medium  py-2">-{currency}60.00</td>
                        </tr>
                        <tr>
                          <td className="text-end p-0 pe-5 py-2">
                            <p className="mb-0">Estimated Tax (15.5%) : </p>
                          </td>
                          <td className="text-end text-dark fw-medium  py-2">{currency}20.00</td>
                        </tr>
                        <tr className="border-top">
                          <td className="text-end p-0 pe-5 py-2">
                            <p className="mb-0 text-dark fw-semibold">Grand Amount : </p>
                          </td>
                          <td className="text-end text-dark fw-semibold  py-2">{currency}737.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={12}>
                  <Alert className="alert-danger alert-icon p-2" role="alert">
                    <div className="d-flex align-items-center">
                      <div className="avatar-sm rounded bg-danger d-flex justify-content-center align-items-center fs-18 me-2 flex-shrink-0">
                        <IconifyIcon icon="bx:info-circle" className="text-white" />
                      </div>
                      <div className="flex-grow-1">
                        All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit card or direct payment
                        online. If account is not paid within 7 days the credits details supplied as confirmation of work undertaken will be charged
                        the agreed quoted fee noted above.
                      </div>
                    </div>
                  </Alert>
                </Col>
              </Row>
              <div className="mt-3 mb-1">
                <div className="text-end d-print-none">
                  <a href="javascript:window.print()" className="btn btn-info width-xl">
                    Print
                  </a>
                  &nbsp;
                  <a href="" className="btn btn-outline-primary width-xl">
                    Submit
                  </a>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>;
};
export default page;