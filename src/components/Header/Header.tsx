import { useRef, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AccountCircle, Logout } from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { HeaderProps } from './types';

const Header = ({ title }: HeaderProps) => {
  // Refs
  const menuButtonRef = useRef(null);
  // Hooks
  const { isAuthenticated, logout } = useAuth0();
  // State
  const [menuOpen, setMenuOpen] = useState(false);
  // Functions
  const handleMenuOpen = () => {
    setMenuOpen(true);
  };
  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <header className="py-3 px-6 shadow-md h-16 flex">
      {title && <h1>{title}</h1>}
      {/* Right Actions */}
      {isAuthenticated && (
        <div className="ml-auto">
          <IconButton onClick={handleMenuOpen} ref={menuButtonRef}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={menuButtonRef.current}
            open={menuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => logout()}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </div>
      )}
    </header>
  );
};

export default Header;
