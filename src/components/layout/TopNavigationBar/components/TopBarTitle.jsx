'use client';

import { useTitle } from '@/context/useTitleContext';
const TopBarTitle = () => {
  const {
    title
  } = useTitle();

  return <div className="topbar-item">
      <h4 className={`fw-bold topbar-button pe-none text-uppercase mb-0`}>{title}</h4>
    </div>;
};
export default TopBarTitle;