'use client';

import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useLayoutContext } from '@/context/useLayoutContext';
import useViewPort from '@/hooks/useViewPort';
import { useEffect, useRef } from 'react';
const HoverMenuToggle = () => {
  const {
    menu: {
      size
    },
    changeMenu: {
      size: changeMenuSize
    }
  } = useLayoutContext();
  const {
    width
  } = useViewPort();

  const prevWidth = useRef(width);

  useEffect(() => {
    if (width <= 1140) {
      if (size !== 'hidden') changeMenuSize('hidden');
    }
    // else{
    //    changeMenuSize('hidden')
    // }
  }, [width]);


  const handleHoverMenu = () => {
    if (size === 'sm-hover-active') changeMenuSize('sm-hover'); else changeMenuSize('sm-hover-active');
  };
  return <button type="button" onClick={handleHoverMenu} className="button-sm-hover" aria-label="Show Full Sidebar">
    <IconifyIcon height={22} width={22} icon="solar:double-alt-arrow-right-bold-duotone" className="button-sm-hover-icon" />
  </button>;
};
export default HoverMenuToggle;