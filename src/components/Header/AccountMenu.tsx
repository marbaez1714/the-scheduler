import { AccountCircle, Logout } from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { useRef, useState } from 'react';

export const AccountMenu = () => {
  // Hooks

  // Refs
  const menuButtonRef = useRef(null);
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
    <div className="ml-auto">
      {/* Button */}
      <IconButton onClick={handleMenuOpen} ref={menuButtonRef}>
        <AccountCircle />
      </IconButton>
      {/* Menu */}
      <Menu
        anchorEl={menuButtonRef.current}
        open={menuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {}}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};
