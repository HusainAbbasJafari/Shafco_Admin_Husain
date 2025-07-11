import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import mastercardImg from '@/assets/images/card/mastercard.svg';
import avatar1 from '@/assets/images/users/avatar-1.jpg';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from 'react-bootstrap';
import { currency } from '@/context/constants';
import Link from 'next/link';
const OrderSummary = () => {
  return <>
      <CardHeader>
        <CardTitle as={'h4'}>Order Summary</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="table-responsive">
          <table className="table mb-0">
            <tbody>
              <tr>
                <td className="px-0">
                  <p className="d-flex mb-0 align-items-center gap-1">
                    <IconifyIcon icon="solar:clipboard-text-broken" /> Sub Total :{' '}
                  </p>
                </td>
                <td className="text-end text-dark fw-medium px-0">{currency}777.00</td>
              </tr>
              <tr>
                <td className="px-0">
                  <p className="d-flex mb-0 align-items-center gap-1">
                    <IconifyIcon icon="solar:ticket-broken" className="align-middle" /> Discount :{' '}
                  </p>
                </td>
                <td className="text-end text-dark fw-medium px-0">{currency}60.00</td>
              </tr>
              <tr>
                <td className="px-0">
                  <p className="d-flex mb-0 align-items-center gap-1">
                    <IconifyIcon icon="solar:kick-scooter-broken" className="align-middle" /> Delivery Charge :{' '}
                  </p>
                </td>
                <td className="text-end text-dark fw-medium px-0">{currency}00.00</td>
              </tr>
              <tr>
                <td className="px-0">
                  <p className="d-flex mb-0 align-items-center gap-1">
                    <IconifyIcon icon="solar:calculator-minimalistic-broken" className="align-middle" /> Estimated Tax (15.5%) :{' '}
                  </p>
                </td>
                <td className="text-end text-dark fw-medium px-0">{currency}20.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardBody>
      <CardFooter className="d-flex align-items-center justify-content-between bg-light-subtle">
        <div>
          <p className="fw-medium text-dark mb-0">Total Amount</p>
        </div>
        <div>
          <p className="fw-medium text-dark mb-0">{currency}737.00</p>
        </div>
      </CardFooter>
    </>;
};
const PaymentInformation = () => {
  return <>
      <CardHeader>
        <CardTitle as={'h4'}>Payment Information</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="rounded-3 bg-light avatar d-flex align-items-center justify-content-center">
            <Image src={mastercardImg} alt="mastercardImg" className="avatar-sm" />
          </div>
          <div>
            <p className="mb-1 text-dark fw-medium">Master Card</p>
            <p className="mb-0 text-dark">xxxx xxxx xxxx 7812</p>
          </div>
          <div className="ms-auto">
            <IconifyIcon icon="solar:check-circle-broken" className="fs-22 text-success" />
          </div>
        </div>
        <p className="text-dark mb-1 fw-medium">
          Transaction ID : <span className="text-muted fw-normal fs-13"> #IDN768139059</span>
        </p>
        <p className="text-dark mb-0 fw-medium">
          Card Holder Name : <span className="text-muted fw-normal fs-13"> Gaston Lapierre</span>
        </p>
      </CardBody>
    </>;
};
const CustomerDetails = () => {
  return <>
      <CardHeader>
        <CardTitle as={'h4'}>Customer Details</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="d-flex align-items-center gap-2">
          <Image src={avatar1} alt="avatar1" className="avatar rounded-3 border border-light border-3" />
          <div>
            <p className="mb-1">Gaston Lapierre</p>
            <Link href="" className="link-primary fw-medium">
              hello@dundermuffilin.com
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <h5>Contact Number</h5>
          <div>
            <Link href="">
              <IconifyIcon icon="bx:edit-alt" className="fs-18" />
            </Link>
          </div>
        </div>
        <p className="mb-1">(723) 732-760-5760</p>
        <div className="d-flex justify-content-between mt-3">
          <h5>Shipping Address</h5>
          <div>
            <Link href="">
              <IconifyIcon icon="bx:edit-alt" className="fs-18" />
            </Link>
          </div>
        </div>
        <div>
          <p className="mb-1">Wilson&apos;s Jewelers LTD</p>
          <p className="mb-1">1344 Hershell Hollow Road ,</p>
          <p className="mb-1">Tukwila, WA 98168 ,</p>
          <p className="mb-1">United States</p>
          <p>(723) 732-760-5760</p>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <h5>Billing Address</h5>
          <div>
            <Link href="">
              <IconifyIcon icon="bx:edit-alt" className="fs-18" />
            </Link>
          </div>
        </div>
        <p className="mb-1">Same as shipping address</p>
      </CardBody>
    </>;
};
const Map = () => {
  return <>
      <CardBody>
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe className="gmap_iframe rounded" width="100%" style={{
            height: 418
          }} frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=1980&height=400&hl=en&q=University of Oxford&t=&z=14&ie=UTF8&iwloc=B&output=embed" />
          </div>
        </div>
      </CardBody>
    </>;
};
const OrderDetails = () => {
  return <div>
      <Card>
        <OrderSummary />
      </Card>
      <Card>
        <PaymentInformation />
      </Card>
      <Card>
        <CustomerDetails />
      </Card>
      <Card>
        <Map />
      </Card>
    </div>;
};
export default OrderDetails;