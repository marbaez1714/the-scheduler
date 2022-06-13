import { Route, Routes } from 'react-router-dom';

import { Login } from 'src/pages/Login';
import { AuthRoute } from './AuthRoute';

import { AppRoutes } from 'src/utils/constants/routes';
import { Company, AddCompany } from 'src/pages/Company';

const Navigation = () => {
  return (
    <Routes>
      {/* Unauthorized Routes */}
      <Route path={AppRoutes.Base} element={<Login />} />
      {/* Authorized Routes */}
      <Route path="/company" element={<AuthRoute component={<Company />} />}>
        <Route path="add" element={<AuthRoute component={<AddCompany />} />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
