import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from 'src/components/Screen';
import { useFirebase } from 'src/hooks/useFirebase';

const Login = () => {
  // Hooks
  const { isAuthenticated } = useAuth0();
  const { signIn } = useFirebase();
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    isAuthenticated && navigate('/landing');
  }, [isAuthenticated]);

  // Actions
  const handleLoginClick = () => {
    signIn()
      .then(() => {
        navigate('/landing');
      })
      .catch((e) => {
        console.log(e);
        alert('Unauthorized');
      });
  };

  return (
    <Screen
      title="Welcome"
      subtitle="To get started, press the login button below"
    >
      <div className="flex justify-center">
        <Button onClick={handleLoginClick} variant="contained" size="large">
          Auth0 Login
        </Button>
      </div>
    </Screen>
  );
};

export default Login;
