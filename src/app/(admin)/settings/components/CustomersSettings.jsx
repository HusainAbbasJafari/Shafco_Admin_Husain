import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
const CustomersSettings = () => {
  return <Row>
      <Col lg={12}>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'} className="d-flex align-items-center gap-1">
              <IconifyIcon icon="solar:users-group-two-rounded-bold-duotone" className="text-primary fs-20" />
              Customers Settings
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Row className="justify-content-between g-3">
              <Col lg={2} className="border-end">
                <p>Customers Online</p>
                <div className="d-flex gap-2 align-items-center">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault5" id="flexRadioDefault9" defaultChecked />
                    <label className="form-check-label" htmlFor="flexRadioDefault9">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault5" id="flexRadioDefault10" />
                    <label className="form-check-label" htmlFor="flexRadioDefault10">
                      No
                    </label>
                  </div>
                </div>
              </Col>
              <Col lg={2} className="border-end">
                <p>Customers Activity</p>
                <div className="d-flex gap-2 align-items-center">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault6" id="flexRadioDefault11" defaultChecked />
                    <label className="form-check-label" htmlFor="flexRadioDefault11">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault6" id="flexRadioDefault12" />
                    <label className="form-check-label" htmlFor="flexRadioDefault12">
                      No
                    </label>
                  </div>
                </div>
              </Col>
              <Col lg={2} className=" border-end">
                <p>Customer Searches</p>
                <div className="d-flex gap-2 align-items-center">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault7" id="flexRadioDefault13" defaultChecked />
                    <label className="form-check-label" htmlFor="flexRadioDefault13">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault7" id="flexRadioDefault14" />
                    <label className="form-check-label" htmlFor="flexRadioDefault14">
                      No
                    </label>
                  </div>
                </div>
              </Col>
              <Col lg={2} className="border-end">
                <p>Allow Guest Checkout</p>
                <div className="d-flex gap-2 align-items-center">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault8" id="flexRadioDefault15" />
                    <label className="form-check-label" htmlFor="flexRadioDefault15">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault8" id="flexRadioDefault16" defaultChecked />
                    <label className="form-check-label" htmlFor="flexRadioDefault16">
                      No
                    </label>
                  </div>
                </div>
              </Col>
              <Col lg={2}>
                <p>Login Display Price</p>
                <div className="d-flex gap-2 align-items-center">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault9" id="flexRadioDefault17" />
                    <label className="form-check-label" htmlFor="flexRadioDefault17">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault9" id="flexRadioDefault18" defaultChecked />
                    <label className="form-check-label" htmlFor="flexRadioDefault18">
                      No
                    </label>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={6}>
                <form>
                  <div>
                    <label htmlFor="login-attempts" className="form-label">
                      Max Login Attempts
                    </label>
                    <input type="text" id="login-attempts" className="form-control" placeholder="max" defaultValue="1 hour" />
                  </div>
                </form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>;
};
export default CustomersSettings;