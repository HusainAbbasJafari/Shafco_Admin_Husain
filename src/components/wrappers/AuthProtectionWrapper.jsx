'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import FallbackLoading from '../FallbackLoading';
import { persistor } from '@/redux/store/store';
import { useSelector } from 'react-redux';
const AuthProtectionWrapper = ({
  children
}) => {

  // const { status } = useSession();
  // const { push } = useRouter();
  const router = useRouter()
  const pathname = usePathname();
  // const [isRehydrated, setIsRehydrated] = useState(false);

  // Get token from Redux store
  const token = useSelector((state) => state.auth?.token);



  useEffect(() => {
    if (!token) {
      router.push(`/auth/sign-in`);
    } 
  }, [token]);
 

  
  // if(!isRehydrated){
  //   return <FallbackLoading/>
  // }



  // if (!token && isRehydrated) {
  //   push(`/auth/sign-in?redirectTo=${pathname}`);
  //   // return <FallbackLoading />;
  // }

  return token && <Suspense>{children}</Suspense>;
};
export default AuthProtectionWrapper;