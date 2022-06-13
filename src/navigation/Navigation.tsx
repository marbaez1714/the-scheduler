import { Route, Routes } from 'react-router-dom';

import { Login } from 'src/pages/Login';
import { Landing } from 'src/pages/Landing';
import { AddCompany } from 'src/pages/AddCompany';
import { EditCompany } from 'src/pages/EditCompany';
import { Scheduling } from 'src/pages/Scheduling';
import { AuthRoute } from './AuthRoute';

import { AppRoutes } from 'src/utils/constants/routes';

const Navigation = () => {
  return (
    <Routes>
      {/* Unauthorized Routes */}
      <Route path={AppRoutes.Base} element={<Login />} />
      {/* Authorized Routes */}
      <Route
        path={AppRoutes.Landing}
        element={
          <AuthRoute>
            <Landing />
          </AuthRoute>
        }
      />
      <Route
        path="/company/add"
        element={
          <AuthRoute>
            <AddCompany />
          </AuthRoute>
        }
      />
      <Route
        path="/company/edit"
        element={
          <AuthRoute>
            <EditCompany />
          </AuthRoute>
        }
      />
      <Route
        path="/scheduling"
        element={
          <AuthRoute>
            <Scheduling />
          </AuthRoute>
        }
      />
    </Routes>
  );
};

export default Navigation;
