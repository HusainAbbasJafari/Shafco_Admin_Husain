import PageTItle from '@/components/PageTItle';
import PriceRuleList from './Components/price-rule-list';
export const metadata = {
    title: 'Category Price Rule'
};
const PriceRulePage = () => {
    return <>
        <PageTItle title="CATEGORY PRICE RULE" />
        <PriceRuleList />

    </>;
};
export default PriceRulePage;