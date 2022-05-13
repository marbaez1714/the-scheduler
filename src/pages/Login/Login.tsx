import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Screen } from 'src/components/Screen';

const Login = () => {
  const { loginWithPopup } = useAuth0();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    loginWithPopup().then(() => {
      navigate('/test1');
    });
  };

  return (
    <Screen
      title="Welcome"
      subtitle="To get started, press the login button below"
      className="justify-center"
    >
      <Button onClick={handleLoginClick} variant="contained" size="large">
        Auth0 Login
      </Button>
    </Screen>
  );
};

export default Login;
