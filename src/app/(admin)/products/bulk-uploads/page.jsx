import PageTItle from '@/components/PageTItle';
import BulkUpload from './component/bulk-upload';
export const metadata = {
    title: 'Bulk Upload'
};

const BulkUploadPage = () => {
    return (
        <>
            <PageTItle title="BULK UPLOAD" />
            <BulkUpload />
        </>
    )
}

export default BulkUploadPage