
import React from 'react';
import PageTItle from '@/components/PageTItle';
import UserAddForm from './component/user-add-form';
export const metadata = {
    title: 'Create User'
};
const SettingsPage = () => {
    return <>
        <PageTItle title="CREATE USER" />
        <UserAddForm />

    </>;
};
export default SettingsPage;