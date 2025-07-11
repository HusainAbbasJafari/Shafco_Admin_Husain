import PageTItle from '@/components/PageTItle';
import StockData from './components/StockData';
import WarehouseList from './components/WarehouseList';
export const metadata = {
  title: 'Warehouse'
};
const WarehousePage = () => {
  return <>
      <PageTItle title="WAREHOUSE LIST" />
      <StockData />
      <WarehouseList />
    </>;
};
export default WarehousePage;