import { Navigate, useLocation } from 'react-router-dom';

import { useFirebase } from 'src/hooks/useFirebase';
import { Loading } from 'src/pages/Loading';
import { AppRoutes } from 'src/utils/constants/routes';
import { AuthRouteProps } from './types';

export const AuthRoute = ({ component }: AuthRouteProps) => {
  const { authState } = useFirebase();
  const location = useLocation();

  if (authState.loading) {
    return <Loading />;
  }

  if (!authState.user) {
    return <Navigate to={AppRoutes.Base} state={{ from: location }} replace />;
  }

  return <>{component}</>;
};
