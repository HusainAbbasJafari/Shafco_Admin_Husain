// import IconifyIcon from '@/components/wrappers/IconifyIcon';
// import { Suspense } from 'react';
// import ActivityStreamToggle from './components/ActivityStreamToggle';
import LeftSideBarToggle from './components/LeftSideBarToggle';
// import Notifications from './components/Notifications';
import ProfileDropdown from './components/ProfileDropdown';
// import ThemeCustomizerToggle from './components/ThemeCustomizerToggle';
import ThemeModeToggle from './components/ThemeModeToggle';
import TopBarTitle from './components/TopBarTitle';
const page = () => {
  return <header className="topbar">
      <div className="container-fluid">
        <div className="navbar-header">
          <div className="d-flex align-items-center">
            <LeftSideBarToggle />
            <TopBarTitle />
          </div>
          <div className="d-flex align-items-center gap-1">
            <ThemeModeToggle />

            {/* <Suspense>
              <Notifications />
            </Suspense> */}

            {/* <ThemeCustomizerToggle /> */}

            {/* <ActivityStreamToggle /> */}

            <ProfileDropdown />
            {/* <form className="app-search d-none d-md-block ms-2">
              <div className="position-relative">
                <input type="search" className="form-control" placeholder="Search..." autoComplete="off" />
                <IconifyIcon icon="solar:magnifer-linear" className="search-widget-icon" />
              </div>
            </form> */}
          </div>
        </div>
      </div>
    </header>;
};
export default page;