
import React from 'react';
import PageTItle from '@/components/PageTItle';
import UserListTable from './component/user-list-table';

export const metadata = {
    title: 'Users'
};

const SettingsPage = () => {
    return <>
        <PageTItle title="Users" />
        <UserListTable />

    </>;
};
export default SettingsPage;