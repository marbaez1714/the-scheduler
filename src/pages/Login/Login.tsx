import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Screen } from 'src/components/Screen';
import { useFirebase } from 'src/hooks/useFirebase';

const Login = () => {
  // Hooks
  const { signIn } = useFirebase();
  const navigate = useNavigate();

  // Effects

  // Actions
  const handleLoginClick = () => {
    signIn.google();
  };

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
