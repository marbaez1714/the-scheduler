import { Outlet, Route, Routes } from 'react-router-dom';

import { Login } from 'src/pages/Login';
import { AuthRoute } from './AuthRoute';

import { Dashboard } from 'src/pages/Dashboard';

import {
  // Base
  ManageData,
  // Area
  AreaList,
  AreaAddForm,
  AreaModifyForm,
  // Builder
  BuilderList,
  BuilderAddForm,
  BuilderModifyForm,
  // Community
  CommunityList,
  CommunityAddForm,
  CommunityModifyForm,
  // Company
  CompanyList,
  CompanyAddForm,
  CompanyModifyForm,
  // Contractor
  ContractorList,
  ContractorAddForm,
  ContractorModifyForm,
  // Reporter
  ReporterList,
  ReporterAddForm,
  ReporterModifyForm,
  // Scope
  ScopeList,
  ScopeAddForm,
  ScopeModifyForm,
  // Supplier
  SupplierList,
  SupplierAddForm,
  SupplierModifyForm,
} from 'src/pages/ManageData';
import { CreateJob } from 'src/pages/CreateJob';
import { NotFound } from './NotFound';

const Navigation = () => {
  return (
    <Routes>
      {/* ***** PUBLIC ROUTES ***** */}
      <Route index element={<Login />} />
      {/* ***** SECURE ROUTES ***** */}

      {/* Dashboard */}
      <Route path="/dashboard" element={<AuthRoute component={<Dashboard />} />} />
      {/* Manage */}
      <Route path="/manage" element={<AuthRoute component={<ManageData />} />}>
        {/* Area */}
        <Route path="area" element={<AuthRoute component={<Outlet />} />}>
          <Route index element={<AuthRoute component={<AreaList />} />} />
          <Route path="add" element={<AuthRoute component={<AreaAddForm />} />} />
          <Route path=":areaId" element={<AuthRoute component={<AreaModifyForm />} />} />
        </Route>
        {/* Builder */}
        <Route path="builder" element={<AuthRoute component={<Outlet />} />}>
          <Route index element={<AuthRoute component={<BuilderList />} />} />
          <Route path="add" element={<AuthRoute component={<BuilderAddForm />} />} />
          <Route path=":builderId" element={<AuthRoute component={<BuilderModifyForm />} />} />
        </Route>
        {/* Company */}
        <Route path="company" element={<AuthRoute component={<Outlet />} />}>
          <Route index element={<AuthRoute component={<CompanyList />} />} />
          <Route path="add" element={<AuthRoute component={<CompanyAddForm />} />} />
          <Route path=":companyId" element={<AuthRoute component={<CompanyModifyForm />} />} />
        </Route>
        {/* Community */}
        <Route path="community" element={<AuthRoute component={<Outlet />} />}>
          <Route index element={<AuthRoute component={<CommunityList />} />} />
          <Route path="add" element={<AuthRoute component={<CommunityAddForm />} />} />
          <Route path=":companyId" element={<AuthRoute component={<CommunityModifyForm />} />} />
        </Route>
        {/* Contractor */}
        <Route path="contractor" element={<AuthRoute component={<Outlet />} />}>
          <Route index element={<AuthRoute component={<ContractorList />} />} />
          <Route path="add" element={<AuthRoute component={<ContractorAddForm />} />} />
          <Route path=":contractorId" element={<AuthRoute component={<ContractorModifyForm />} />} />
        </Route>
        {/* Reporter */}
        <Route path="reporter" element={<AuthRoute component={<Outlet />} />}>
          <Route index element={<AuthRoute component={<ReporterList />} />} />
          <Route path="add" element={<AuthRoute component={<ReporterAddForm />} />} />
          <Route path=":reporterId" element={<AuthRoute component={<ReporterModifyForm />} />} />
        </Route>
        {/* Scope */}
        <Route path="scope" element={<AuthRoute component={<Outlet />} />}>
          <Route index element={<AuthRoute component={<ScopeList />} />} />
          <Route path="add" element={<AuthRoute component={<ScopeAddForm />} />} />
          <Route path=":scopeId" element={<AuthRoute component={<ScopeModifyForm />} />} />
        </Route>
        {/* Supplier */}
        <Route path="supplier" element={<AuthRoute component={<Outlet />} />}>
          <Route index element={<AuthRoute component={<SupplierList />} />} />
          <Route path="add" element={<AuthRoute component={<SupplierAddForm />} />} />
          <Route path=":supplierId" element={<AuthRoute component={<SupplierModifyForm />} />} />
        </Route>
      </Route>
      {/* Create Job */}
      <Route path="/create_job" element={<AuthRoute component={<CreateJob />} />} />
      {/* 404 Page */}
      <Route path="*" element={<AuthRoute component={<NotFound />} />} />
    </Routes>
  );
};

export default Navigation;
