import FallbackLoading from '@/components/FallbackLoading';
import AuthProtectionWrapper from '@/components/wrappers/AuthProtectionWrapper';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import 'antd/dist/reset.css'; // Ant Design v5+

// import BreadCrumb from '@/components/BreadCrumb';



const VerticalNavigationBar = dynamic(() => import('@/components/layout/VerticalNavigationBar/page'));
const TopNavigationBar = dynamic(() => import('@/components/layout/TopNavigationBar/page'));
const AdminLayout = ({
  children
}) => {
  return <AuthProtectionWrapper>
      <div className="wrapper">
        <Suspense>
          <TopNavigationBar />
        </Suspense>

        <Suspense fallback={<FallbackLoading />}>
          <VerticalNavigationBar />
        </Suspense>

        <div className="page-content">
      
          <div className="container-fluid">
          {/* <BreadCrumb/> */}
            {children}
            </div>
          {/* <Footer /> */}
        </div>
      </div>
    </AuthProtectionWrapper>;
};
export default AdminLayout;