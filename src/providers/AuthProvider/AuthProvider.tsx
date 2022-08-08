import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

import { AuthProviderProps } from './types';

const auth0Props = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN ?? '',
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID ?? '',
  redirectUri: window.location.origin,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE ?? '',
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...auth0Props}>
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
