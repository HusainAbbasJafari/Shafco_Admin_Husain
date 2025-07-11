import PageTItle from '@/components/PageTItle';
import TagManagement from './Components/tag-management';
export const metadata = {
    title: 'Manage Tags'
};

const Page = () => {
    return (<>
        <PageTItle title="MANAGE TAGS" />
        <TagManagement />
    </>
    )
}

export default Page
