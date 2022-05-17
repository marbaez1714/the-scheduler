import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { useRef, useState } from 'react';
import { NavMenuProps } from './types';

export const NavMenu = ({ title, menuItems }: NavMenuProps) => {
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
    <>
      {/* Button */}
      <Button onClick={handleMenuOpen} ref={menuButtonRef}>
        {title}
      </Button>
      {/* Menu */}
      <Menu
        anchorEl={menuButtonRef.current}
        open={menuOpen}
        onClose={handleMenuClose}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
