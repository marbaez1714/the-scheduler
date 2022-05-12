import {Navigate, useLocation} from "react-router-dom";
import {RequireAuthProps} from "./types";

export const RequireAuth = ({element}: RequireAuthProps) => {
  // TODO: Add auth
  const auth = true;
  const location = useLocation();

  if (auth) {
    return <>{element}</>;
  }
  return <Navigate to="/login" replace state={{from: location}} />;
};
