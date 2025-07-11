'use client';

import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
const EditForm = () => {
  const messageSchema = yup.object({
    name: yup.string().required('Please enter Variant Name'),
    value: yup.string().required('Please enter Attribute Value'),
    id: yup.string().required('Please enter Enter ID')
  });
  const {
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(messageSchema),
    defaultValues: {
      name: 'Brand',
      value: 'Dyson , H&M, Nike , GoPro , Huawei , Rolex , Zara , Thenorthface',
      id: 'BR-3922'
    }
  });
  return <Row>
      <Col lg={12}>
        <form onSubmit={handleSubmit(() => {})}>
          <Card>
            <CardHeader>
              <CardTitle as={'h4'}>Add Attribute</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <TextFormInput control={control} type="text" name="name" label="Attribute Variant" placeholder="Enter Name" />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <TextFormInput control={control} type="text" name="value" label="Attribute Value" placeholder="Enter Value" />
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <TextFormInput control={control} type="text" name="id" label="Attribute ID" placeholder="Enter ID" />
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <label htmlFor="option" className="form-label">
                      {' '}
                      Option
                    </label>
                    <ChoicesFormInput className="form-control" id="option" data-choices data-choices-groups data-placeholder="Select Option">
                      <option value="Dropdown">Dropdown</option>
                      <option value="Radio">Radio</option>
                    </ChoicesFormInput>
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="border-top">
              <Button type="submit" variant="primary">
                Edit Change
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Col>
    </Row>;
};
export default EditForm;