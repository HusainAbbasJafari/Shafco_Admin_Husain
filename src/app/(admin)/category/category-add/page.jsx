import FileUpload from '@/components/FileUpload';
import PageTItle from '@/components/PageTItle';
import { Col, Row } from 'react-bootstrap';
import AddCategory from './components/AddCategory';
export const metadata = {
  title: 'Category Add'
};
const CategoryAddPage = () => {
  return <>
    <PageTItle title="CREATE CATEGORY" />
    <Row>
      {/* <CategoryEditCard /> */}
      <Col xl={12} lg={12}>
        <FileUpload title="Add Thumbnail Photo" maxFiles={1} />
        <AddCategory />
      </Col>
    </Row>
  </>;
};
export default CategoryAddPage;