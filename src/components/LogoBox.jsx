import logoDark from '@/assets/images/shafco-logo-light.png';
import logoLight from '@/assets/images/shafco-logo-dark.png';
import logoSm from '@/assets/images/shafco-logo-light.png';
import shafcoSmall from '@/assets/images/shafco-logo-small.png';
import Image from 'next/image';
import Link from 'next/link';
const LogoBox = () => {
  return <div className="logo-box">
      <Link href="/" className="logo-dark">
        <Image src={shafcoSmall} width={28}  height={28} className="logo-sm" alt="logo sm" />
        <Image src={logoDark}  height={150}  className="logo-lg" alt="logo dark" />
      </Link>
      <Link href="/" className="logo-light">
        <Image src={logoSm} width={28} height={24} className="logo-sm" alt="logo sm" />
        <Image src={logoLight} height={150} className="logo-lg" alt="logo light" />
      </Link>
    </div>;
};
export default LogoBox;