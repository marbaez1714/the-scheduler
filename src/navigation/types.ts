import { WithAuthenticationRequiredOptions } from '@auth0/auth0-react';

export interface RequireAuthRouteProps {
  element: React.ReactNode;
  options?: WithAuthenticationRequiredOptions;
}
