import PageTItle from '@/components/PageTItle';
import EditStoreForm from '../component/store-edit-form';
export const metadata = {
    title: 'Create Store'
};


const EditStorePage = () => {
    return <>
        <PageTItle title="EDIT STORE" />
        <EditStoreForm />
    </>

}

export default EditStorePage;