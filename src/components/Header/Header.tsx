import { useAuth0 } from '@auth0/auth0-react';
import { HeaderProps } from './types';
import { AccountMenu } from './AccountMenu';

const Header = ({ title }: HeaderProps) => {
  // Hooks
  const { isAuthenticated } = useAuth0();

  return (
    <header className="py-3 px-6 shadow-md h-16 flex">
      {title && <h1>{title}</h1>}
      {/* Right Actions */}
      {isAuthenticated && <AccountMenu />}
    </header>
  );
};

export default Header;
