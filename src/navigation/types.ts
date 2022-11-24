import { WithAuthenticationRequiredOptions } from '@auth0/auth0-react';

export interface AuthRouteProps {
  component: React.ReactNode;
}

export interface ProtectedRouteProps extends WithAuthenticationRequiredOptions {
  component: React.ComponentType;
}
