import PageTItle from '@/components/PageTItle';
import BrandListTable from './component/brand-list-table';
export const metadata = {
    title: 'Brand List'
};
const BrandListPage = () => {
    return <>
        <PageTItle title="Brand List" />
        <BrandListTable />
    </>;
};
export default BrandListPage;