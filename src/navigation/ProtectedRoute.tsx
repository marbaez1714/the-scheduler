import { withAuthenticationRequired } from '@auth0/auth0-react';

import { ProtectedRouteProps } from './types';

export const ProtectedRoute = ({ component, ...args }: ProtectedRouteProps) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};
