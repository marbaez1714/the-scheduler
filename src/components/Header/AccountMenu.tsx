import { AccountCircle, Logout } from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useFirebase } from 'src/hooks/useFirebase';

export const AccountMenu = () => {
  // Hooks
  const { signOut } = useFirebase();
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
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};
