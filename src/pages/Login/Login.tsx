import { Button } from '@mui/material';
import { useFirebase } from 'src/hooks/useFirebase';

const Login = () => {
  // Hooks
  const { signIn, signOut } = useFirebase();

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
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default Login;
