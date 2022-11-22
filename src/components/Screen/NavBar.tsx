import { useAuth0 } from '@auth0/auth0-react';
import {
  ArchiveBoxIcon,
  ArrowRightOnRectangleIcon,
  BriefcaseIcon,
  CircleStackIcon,
  DocumentCheckIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
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
    logout();
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <header className="fixed top-0 z-50 flex items-center w-full px-6 bg-app-darkest text-app-altText">
      <Link to="/dashboard" className="mr-6 text-3xl font-bold">
        the_scheduler
      </Link>

      {/* Dashboard */}
      <NavBarMenu
        title={'Dashboard'}
        to="/dashboard"
        icon={<BriefcaseIcon />}
      />

      {/* Jobs (Legacy) */}
      <NavBarMenu
        title={'Jobs (Legacy)'}
        to="/jobs_legacy"
        icon={<DocumentCheckIcon />}
        links={jobsLegacyItems}
      />

      <NavBarMenu title={'Archive'} to="/archive" icon={<ArchiveBoxIcon />} />

      {/* Manage Data */}
      <NavBarMenu
        title={'Manage Data'}
        to="/manage"
        icon={<CircleStackIcon />}
        links={manageDataItems}
      />

      {/* Logout Button */}
      <button
        className="w-12 h-12 p-3 ml-auto transition-colors text-app-light"
        onClick={handleLogout}
        title="Logout"
      >
        <ArrowRightOnRectangleIcon />
      </button>
    </header>
  );
};
