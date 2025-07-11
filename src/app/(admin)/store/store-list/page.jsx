import PageTItle from '@/components/PageTItle';
import StoreListTable from './component/store-list-table';
export const metadata = {
    title: 'Stores'
};


const CreateStorePage = () => {
    return <>
        <PageTItle title="Stores" />
        <StoreListTable/>
    </>

}

export default CreateStorePage;