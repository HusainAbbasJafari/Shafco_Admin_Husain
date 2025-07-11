'use client';
import React, { useRef } from 'react';
import GeneralSettings from './components/GeneralSettings';
// import StoreSettings from './components/StoreSettings';
// import LocalizationSettings from './components/LocalizationSettings';
// import SettingsBoxs from './components/SettingsBoxs';
// import CustomersSettings from './components/CustomersSettings';
import PageTItle from '@/components/PageTItle';
import Link from 'next/link';
const SettingsPage = () => {

  const formRef = useRef();

  return <>
    <PageTItle title="SETTINGS" />
    <GeneralSettings ref={formRef} />
    {/* <StoreSettings />
      <LocalizationSettings />
      <SettingsBoxs />
      <CustomersSettings /> */}
    <div className="text-end">
      {/* <Link href="" className="btn btn-danger">
        Cancel
      </Link> */}
      &nbsp;
      <Link href="" className="btn btn-primary" onClick={() => formRef.current?.submitForm()}>
        Save Change
      </Link>
    </div>
  </>;
};
export default SettingsPage;