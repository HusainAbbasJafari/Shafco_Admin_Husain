import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardTitle, Col, Container, Row } from 'react-bootstrap';
import UIExamplesList from '@/components/UIExamplesList';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Breadcrumbs'
};
const page = () => {
  return <>
      <PageTItle title="BREADCRUMB" />
      <Container>
        <Row>
          <Col xl={9}>
            <Card>
              <CardBody>
                <CardTitle as={'h5'} className="mb-1 anchor" id="default">
                  Default Example
                  <a className="anchor-link" href="#default">
                    #
                  </a>
                </CardTitle>
                <p className="text-muted">
                  Use an ordered or unordered list with linked list items to create a minimally styled breadcrumb. Use our utilities to add additional
                  styles as desired.
                </p>
                <nav aria-label="breadcrumb">
                  <Breadcrumb className="py-0">
                    <BreadcrumbItem active aria-current="page">
                      Home
                    </BreadcrumbItem>
                  </Breadcrumb>
                </nav>
                <nav aria-label="breadcrumb">
                  <Breadcrumb className="py-0">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <div className="mx-1" style={{
                    height: 24
                  }}>
                      <IconifyIcon icon="bx:chevron-right" height={16} width={16} />
                    </div>
                    <BreadcrumbItem active aria-current="page">
                      Library
                    </BreadcrumbItem>
                  </Breadcrumb>
                </nav>
                <nav aria-label="breadcrumb">
                  <Breadcrumb className="mb-0 py-0">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <div className="mx-1" style={{
                    height: 24
                  }}>
                      <IconifyIcon icon="bx:chevron-right" height={16} width={16} />
                    </div>
                    <BreadcrumbItem>Library</BreadcrumbItem>
                    <div className="mx-1" style={{
                    height: 24
                  }}>
                      <IconifyIcon icon="bx:chevron-right" height={16} width={16} />
                    </div>
                    <BreadcrumbItem active aria-current="page">
                      Data
                    </BreadcrumbItem>
                  </Breadcrumb>
                </nav>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle as={'h5'} className="mb-1 anchor" id="dividers_breadcrumb">
                  Dividers Breadcrumb
                  <a className="anchor-link" href="#dividers_breadcrumb">
                    #
                  </a>
                </CardTitle>
                <p className="text-muted">Optionally you can also specify the icon with your breadcrumb item.</p>
                <nav aria-label="breadcrumb">
                  <Breadcrumb className="py-0">
                    <BreadcrumbItem active aria-current="page">
                      Home
                    </BreadcrumbItem>
                  </Breadcrumb>
                </nav>
                <nav aria-label="breadcrumb">
                  <Breadcrumb className="py-0">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <div className="mx-1" style={{
                    height: 24
                  }}>
                      {'>'}
                    </div>
                    <BreadcrumbItem active aria-current="page">
                      Library
                    </BreadcrumbItem>
                  </Breadcrumb>
                </nav>
                <nav aria-label="breadcrumb">
                  <Breadcrumb className="mb-0 py-0">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <div className="mx-1" style={{
                    height: 24
                  }}>
                      {'>'}
                    </div>
                    <BreadcrumbItem>Library</BreadcrumbItem>
                    <div className="mx-1" style={{
                    height: 24
                  }}>
                      {'>'}
                    </div>
                    <BreadcrumbItem active aria-current="page">
                      Data
                    </BreadcrumbItem>
                  </Breadcrumb>
                </nav>
              </CardBody>
            </Card>
          </Col>
          <Col xl={3}>
            <UIExamplesList examples={[{
            link: '#default',
            label: 'Default Example'
          }, {
            link: '#dividers_breadcrumb',
            label: 'Dividers Breadcrumb'
          }]} />
          </Col>
        </Row>
      </Container>
    </>;
};
export default page;