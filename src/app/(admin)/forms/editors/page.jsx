import { Card, CardBody, CardTitle, Col, Container, Row } from 'react-bootstrap';
import AllEditors from './components/AllEditors';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Editors'
};
const Editors = () => {
  return <>
      <PageTItle title="EDITORS" />
      <Container>
        <Row>
          <Col xl={12}>
            <Card>
              <CardBody>
                <CardTitle as={'h5'} className="mb-1 anchor" id="overview">
                  Overview
                  <a className="btn btn-sm btn-outline-success rounded-2 float-end" href="https://quilljs.com/" target="_blank">
                    Official Website
                  </a>
                </CardTitle>
                <p className="text-muted mb-3">Quilljs is a lightweight and powerful datetime picker.</p>
              </CardBody>
            </Card>
            <AllEditors />
          </Col>
        </Row>
      </Container>
    </>;
};
export default Editors;