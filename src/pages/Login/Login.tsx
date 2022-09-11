import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Hooks
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated && navigate('/dashboard');
  }, [isAuthenticated]);

  // Actions
  const handleLoginClick = () => {
    loginWithRedirect();
  };

  // JSX
  return (
    <div className="flex items-center justify-center flex-grow w-screen h-screen">
      <Button onClick={handleLoginClick} variant="contained" size="large">
        Auth0 Login
      </Button>
    </div>
  );
};

export default Login;
