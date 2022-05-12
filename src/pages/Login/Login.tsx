import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@mui/material";

const Login = () => {
  const {loginWithRedirect} = useAuth0();
  return (
    <div className="container mx-auto flex align-middle">
      <h1>Login</h1>
      <Button onClick={loginWithRedirect} variant="contained">
        Login With Auth0
      </Button>
    </div>
  );
};

export default Login;
