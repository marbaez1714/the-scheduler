import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/components/Button';

const Login = () => {
  // Hooks
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated && navigate('/dashboard');
  }, [isAuthenticated]);

  // Actions
  const handleLoginClick = () => {
    loginWithRedirect();
  };

  const handleLogoutClick = () => {
    logout();
  };

  // JSX
  return (
    <div className="flex items-center justify-center flex-grow w-screen h-screen">
      <Button title="Auth0 Login" onClick={handleLoginClick} />
      <Button title="Logout" onClick={handleLogoutClick} variant="text" />
    </div>
  );
};

export default Login;
