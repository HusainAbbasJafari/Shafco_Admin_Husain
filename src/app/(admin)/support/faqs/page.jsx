import smallImg from '@/assets/images/small/img-2.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, Col, Row } from 'react-bootstrap';
import { faqData } from './data';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Faqs'
};
const FaqsBanner = () => {
  return <Row className="justify-content-center">
      <Col lg={12}>
        <Card className="overflow-hidden" style={{
        background: `url(${smallImg.src})`
      }}>
          <div className="position-absolute top-0 end-0 bottom-0 start-0 bg-dark opacity-75" />
          <CardBody>
            <Row className="justify-content-center">
              <Col lg={7} className="text-center">
                <h3 className="text-white">Frequently Asked Questions</h3>
                <p className="text-white-50">We&apos;re here to help with any questions you have about plans, pricing, and supported features.</p>
                <div className="search-bar">
                  <span className="icons-center">
                    <IconifyIcon icon="bx:search-alt" />
                  </span>
                  <input type="search" className="form-control rounded-pill bg- border-0" id="search" placeholder="Search ..." />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>;
};
const GeneralFaqs = () => {
  return <>
      <h4 className="mb-3 fw-semibold fs-16">General</h4>
      <Accordion alwaysOpen defaultActiveKey={'0'}>
        {faqData.General.map((faq, idx) => <AccordionItem eventKey={`${idx}`} key={idx}>
            <AccordionHeader>
              <div className="fw-medium">{faq.question}</div>
            </AccordionHeader>
            <AccordionBody>{faq.answer}</AccordionBody>
          </AccordionItem>)}
      </Accordion>
    </>;
};
const RefundsFaqs = () => {
  return <>
      <h4 className="mb-3 mt-4 fw-semibold fs-16">Refunds</h4>
      <Accordion alwaysOpen defaultActiveKey={'0'}>
        {faqData.Refunds.map((faq, idx) => <AccordionItem eventKey={`${idx}`} key={idx}>
            <AccordionHeader>
              <div className="fw-medium">{faq.question}</div>
            </AccordionHeader>
            <AccordionBody>{faq.answer}</AccordionBody>
          </AccordionItem>)}
      </Accordion>
    </>;
};
const PaymentsFaqs = () => {
  return <>
      <h4 className="mb-3 fw-semibold fs-16">Payments</h4>
      <Accordion alwaysOpen defaultActiveKey={'0'}>
        {faqData.Payments.map((faq, idx) => <AccordionItem eventKey={`${idx}`} key={idx}>
            <AccordionHeader>
              <div className="fw-medium">{faq.question}</div>
            </AccordionHeader>
            <AccordionBody>{faq.answer}</AccordionBody>
          </AccordionItem>)}
      </Accordion>
    </>;
};
const SupportFaqs = () => {
  return <>
      <h4 className="mb-3 mt-4 fw-semibold fs-16">Support</h4>
      <Accordion alwaysOpen defaultActiveKey={'0'}>
        {faqData.Support.map((faq, idx) => <AccordionItem eventKey={`${idx}`} key={idx}>
            <AccordionHeader>
              <div className="fw-medium">{faq.question}</div>
            </AccordionHeader>
            <AccordionBody>{faq.answer}</AccordionBody>
          </AccordionItem>)}
      </Accordion>
    </>;
};
const FaqsPage = () => {
  return <>
      <PageTItle title="FAQS" />
      <FaqsBanner />
      <Row className="mt-4">
        <Col className="col">
          <Card>
            <CardBody className="p-4">
              <Row className="g-xl-4">
                <Col xl={6}>
                  <GeneralFaqs />
                  <RefundsFaqs />
                </Col>
                <Col xl={6}>
                  <PaymentsFaqs />
                  <SupportFaqs />
                </Col>
              </Row>
              <Row className="my-5">
                <Col xs={12} className="text-center">
                  <h4>Can&apos;t find a questions?</h4>
                  <button type="button" className="btn btn-success mt-2">
                    <IconifyIcon icon="bx:envelope" className="me-1" /> Email us your question
                  </button>
                  <button type="button" className="btn btn-info mt-2 ms-1">
                    <IconifyIcon icon="bxl:twitter" className="me-1" /> Send us a tweet
                  </button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>;
};
export default FaqsPage;