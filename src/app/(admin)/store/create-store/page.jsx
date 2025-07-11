import PageTItle from '@/components/PageTItle';
import CreateStoreForm from './component/create-store-form';
export const metadata = {
    title: 'Create Store'
};


const CreateStorePage = () => {
    return <>
        <PageTItle title="CREATE STORE" />
        <CreateStoreForm/>

    </>

}

export default CreateStorePage;