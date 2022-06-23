import { Route, Routes } from 'react-router-dom';

import { Login } from 'src/pages/Login';
import { AuthRoute } from './AuthRoute';

import { AppRoutes } from 'src/utils/constants/routes';
import {
  Company,
  CompanyList,
  CompanyAddForm,
  CompanyModifyForm,
} from 'src/pages/Company';

import { Reporter, ReporterList, ReporterAddForm } from 'src/pages/Reporter';

const Navigation = () => {
  return (
    <Routes>
      {/* ***** PUBLIC ROUTES ***** */}
      <Route path={AppRoutes.Base} element={<Login />} />
      {/* ***** SECURE ROUTES ***** */}
      {/* Company */}
      <Route path="/company" element={<AuthRoute component={<Company />} />}>
        {/* Base */}
        <Route index element={<AuthRoute component={<CompanyList />} />} />
        {/* Add */}
        <Route path="add" element={<AuthRoute component={<CompanyAddForm />} />} />
        {/* Modify */}
        <Route path=":companyId" element={<AuthRoute component={<CompanyModifyForm />} />}/>
      </Route>
      {/* Reporter */}
      <Route path="/reporter" element={<AuthRoute component={<Reporter />} />}>
        <Route index element={<AuthRoute component={<ReporterList />} />} />
        <Route path="add" element={<AuthRoute component={<ReporterAddForm />} />} />
      </Route>
    </Routes>
  );
};

export default Navigation;
