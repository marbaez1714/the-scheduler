import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

import { Icon } from '../Icon';
import { NavBarMenu } from './NavBarMenu';
import { jobsLegacyItems, manageDataItems } from './utils';

export const NavBar = () => {
  /******************************/
  /* Custom Hooks               */
  /******************************/
  const { logout } = useAuth0();

  /******************************/
  /* Callbacks                  */
  /******************************/
  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <header className="fixed top-0 z-50 flex w-full items-center bg-app-darkest px-6 text-app-altText">
      <Link to="/dashboard" className="mr-6 text-3xl font-bold">
        the_scheduler
      </Link>

      {/* Dashboard */}
      <NavBarMenu
        title={'Dashboard'}
        to="/dashboard"
        icon={<Icon icon="dashboard" />}
      />

      {/* Jobs (Legacy) */}
      <NavBarMenu
        title={'Jobs (Legacy)'}
        to="/jobs_legacy"
        icon={<Icon icon="job" />}
        links={jobsLegacyItems}
      />

      {/* Manage Data */}
      <NavBarMenu
        title={'Manage Data'}
        to="/manage"
        icon={<Icon icon="data" />}
        links={manageDataItems}
      />

      {/* Logout Button */}
      <button
        className="ml-auto h-12 w-12 p-3 text-app-light transition-colors"
        onClick={handleLogout}
        title="Logout"
      >
        <Icon icon="logout" />
      </button>
    </header>
  );
};
