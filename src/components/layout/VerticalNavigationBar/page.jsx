import FallbackLoading from '@/components/FallbackLoading';
import LogoBox from '@/components/LogoBox';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import { getMenuItems } from '@/helpers/Manu';
import { Suspense } from 'react';
import AppMenu from './components/AppMenu';
import HoverMenuToggle from './components/HoverMenuToggle';
const VerticalNavigationBarPage = () => {
  const menuItems = getMenuItems();
  return <div className="main-nav">
      <LogoBox />
      <HoverMenuToggle />
      <SimplebarReactClient className="scrollbar" data-simplebar>
        <Suspense fallback={<FallbackLoading />}>
          <AppMenu menuItems={menuItems} />
        </Suspense>
      </SimplebarReactClient>
    </div>;
};
export default VerticalNavigationBarPage;