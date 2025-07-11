import PageTItle from '@/components/PageTItle';import PriorityManagement from './Components/priority-management';
 ``

export const metadata = {
    title: 'Priority Management',
};


const Page = () => {
    return (
        <div>
            <PageTItle title="PRIORITY MANAGEMENT" />
            <PriorityManagement/>
        </div>
    )
}

export default Page
