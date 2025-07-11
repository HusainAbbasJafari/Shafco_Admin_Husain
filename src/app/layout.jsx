import logoDark from '@/assets/images/shafco-logo-light.png';
import '@/assets/scss/app.scss';
import AppProvidersWrapper from '@/components/wrappers/AppProvidersWrapper';
import { DEFAULT_PAGE_TITLE } from '@/context/constants';
import { Play } from 'next/font/google';
import Image from 'next/image';
import "nprogress/nprogress.css";
import { ReduxProviders } from './providers';
const play = Play({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap'
});
export const metadata = {
  title: {
    template: '%s | Shafco',
    default: DEFAULT_PAGE_TITLE
  },
  description: ''
};
const splashScreenStyles = `
#splash-screen {
  position: fixed;
  top: 50%;
  left: 50%;
  background: white;
  display: flex;
  height: 100%;
  width: 100%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 1;
  transition: all 15s linear;
  overflow: hidden;
}

#splash-screen.remove {
  animation: fadeout 0.7s forwards;
  z-index: 0;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
`;
export default function RootLayout({
  children
}) {
  return <html lang="en">
    <head>
      <style suppressHydrationWarning>{splashScreenStyles}</style>
    </head>
    <body className={play.className}>
      <div id="splash-screen">
        <Image alt="Logo" height={150} src={logoDark} style={{
          width: 'auto'
        }} priority />
      </div>

      <div id="__next_splash">
        <AppProvidersWrapper>
          <ReduxProviders>
            {children}
          </ReduxProviders>
        </AppProvidersWrapper>
      </div>
    </body>
  </html>;
}