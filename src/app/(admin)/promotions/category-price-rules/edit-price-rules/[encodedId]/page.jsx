import PageTItle from '@/components/PageTItle';
import EditPriceRuleForm from '../components/edit-price-rules-form';

export const metadata = {
    title: 'Edit Category Price Rule'
};


const PriceRulePage = () => {
    return (
        <div>
            <PageTItle title="EDIT CATEGORY PRICE RULE" />
            <EditPriceRuleForm />
        </div>
    )
}

export default PriceRulePage