import React from 'react';
import RoleListTable from './component/role-list-table';
import PageTItle from '@/components/PageTItle';
// import Breadcrumb from '@/components/Breadcrumb';
export const metadata = {
  title: 'Role List'
};
const RoleListPage = async () => {


  return <>
    <PageTItle title="ROLES" />
    <RoleListTable />
  </>;
};
export default RoleListPage;