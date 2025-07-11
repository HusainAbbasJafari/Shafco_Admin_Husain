

import PageTItle from '@/components/PageTItle';
import ManageAttribute from './component/ManageAttribute';
export const metadata = {
  title: 'Attributes'
};

const AttributePage = () => {
  return (
    <>
      <PageTItle title="Attribtues" />
      <ManageAttribute />
    </>
  )
}

export default AttributePage
