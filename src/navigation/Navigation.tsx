import { Route, Routes } from 'react-router-dom';

import { Login } from 'src/pages/Login';
import { AuthRoute } from './AuthRoute';

import { AppRoutes } from 'src/utils/constants/routes';

import { Area, AreaList, AreaAddForm, AreaModifyForm } from 'src/pages/Area';

import {
  Builder,
  BuilderList,
  BuilderAddForm,
  BuilderModifyForm,
} from 'src/pages/Builder';

import {
  Company,
  CompanyList,
  CompanyAddForm,
  CompanyModifyForm,
} from 'src/pages/Company';

import {
  Community,
  CommunityList,
  CommunityAddForm,
  CommunityModifyForm,
} from 'src/pages/Community';

import {
  Contractor,
  ContractorList,
  ContractorAddForm,
  ContractorModifyForm,
} from 'src/pages/Contractor';

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

import {
  Scope,
  ScopeList,
  ScopeAddForm,
  ScopeModifyForm,
} from 'src/pages/Scope';

const Navigation = () => {
  return (
    <Routes>
      {/* ***** PUBLIC ROUTES ***** */}
      <Route path={AppRoutes.Base} element={<Login />} />
      {/* ***** SECURE ROUTES ***** */}

      {/* Area */}
      <Route path={AppRoutes.Area} element={<AuthRoute component={<Area />} />}>
        <Route index element={<AuthRoute component={<AreaList />} />} />
        <Route path="add" element={<AuthRoute component={<AreaAddForm />} />} />
        <Route
          path=":areaId"
          element={<AuthRoute component={<AreaModifyForm />} />}
        />
      </Route>
      {/* Builder */}
      <Route
        path={AppRoutes.Builder}
        element={<AuthRoute component={<Builder />} />}
      >
        <Route index element={<AuthRoute component={<BuilderList />} />} />
        <Route
          path="add"
          element={<AuthRoute component={<BuilderAddForm />} />}
        />
        <Route
          path=":builderId"
          element={<AuthRoute component={<BuilderModifyForm />} />}
        />
      </Route>
      {/* Company */}
      <Route
        path={AppRoutes.Company}
        element={<AuthRoute component={<Company />} />}
      >
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
      {/* Community */}
      <Route
        path={AppRoutes.Community}
        element={<AuthRoute component={<Community />} />}
      >
        <Route index element={<AuthRoute component={<CommunityList />} />} />
        <Route
          path="add"
          element={<AuthRoute component={<CommunityAddForm />} />}
        />
        <Route
          path=":companyId"
          element={<AuthRoute component={<CommunityModifyForm />} />}
        />
      </Route>
      {/* Contractor */}
      <Route
        path={AppRoutes.Contractor}
        element={<AuthRoute component={<Contractor />} />}
      >
        <Route index element={<AuthRoute component={<ContractorList />} />} />
        <Route
          path="add"
          element={<AuthRoute component={<ContractorAddForm />} />}
        />
        <Route
          path=":contractorId"
          element={<AuthRoute component={<ContractorModifyForm />} />}
        />
      </Route>
      {/* Reporter */}
      <Route
        path={AppRoutes.Reporter}
        element={<AuthRoute component={<Reporter />} />}
      >
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
      {/* Scope */}
      <Route
        path={AppRoutes.Scope}
        element={<AuthRoute component={<Scope />} />}
      >
        <Route index element={<AuthRoute component={<ScopeList />} />} />
        <Route
          path="add"
          element={<AuthRoute component={<ScopeAddForm />} />}
        />
        <Route
          path=":scopeId"
          element={<AuthRoute component={<ScopeModifyForm />} />}
        />
      </Route>
      {/* Supplier */}
      <Route
        path={AppRoutes.Supplier}
        element={<AuthRoute component={<Supplier />} />}
      >
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
