import PageTItle from '@/components/PageTItle';
import React from 'react';
import AddBrandForm from './components/add-brand-form';
import FileUpload from '@/components/FileUpload';
export const metadata = {
    title: 'Create Brand'
};

const BrandPage = () => {
    return (
        <div>
            <PageTItle title="CREATE BRAND" />
            <FileUpload title="Add Thumbnail Photo" maxFiles={1} />
            <AddBrandForm />
        </div>
    )
}

export default BrandPage
