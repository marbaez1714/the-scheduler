import { useAuth0 } from '@auth0/auth0-react';
import { Logout } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { HeaderProps } from './types';

const Header = ({ title }: HeaderProps) => {
  const { logout } = useAuth0();

  return (
    <div className="py-3 px-6 shadow-md h-16 flex">
      {title && <h1>{title}</h1>}
      {/* Right Actions */}
      <div className="ml-auto">
        <IconButton onClick={() => logout()}>
          <Logout />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
