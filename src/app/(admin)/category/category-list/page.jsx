import PageTItle from '@/components/PageTItle';
import CategoryList from './components/CategoryList';
export const metadata = {
  title: 'Category List'
};
const CategoryListPage = () => {
  return <>
      <PageTItle title="CATEGORIES LIST" />
      <CategoryList />
    </>;
};
export default CategoryListPage;