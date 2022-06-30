import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from 'src/hooks/useFirebase';

const Login = () => {
  // Hooks
  const {
    signIn,
    authState: { authorized },
  } = useFirebase();

  const navigate = useNavigate();

  useEffect(() => {
    authorized && navigate('/dashboard');
  }, [authorized]);

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
