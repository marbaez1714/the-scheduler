import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from 'src/components/Screen';
import { useFirebase } from 'src/hooks/useFirebase';
import { AppRoutes } from 'src/utils/constants/routes';

const Login = () => {
  // Hooks
  const { signIn, authUser } = useFirebase();
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    authUser && navigate(AppRoutes.Landing);
  }, [authUser]);

  // Actions
  const handleLoginClick = () => {
    signIn.google().then(() => navigate(AppRoutes.Landing));
  };

  // JSX
  return (
    <Screen
      title="Welcome"
      subtitle="To get started, press the login button below"
    >
      <div className="flex justify-center">
        <Button onClick={handleLoginClick} variant="contained" size="large">
          Google Login
        </Button>
      </div>
    </Screen>
  );
};

export default Login;
