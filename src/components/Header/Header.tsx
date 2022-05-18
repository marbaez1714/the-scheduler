import { useAuth0 } from '@auth0/auth0-react';
import { HeaderProps } from './types';
import { AccountMenu } from './AccountMenu';
import { NavMenu } from './NavMenu';
import {
  Archive,
  AssignmentInd,
  Business,
  Engineering,
  Home,
  House,
  PersonAdd,
  Schedule,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';

const Header = ({ title }: HeaderProps) => {
  // Hooks
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  // Menu Items
  const addMenuItems = [
    {
      title: 'Company',
      icon: <Business />,
      onClick: () => navigate('/add-company'),
    },
    { title: 'Community', icon: <House /> },
    { title: 'Builder', icon: <Engineering /> },
    { title: 'Reporter', icon: <AssignmentInd /> },
    { title: 'Installer', icon: <PersonAdd /> },
  ];

  const editMenuItems = [
    {
      title: 'Company',
      icon: <Business />,
      onClick: () => navigate('/edit-company'),
    },
    { title: 'Community', icon: <House /> },
    { title: 'Builder', icon: <Engineering /> },
    { title: 'Reporter', icon: <AssignmentInd /> },
    { title: 'Installer', icon: <PersonAdd /> },
  ];

  const dashboardMenuItems = [
    {
      title: 'Scheduling',
      icon: <Schedule />,
      onClick: () => navigate('/scheduling'),
    },
    { title: 'Archive', icon: <Archive /> },
  ];

  return (
    <header className="py-3 px-6 shadow-md h-16 flex">
      {title && <h1>{title}</h1>}

      {/* Home Button */}
      <IconButton onClick={() => navigate('/landing')}>
        <Home />
      </IconButton>
      {/* Menus */}
      {isAuthenticated && <NavMenu title="Add" menuItems={addMenuItems} />}
      {isAuthenticated && <NavMenu title="Edit" menuItems={editMenuItems} />}
      {isAuthenticated && (
        <NavMenu title="Dashboards" menuItems={dashboardMenuItems} />
      )}

      {/* Right Actions */}
      {isAuthenticated && <AccountMenu />}
    </header>
  );
};

export default Header;
