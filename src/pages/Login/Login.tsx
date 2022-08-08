import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from 'src/hooks/useFirebase';

const Login = () => {
  // Hooks
  const {
    authState: { authorized },
  } = useFirebase();

  const { loginWithRedirect, getAccessTokenSilently } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    authorized && navigate('/dashboard');
  }, [authorized]);

  // Actions
  const handleLoginClick = () => {
    loginWithRedirect();
  };

  const logToken = async () => {
    console.log(await getAccessTokenSilently());
  };

  // JSX
  return (
    <div className="flex flex-grow h-screen w-screen items-center justify-center">
      <Button onClick={handleLoginClick} variant="contained" size="large">
        Auth0 Login
      </Button>
      <Button onClick={logToken}>Test</Button>
    </div>
  );
};

export default Login;
