import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Screen } from 'src/components/Screen';

const Login = () => {
  // Hooks
  const navigate = useNavigate();

  // Effects

  // Actions
  const handleLoginClick = () => {};

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
