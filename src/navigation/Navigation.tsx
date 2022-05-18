import { PathRouteProps, Route, Routes } from 'react-router-dom';
import { RequireAuthRoute } from './RequireAuthRoute';
import { Login } from '../pages/Login';
import { Landing } from 'src/pages/Landing';
import { AddCompany } from 'src/pages/AddCompany';
import { EditCompany } from 'src/pages/EditCompany';
import { Scheduling } from 'src/pages/Scheduling';

const Navigation = () => {
  const basicRoutes: PathRouteProps[] = [{ path: '', element: <Login /> }];
  const authRoutes: PathRouteProps[] = [
    { path: 'landing', element: <Landing /> },
    { path: 'add-company', element: <AddCompany /> },
    { path: 'edit-company', element: <EditCompany /> },
    { path: 'scheduling', element: <Scheduling /> },
  ];

  return (
    <Routes>
      {/* Unauthorized Routes */}
      {basicRoutes.map(({ path, ...rest }, index) => (
        <Route path={`/${path}`} key={`${path}-${index}`} {...rest} />
      ))}
      {/* Authorized Routes */}
      {authRoutes.map(({ path, element }, index) => (
        <Route
          path={`/${path}`}
          element={<RequireAuthRoute element={element} />}
          key={`${path}-${index}`}
        />
      ))}
    </Routes>
  );
};

export default Navigation;
