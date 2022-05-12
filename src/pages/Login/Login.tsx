import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@mui/material";
import {Screen} from "src/components/Screen";
import {Text} from "src/components/Text";

const Login = () => {
  const {loginWithRedirect} = useAuth0();
  return (
    <Screen>
      <Text type="title" className="text-center">
        Login
      </Text>
      <Button onClick={loginWithRedirect} variant="contained">
        Login With Auth0
      </Button>
    </Screen>
  );
};

export default Login;
