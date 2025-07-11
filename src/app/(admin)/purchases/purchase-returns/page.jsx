import PageTItle from '@/components/PageTItle';
import PurchaseListPage from '../purchase-list/page';
import ReturnDataCard from './Components/ReturnDataCard';
export const metadata = {
  title: 'Purchase Returns'
};
const PurchaseReturnsPage = () => {
  return <>
      <PageTItle title="PURCHASE ORDER" />
      <ReturnDataCard />
      <PurchaseListPage />
    </>;
};
export default PurchaseReturnsPage;