import PageTItle from '@/components/PageTItle';
import UserEditForm from "../component/user-edit-form"
export const metadata = {
  title: 'User Edit'
};
const UserEditPage = () => {
  return <>
    <PageTItle title="EDIT USER" />
    <UserEditForm/>
  </>;
};
export default UserEditPage;