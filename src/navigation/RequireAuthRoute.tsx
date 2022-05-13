import { withAuthenticationRequired } from '@auth0/auth0-react';
import { RequireAuthRouteProps } from './types';

export const RequireAuthRoute = ({
  element,
  options,
}: RequireAuthRouteProps) => {
  const AuthRequired = withAuthenticationRequired(() => <>{element}</>, {
    returnTo: '/',
    ...options,
  });

  return <AuthRequired />;
};
