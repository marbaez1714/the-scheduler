import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Loading } from 'src/pages/Loading';

import { ProtectedRouteProps } from './types';

export const ProtectedRoute = ({ component, ...args }: ProtectedRouteProps) => {
  const Component = withAuthenticationRequired(component, { ...args, onRedirecting: Loading });

  return <Component />;
};
