import PageTItle from '@/components/PageTItle';
import OrdersDataCardPage from './components/OrdersDataCard';
import OrdersList from './components/OrdersList';
export const metadata = {
  title: 'Orders List'
};
const page = () => {
  return <>
      <PageTItle title="ORDERS LIST" />
      <OrdersDataCardPage />
      <OrdersList />
    </>;
};
export default page;