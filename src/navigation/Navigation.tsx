import { Route, Routes } from 'react-router-dom';

import { Login } from 'src/pages/Login';
import { AuthRoute } from './AuthRoute';

import { AppRoutes } from 'src/utils/constants/routes';

import { Area, AreaList, AreaAddForm, AreaModifyForm } from 'src/pages/Area';

import {
  Company,
  CompanyList,
  CompanyAddForm,
  CompanyModifyForm,
} from 'src/pages/Company';

import {
  Reporter,
  ReporterList,
  ReporterAddForm,
  ReporterModifyForm,
} from 'src/pages/Reporter';

import {
  Supplier,
  SupplierList,
  SupplierAddForm,
  SupplierModifyForm,
} from 'src/pages/Supplier';

const Navigation = () => {
  return (
    <Routes>
      {/* ***** PUBLIC ROUTES ***** */}
      <Route path={AppRoutes.Base} element={<Login />} />
      {/* ***** SECURE ROUTES ***** */}
      {/* Area */}
      <Route path="/area" element={<AuthRoute component={<Area />} />}>
        <Route index element={<AuthRoute component={<AreaList />} />} />
        <Route path="add" element={<AuthRoute component={<AreaAddForm />} />} />
        <Route
          path=":areaId"
          element={<AuthRoute component={<AreaModifyForm />} />}
        />
      </Route>
      {/* Company */}
      <Route path="/company" element={<AuthRoute component={<Company />} />}>
        <Route index element={<AuthRoute component={<CompanyList />} />} />
        <Route
          path="add"
          element={<AuthRoute component={<CompanyAddForm />} />}
        />
        <Route
          path=":companyId"
          element={<AuthRoute component={<CompanyModifyForm />} />}
        />
      </Route>
      {/* Reporter */}
      <Route path="/reporter" element={<AuthRoute component={<Reporter />} />}>
        <Route index element={<AuthRoute component={<ReporterList />} />} />
        <Route
          path="add"
          element={<AuthRoute component={<ReporterAddForm />} />}
        />
        <Route
          path=":reporterId"
          element={<AuthRoute component={<ReporterModifyForm />} />}
        />
      </Route>
      {/* Supplier */}
      <Route path="/supplier" element={<AuthRoute component={<Supplier />} />}>
        <Route index element={<AuthRoute component={<SupplierList />} />} />
        <Route
          path="add"
          element={<AuthRoute component={<SupplierAddForm />} />}
        />
        <Route
          path=":supplierId"
          element={<AuthRoute component={<SupplierModifyForm />} />}
        />
      </Route>
    </Routes>
  );
};

export default Navigation;
