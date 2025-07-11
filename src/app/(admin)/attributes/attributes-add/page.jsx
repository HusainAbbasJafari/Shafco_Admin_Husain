import PageTItle from '@/components/PageTItle';
import EditForm from './components/EditForm';
export const metadata = {
  title: 'Attributes Add'
};
const AttributesAddPage = () => {
  return <div>
      <PageTItle title="ATTRIBUTE ADD" />
      <EditForm />
    </div>;
};
export default AttributesAddPage;