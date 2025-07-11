'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, Col, ProgressBar, Row } from 'react-bootstrap';
import { companyReviewsData } from '../data';
import { currency } from '@/context/constants';
import Link from 'next/link';
const CompanyReviews = () => {
  return <>
      {companyReviewsData.map((item, idx) => <div className="d-flex align-items-center gap-3 my-3" key={idx}>
          <h5 className="mb-0 flex-shrink-0">{item.star}&nbsp;star :</h5>
          <ProgressBar variant="warning" className="flex-grow-1 rounded" now={item.progress} />
        </div>)}
    </>;
};
const SellerChat = () => {
  const chartOptions = {
    chart: {
      height: 328,
      type: 'area',
      dropShadow: {
        enabled: true,
        opacity: 0.2,
        blur: 10,
        left: -7,
        top: 22
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#47ad94', '#ff6c2f'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      curve: 'smooth',
      width: 2,
      lineCap: 'square'
    },
    series: [{
      name: 'Expenses',
      data: [16800, 16800, 15500, 17000, 14800, 15500, 19000, 16000, 15000, 17000, 14000, 17000]
    }, {
      name: 'Income',
      data: [16500, 17500, 16200, 21500, 17300, 16000, 16000, 17000, 16000, 19000, 18000, 19000]
    }],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        show: true
      },
      labels: {
        offsetX: 0,
        offsetY: 5,
        style: {
          fontSize: '12px',
          cssClass: 'apexcharts-xaxis-title'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function (value, index) {
          return value / 1000 + 'K';
        },
        offsetX: -15,
        offsetY: 0,
        style: {
          fontSize: '12px',
          cssClass: 'apexcharts-yaxis-title'
        }
      }
    },
    grid: {
      borderColor: '#191e3a',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      padding: {
        top: -50,
        right: 0,
        bottom: 0,
        left: 5
      }
    },
    legend: {
      show: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        inverseColors: !1,
        opacityFrom: 0.12,
        opacityTo: 0.1,
        stops: [100, 100]
      }
    },
    responsive: [{
      breakpoint: 575,
      options: {
        legend: {
          offsetY: -50
        }
      }
    }]
  };
  return <Row>
      <Col lg={9}>
        <Card>
          <CardBody>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h3 className="d-flex align-items-center gap-2">
                  {currency}5,563.786{' '}
                  <span className="badge text-success bg-success-subtle px-2 py-1 fs-12">
                    <IconifyIcon icon="bx:up-arrow-alt" />
                    4.53%
                  </span>
                </h3>
                <p className="mb-0 text-muted">
                  Gained <span className="text-success">{currency}378.56</span> This Month !
                </p>
              </div>
              <div className="avatar-md bg-light bg-opacity-50 rounded flex-centered">
                <IconifyIcon width={32} height={32} icon="solar:chart-2-bold-duotone" className="fs-32 text-primary" />
              </div>
            </div>
            <ReactApexChart options={chartOptions} series={chartOptions.series} height={328} type="area" className="apex-charts" />
          </CardBody>
        </Card>
      </Col>
      <Col lg={3}>
        <Card className="text-center">
          <CardBody>
            <h4 className="mb-0 text-dark fw-medium">Company Reviews</h4>
            <div className="p-2 d-flex gap-3 bg-light align-items-center justify-content-center mt-3 rounded">
              <ul className="d-flex text-warning m-0 fs-24  list-unstyled">
                <li>
                  <IconifyIcon icon="bxs:star" />
                </li>
                <li>
                  <IconifyIcon icon="bxs:star" />
                </li>
                <li>
                  <IconifyIcon icon="bxs:star" />
                </li>
                <li>
                  <IconifyIcon icon="bxs:star" />
                </li>
                <li>
                  <IconifyIcon icon="bxs-star-half" />
                </li>
              </ul>
              <p className="mb-0 text-dark fw-medium fs-16">4.5 Out of 5</p>
            </div>
            <p className="text-primary mt-2 fw-medium">Based on +23.5k Review</p>
            <div className="my-4">
              <CompanyReviews />
            </div>
            <Link href="" className="text-primary mt-2 fw-medium">
              How do we calculate ratings ?
            </Link>
          </CardBody>
        </Card>
      </Col>
    </Row>;
};
export default SellerChat;