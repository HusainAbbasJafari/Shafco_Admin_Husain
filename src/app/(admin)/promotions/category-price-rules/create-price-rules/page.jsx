import PageTItle from '@/components/PageTItle';
import CreatePriceRuleForm from './Components/create-price-rule-form';

export const metadata = {
    title: 'Create Category Price Rule'
};


const CreatePriceRulePage = () => {
    return <>
        <PageTItle title="CREATE CATEGORY PRICE RULE" />
        <CreatePriceRuleForm />

    </>

}

export default CreatePriceRulePage;