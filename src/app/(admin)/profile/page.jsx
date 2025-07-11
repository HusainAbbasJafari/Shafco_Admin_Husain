import React from 'react';
import ProfileMain from './components/ProfileMain';
import ProfileAbout from './components/ProfileAbout';
import PopularProfile from './components/PopularProfile';
import PageTItle from '@/components/PageTItle';
export const metadata = {
  title: 'Profile'
};
const ProfilePage = () => {
  return <>
      <PageTItle title="PROFILE" />
      <ProfileMain />
      {/* <ProfileAbout /> */}
      {/* <PopularProfile /> */}
    </>;
};
export default ProfilePage;