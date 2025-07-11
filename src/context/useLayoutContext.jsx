'use client';

import { createContext, use, useCallback, useEffect, useMemo, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { toggleDocumentAttribute } from '@/utils/layout';
import useQueryParams from '@/hooks/useQueryParams';
const ThemeContext = createContext(undefined);
const useLayoutContext = () => {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error('useLayoutContext can only be used within LayoutProvider');
  }
  return context;
};

// const getPreferredTheme = (): ThemeType => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

const LayoutProvider = ({
  children
}) => {
  const queryParams = useQueryParams();
  const override = !!(queryParams.layout_theme || queryParams.topbar_theme || queryParams.menu_theme || queryParams.menu_size);
  const INIT_STATE = {
    theme: queryParams['layout_theme'] ? queryParams['layout_theme'] : 'light',
    topbarTheme: queryParams['topbar_theme'] ? queryParams['topbar_theme'] : 'light',
    menu: {
      theme: queryParams['menu_theme'] ? queryParams['menu_theme'] : 'light',
      size: queryParams['menu_size'] ? queryParams['menu_size'] : 'sm-hover-active'
    }
  };
  const [settings, setSettings] = useLocalStorage('__REBACK_NEXT_CONFIG__', INIT_STATE, override);
  const [offcanvasStates, setOffcanvasStates] = useState({
    showThemeCustomizer: false,
    showActivityStream: false,
    showBackdrop: false
  });
  const [isDarkMode, setIsDarkMode] = useState(false);



  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.getAttribute('data-bs-theme') === 'dark');
    });


    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);


  // update settings
  const updateSettings = _newSettings => setSettings({
    ...settings,
    ..._newSettings
  });

  // update theme mode
  const changeTheme = newTheme => {
    updateSettings({
      theme: newTheme
    });
  };



  // change topbar theme
  const changeTopbarTheme = newTheme => {
    updateSettings({
      topbarTheme: newTheme
    });
  };

  // change menu theme
  const changeMenuTheme = newTheme => {
    updateSettings({
      menu: {
        ...settings.menu,
        theme: newTheme
      }
    });
  };

  // change menu theme
  const changeMenuSize = newSize => {
    updateSettings({
      menu: {
        ...settings.menu,
        size: newSize
      }
    });
  };

  // toggle theme customizer offcanvas
  const toggleThemeCustomizer = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showThemeCustomizer: !offcanvasStates.showThemeCustomizer
    });
  };

  // toggle activity stream offcanvas
  const toggleActivityStream = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showActivityStream: !offcanvasStates.showActivityStream
    });
  };
  const themeCustomizer = {
    open: offcanvasStates.showThemeCustomizer,
    toggle: toggleThemeCustomizer
  };
  const activityStream = {
    open: offcanvasStates.showActivityStream,
    toggle: toggleActivityStream
  };

  // toggle backdrop
  const toggleBackdrop = useCallback(() => {
    const htmlTag = document.getElementsByTagName('html')[0];
    if (offcanvasStates.showBackdrop) htmlTag.classList.remove('sidebar-enable'); else htmlTag.classList.add('sidebar-enable');
    setOffcanvasStates({
      ...offcanvasStates,
      showBackdrop: !offcanvasStates.showBackdrop
    });
  }, [offcanvasStates.showBackdrop]);
  useEffect(() => {
    const {
      layout_theme,
      topbar_theme,
      menu_theme,
      menu_size
    } = queryParams;
    if (layout_theme) changeTheme(layout_theme === 'light' ? 'light' : 'dark');
    if (topbar_theme) changeTopbarTheme(topbar_theme === 'light' ? 'light' : 'dark');
    if (menu_theme) changeMenuTheme(menu_theme === 'light' ? 'light' : 'dark');
    if (menu_size) {
      switch (menu_size) {
        case 'default':
        case 'condensed':
        case 'hidden':
        case 'sm-hover':
          changeMenuSize(menu_size);
          break;
        default:
          changeMenuSize('sm-hover-active');
          break;
      }
    }
  }, [queryParams]);
  useEffect(() => {
    toggleDocumentAttribute('data-bs-theme', settings.theme);
    toggleDocumentAttribute('data-topbar-color', settings.topbarTheme);
    toggleDocumentAttribute('data-menu-color', settings.menu.theme);
    toggleDocumentAttribute('data-menu-size', settings.menu.size);
    return () => {
      toggleDocumentAttribute('data-bs-theme', settings.theme, true);
      toggleDocumentAttribute('data-topbar-color', settings.topbarTheme, true);
      toggleDocumentAttribute('data-menu-color', settings.menu.theme, true);
      toggleDocumentAttribute('data-menu-size', settings.menu.size, true);
    };
  }, [settings]);
  const resetSettings = () => updateSettings(INIT_STATE);
  return <ThemeContext.Provider value={useMemo(() => ({
    ...settings,
    themeMode: settings.theme,
    changeTheme,
    changeTopbarTheme,
    changeMenu: {
      theme: changeMenuTheme,
      size: changeMenuSize
    },
    themeCustomizer,
    activityStream,
    toggleBackdrop,
    resetSettings,
    isDarkMode
  }), [settings, offcanvasStates])}>
    {children}
    {offcanvasStates.showBackdrop && <div className="offcanvas-backdrop fade show" onClick={toggleBackdrop} />}
  </ThemeContext.Provider>;
};
export { LayoutProvider, useLayoutContext };