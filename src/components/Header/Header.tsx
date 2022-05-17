import { useAuth0 } from '@auth0/auth0-react';
import { HeaderProps } from './types';
import { AccountMenu } from './AccountMenu';
import { NavMenu } from './NavMenu';
import {
  AssignmentInd,
  Business,
  Engineering,
  House,
  PersonAdd,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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
    { title: 'Company', icon: <Business /> },
    { title: 'Community', icon: <House /> },
    { title: 'Builder', icon: <Engineering /> },
    { title: 'Reporter', icon: <AssignmentInd /> },
    { title: 'Installer', icon: <PersonAdd /> },
  ];

  return (
    <header className="py-3 px-6 shadow-md h-16 flex">
      {title && <h1>{title}</h1>}

      {/* Menus */}
      {isAuthenticated && <NavMenu title="Add" menuItems={addMenuItems} />}
      {isAuthenticated && <NavMenu title="Edit" menuItems={editMenuItems} />}

      {/* Right Actions */}
      {isAuthenticated && <AccountMenu />}
    </header>
  );
};

export default Header;
