import { Row } from 'react-bootstrap';
// import Conversions from './components/Conversions';
// import Orders from './components/Orders';
import Stats from './components/Stats';
import PageTItle from '@/components/PageTItle';
// import { useSelector } from 'react-redux';
export const metadata = {
  title: 'Dashboard'
};
const DashboardPage = () => {

  // const user = useSelector((state) => state.auth.user);

  return <>
    <PageTItle title={null} />
    <Row>
      <Stats />
      {/* <Conversions /> */}
      {/* <Orders /> */}
    </Row>
  </>;
};
export default DashboardPage;