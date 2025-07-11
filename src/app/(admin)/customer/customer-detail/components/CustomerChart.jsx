'use client';

import avatar2 from '@/assets/images/users/avatar-2.jpg';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currency } from '@/context/constants';
import Image from 'next/image';
import Link from 'next/link';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardFooter } from 'react-bootstrap';
const CustomerChart = () => {
  const chartOptions = {
    chart: {
      type: 'area',
      height: 208,
      sparkline: {
        enabled: true
      }
    },
    series: [{
      data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
    }],
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    markers: {
      size: 0
    },
    colors: ['#FF6C2F'],
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return '';
          }
        }
      },
      marker: {
        show: false
      }
    }
  };
  return <Card>
      <CardBody>
        <div className="d-flex align-items-center gap-2">
          <Image src={avatar2} alt="avatar-3" className="avatar rounded-circle" />
          <div className="d-block">
            <h4 className="text-dark fw-medium mb-1">Michael A. Miner</h4>
            <p className="mb-0 text-muted">Welcome Back</p>
          </div>
          <div className="ms-auto">
            <span className="text-muted">
              <Link href="" className="link-reset fs-3">
                <IconifyIcon icon="solar:settings-bold" />
              </Link>
            </span>
          </div>
        </div>
        <div className="mt-4">
          <div className="d-flex align-items-center">
            <h5 className="text-dark mb-0">
              All Account{' '}
              <span className="text-muted fw-normal ms-1">
                <IconifyIcon icon="bxs:circle" className="fs-10" />
              </span>
              <span className="text-muted fw-normal ms-1">Total Balance</span>
            </h5>
            <div className="ms-auto">
              <Link href="" className="link-reset fw-medium">
                UTS <IconifyIcon icon="bx:down-arrow-alt" className="text-danger" />
              </Link>
            </div>
          </div>
          <h3 className="fw-semibold mt-2 mb-0">
            {currency}4,700 <span className="fs-5 text-muted ms-1">+{currency}232</span>
          </h3>
          <ReactApexChart options={chartOptions} series={chartOptions.series} height={208} type="area" className="apex-charts mt-3" />
        </div>
      </CardBody>
      <CardFooter className="border-top gap-1 hstack">
        <Link href="" className="btn btn-primary w-100">
          Send
        </Link>
        <Link href="" className="btn btn-light w-100">
          Receive
        </Link>
        <Link href="" className="btn btn-soft-dark d-inline-flex align-items-center justify-content-center rounded avatar-sm">
          <span>
            {' '}
            <IconifyIcon width={18} height={18} icon="bx:plus" className="fs-18" />
          </span>
        </Link>
      </CardFooter>
    </Card>;
};
export default CustomerChart;