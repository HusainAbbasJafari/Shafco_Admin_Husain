import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
const StoreSettings = () => {
  return <Row>
      <Col lg={12}>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'} className="d-flex align-items-center gap-1">
              <IconifyIcon icon="solar:shop-2-bold-duotone" className="text-primary fs-20" />
              Store Settings
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col lg={6}>
                <form>
                  <div className="mb-3">
                    <label htmlFor="store-name" className="form-label">
                      Store Name
                    </label>
                    <input type="text" id="store-name" className="form-control" placeholder="Enter name" />
                  </div>
                </form>
              </Col>
              <Col lg={6}>
                <form>
                  <div className="mb-3">
                    <label htmlFor="owner-name" className="form-label">
                      Store Owner Full Name
                    </label>
                    <input type="text" id="owner-name" className="form-control" placeholder="Full name" />
                  </div>
                </form>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <label htmlFor="schedule-number" className="form-label">
                    Owner Phone number
                  </label>
                  <input type="number" id="schedule-number" name="schedule-number" className="form-control" placeholder="Number" />
                </div>
              </Col>
              <Col lg={6}>
                <form>
                  <div className="mb-3">
                    <label htmlFor="schedule-email" className="form-label">
                      Owner Email
                    </label>
                    <input type="email" id="schedule-email" name="schedule-email" className="form-control" placeholder="Email" />
                  </div>
                </form>
              </Col>
              <Col lg={12}>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Full Address
                  </label>
                  <textarea className="form-control bg-light-subtle" id="address" rows={3} placeholder="Type address" defaultValue={''} />
                </div>
              </Col>
              <Col lg={4}>
                <form>
                  <div className="mb-3">
                    <label htmlFor="your-zipcode" className="form-label">
                      Zip-Code
                    </label>
                    <input type="number" id="your-zipcode" className="form-control" placeholder="zip-code" />
                  </div>
                </form>
              </Col>
              <Col lg={4}>
                <form>
                  <div className="mb-3">
                    <label htmlFor="choices-city" className="form-label">
                      City
                    </label>
                    <ChoicesFormInput className="form-control" id="choices-city" data-choices data-choices-groups data-placeholder="Select City">
                      <option>Choose a city</option>
                      <optgroup label="UK">
                        <option value="London">London</option>
                        <option value="Manchester">Manchester</option>
                        <option value="Liverpool">Liverpool</option>
                      </optgroup>
                      <optgroup label="FR">
                        <option value="Paris">Paris</option>
                        <option value="Lyon">Lyon</option>
                        <option value="Marseille">Marseille</option>
                      </optgroup>
                      <optgroup label="DE" disabled>
                        <option value="Hamburg">Hamburg</option>
                        <option value="Munich">Munich</option>
                        <option value="Berlin">Berlin</option>
                      </optgroup>
                      <optgroup label="US">
                        <option value="New York">New York</option>
                        <option value="Washington" disabled>
                          Washington
                        </option>
                        <option value="Michigan">Michigan</option>
                      </optgroup>
                      <optgroup label="SP">
                        <option value="Madrid">Madrid</option>
                        <option value="Barcelona">Barcelona</option>
                        <option value="Malaga">Malaga</option>
                      </optgroup>
                      <optgroup label="CA">
                        <option value="Montreal">Montreal</option>
                        <option value="Toronto">Toronto</option>
                        <option value="Vancouver">Vancouver</option>
                      </optgroup>
                    </ChoicesFormInput>
                  </div>
                </form>
              </Col>
              <Col lg={4}>
                <form>
                  <label htmlFor="choices-country" className="form-label">
                    Country
                  </label>
                  <ChoicesFormInput className="form-control" id="choices-country" data-choices data-choices-groups data-placeholder="Select Country">
                    <option>Choose a country</option>
                    <optgroup>
                      <option>United Kingdom</option>
                      <option value="Fran">France</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="U.S.A">U.S.A</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="India">India</option>
                      <option value="Germany">Germany</option>
                      <option value="Spain">Spain</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                    </optgroup>
                  </ChoicesFormInput>
                </form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>;
};
export default StoreSettings;