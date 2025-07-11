
import PageTItle from '@/components/PageTItle';
import BannerList from './Components/banner-list';
export const metadata = {
    title: 'Manage Banner'
};
const BannerManagementPage = () => {
    return <>
        <PageTItle title="Manage Banner" />
        <BannerList />
    </>;
};
export default BannerManagementPage;