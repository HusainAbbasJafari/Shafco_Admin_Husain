import PageTItle from '@/components/PageTItle';
import EditForm from "../component/edit-form"
export const metadata = {
  title: 'Edit Role'
};
const RoleEditPage = () => {
  return <>
    <PageTItle title="EDIT ROLE" />
    <EditForm />
  </>;
};
export default RoleEditPage;