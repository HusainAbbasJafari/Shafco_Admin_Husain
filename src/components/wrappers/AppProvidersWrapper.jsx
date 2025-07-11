'use client';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { DEFAULT_PAGE_TITLE } from '@/context/constants';
import dynamic from 'next/dynamic';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const LayoutProvider = dynamic(() => import('@/context/useLayoutContext').then(mod => mod.LayoutProvider), {
  ssr: false
});
import { NotificationProvider } from '@/context/useNotificationContext';
import { TitleProvider } from '@/context/useTitleContext';
import { LoaderProvider } from '@/context/useLoaderContext';

const queryClient = new QueryClient();


const AppProvidersWrapper = ({
  children
}) => {
  const handleChangeTitle = () => {
    if (document.visibilityState == 'hidden') document.title = 'Please come back 🥺'; else document.title = DEFAULT_PAGE_TITLE;
  };



  // useEffect(() => {
  //   setupInterceptors(setLoading);
  // }, []);



  useEffect(() => {
    if (document) {
      const e = document.querySelector('#__next_splash');
      if (e?.hasChildNodes()) {
        document.querySelector('#splash-screen')?.classList.add('remove');
      }
      e?.addEventListener('DOMNodeInserted', () => {
        document.querySelector('#splash-screen')?.classList.add('remove');
      });
    }
    // document.addEventListener('visibilitychange', handleChangeTitle);
    return () => {
      // document.removeEventListener('visibilitychange', handleChangeTitle);
    };
  }, []);
  return <SessionProvider>
    <LoaderProvider>
      <LayoutProvider>
        <TitleProvider>
          <NotificationProvider>
            <QueryClientProvider client={queryClient}>
              {children}
              <ToastContainer theme="colored" />
            </QueryClientProvider>
          </NotificationProvider>
        </TitleProvider>
      </LayoutProvider>
    </LoaderProvider>
  </SessionProvider>;
};
export default AppProvidersWrapper;