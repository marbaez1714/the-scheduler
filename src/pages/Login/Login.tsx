import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from 'src/hooks/useFirebase';
import { AppRoutes } from 'src/utils/constants/routes';

const Login = () => {
  // Hooks
  const { signIn, authState } = useFirebase();
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    authState.authorized && navigate(AppRoutes.Landing);
  }, [authState.authorized]);

  // Actions
  const handleLoginClick = () => {
    signIn.google();
  };

  // JSX
  return (
    <div className="flex flex-grow h-screen w-screen items-center justify-center">
      <Button onClick={handleLoginClick} variant="contained" size="large">
        Google Login
      </Button>
    </div>
  );
};

export default Login;
