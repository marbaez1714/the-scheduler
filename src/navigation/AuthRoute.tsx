import { Navigate, useLocation } from 'react-router-dom';

import { useFirebase } from 'src/hooks/useFirebase';
import { Loading } from 'src/pages/Loading';
import { AppRoutes } from 'src/utils/constants/routes';
import { AuthRouteProps } from './types';

export const AuthRoute = ({ children }: AuthRouteProps) => {
  const { authUser, authLoading } = useFirebase();
  const location = useLocation();

  if (authLoading) {
    return <Loading />;
  }

  if (!authUser) {
    return <Navigate to={AppRoutes.Base} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
