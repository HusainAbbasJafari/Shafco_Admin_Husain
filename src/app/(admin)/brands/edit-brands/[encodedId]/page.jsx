import FileUpload from '@/components/FileUpload';
import PageTItle from '@/components/PageTItle';
import EditBrandForm from '../component/edit-brands-form';
export const metadata = {
    title: 'Edit Brand'
};

const EditBrandPage = () => {
    return (
        <div>
            <PageTItle title="Edit Brand" />
            <FileUpload title="Add Thumbnail Photo" maxFiles={1} />
            <EditBrandForm />
        </div>
    )
}

export default EditBrandPage
