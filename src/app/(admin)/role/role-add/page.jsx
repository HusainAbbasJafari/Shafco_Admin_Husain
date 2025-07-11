
import PageTItle from '@/components/PageTItle';
import RoleAddForm from './component/role-add-form';
export const metadata = {
  title: 'Create Role'
};
const RoleAddPage = () => {

  return <>
    <PageTItle title="CREATE ROLE" />
    <RoleAddForm />
  </>;
};
export default RoleAddPage;