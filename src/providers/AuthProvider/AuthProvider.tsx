import {
  AppState,
  Auth0Provider,
  Auth0ProviderOptions,
} from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const AuthProvider = ({ children, ...rest }: Auth0ProviderOptions) => {
  const navigate = useNavigate();

  const handleRedirectCallback = (appState: AppState | undefined) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider onRedirectCallback={handleRedirectCallback} {...rest}>
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;

