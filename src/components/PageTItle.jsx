'use client';

import { useTitle } from '@/context/useTitleContext';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const PageTItle = ({
  title
}) => {
  const { setTitle } = useTitle();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if(title){
      setTitle(title);
    }else{
      setTitle(`Welcome ${user?.fullName} !`);
    }
  }, [setTitle]);
  return <></>;
};
export default PageTItle;